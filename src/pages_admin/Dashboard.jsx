import { useState, useEffect } from 'react';
import PendingStudent from '../components/molecules/PendingStudent';
import {
  Container, Grid, Paper, Box, Typography, Stack, Dialog, TextField, Button,
  DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import RolesCard from '../components/molecules/RolesCard';
import { Spin, message, Empty, Popconfirm, Segmented, ConfigProvider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import * as urls from '../utils/api_urls';
import {
  setPendingClearances, setDeptSelected, setPendingStudentDept,
  setPendingClearancesLoaded, setAdminRoles, setAdminRolesLoaded,
  setPendingAccounts, setPendingAccountsLoaded
} from '../redux/dashboardReducer';
import ClearanceSection from '../components/organisms/ClearanceSection';
import ClearancesEmpty from '../components/atoms/ClearancesEmpty';
import Unselected from '../components/atoms/Unselected';
import RemarksModal from '../components/molecules/RemarksModal';
import ClearanceDetailModal from '../components/molecules/ClearanceDetailModal';
import { getCookie } from '../utils/cookies';
import CustomDeptSegmented from '../components/atoms/CustomDeptSegmented';


const Dashboard = (props) => {
  const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);
  const [isClearanceDetailModalOpen, setIsClearanceDetailModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClearance, setSelectedClearance] = useState({ type: null, id: null });
  const [selectedDetailClearance, setSelectedDetailClearance] = useState({ type: null, id: null });
  const [deletableId, setDeletableId] = useState(null);
  const dispatch = useDispatch();
  const deptSelected = useSelector(state => state.dashboard.deptSelected)
  const pendingStudentDept = useSelector(state => state.dashboard.pendingStudentDept)
  const pendingClearances = useSelector(state => state.dashboard.pendingClearances.clearances)
  const pendingClearancesLoaded = useSelector(state => state.dashboard.pendingClearances.isLoaded)
  const adminRoles = useSelector(state => state.dashboard.adminRoles.roles)
  const adminRolesLoaded = useSelector(state => state.dashboard.adminRoles.isLoaded)
  const pendingAccounts = useSelector(state => state.dashboard.pendingAccounts.accounts)
  const pendingAccountsLoaded = useSelector(state => state.dashboard.pendingAccounts.isLoaded)
  const adminAcType = useSelector(state => state.account.userinfo?.user_type)

  const changeDeptSelected = (val) => {
    dispatch(setDeptSelected(val));
  }

  const changePendingStudentDept = (val) => {
    dispatch(setPendingStudentDept(val));
  }

  const closeDialog = () => {
    setDialogOpen(false);
    setDeletableId(null);
  }

  const openDialog = reg_id => {
    setDialogOpen(true);
    setDeletableId(reg_id);
  }

  const closeRemarksModal = () => {
    setSelectedClearance({ type: null, id: null });
    setIsRemarksModalOpen(false);
  }

  const closeClearanceDetailModal = () => {
    setSelectedDetailClearance({ type: null, id: null });
    setIsClearanceDetailModalOpen(false);
  }

  const handleRemarksClick = (type, id) => {
    setSelectedClearance({ type, id })
  }

  const handleClearanceDetailModalClick = (type, id) => {
    setSelectedDetailClearance({ type, id })
  }

  async function loadClearances() {
    let params = { dept: deptSelected.toLowerCase() };
    try {
      let res = await axios.get(urls.dashboardClearancesUrl, { params });
      dispatch(setPendingClearances(res.data))
      dispatch(setPendingClearancesLoaded(true))
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  async function loadRoles() {
    try {
      let res = await axios.get(urls.adminRolesUrl);
      dispatch(setAdminRoles(res.data.info))
      dispatch(setAdminRolesLoaded(true))
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  async function loadPendingAccounts() {
    let params = { dept: pendingStudentDept.toLowerCase() }
    try {
      let res = await axios.get(urls.pendingStudentAcUrl, { params });
      dispatch(setPendingAccounts(res.data))
      dispatch(setPendingAccountsLoaded(true))
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  const clearanceAction = async url => {
    try {
      let res = await axios.get(urls.baseUrl + url);
      message.success(res.data.info);
      await loadClearances();
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  const approveAccount = async registration => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
    };
    try {
      let res = await axios.post(
        urls.approveStudentAcUrl,
        { registration: registration },
        config
      );
      message.success(res.data.info);
      await loadPendingAccounts();
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  const approveAllAccounts = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
    };
    try {
      let res = await axios.post(urls.approveAllStudentAcUrl, {dept: pendingStudentDept.toLowerCase()}, config);
      message.success(res.data.info);
      await loadPendingAccounts();
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  const deleteAccount = async registration => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
    };
    try {
      let res = await axios.post(
        urls.deleteStudentAcUrl, { registration }, config
      );
      message.success(res.data.info);
      res = await axios.get(urls.pendingStudentAcUrl);
      dispatch(setPendingAccounts(res.data))
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  useEffect(() => {
    if (!pendingClearancesLoaded) {
      loadClearances();
    };
    if (!adminRolesLoaded) {
      loadRoles();
    };
    if (adminAcType === 'academic' && pendingAccountsLoaded === false) {
      loadPendingAccounts();
    }
  }, [])

  useEffect(() => {
    if (pendingClearancesLoaded) {
      dispatch(setPendingClearancesLoaded(false));
      setTimeout(() => {
        loadClearances();
      }, 10)
    }
  }, [deptSelected])

  useEffect(() => {
    if (pendingAccountsLoaded) {
      dispatch(setPendingAccountsLoaded(false));
      setTimeout(() => {
        loadPendingAccounts();
      }, 10)
    }
  }, [pendingStudentDept])

  useEffect(() => {
    if (selectedClearance.id && selectedClearance.type) {
      setIsRemarksModalOpen(true);
    }
  }, [selectedClearance])

  useEffect(() => {
    if (selectedDetailClearance.id && selectedDetailClearance.type) {
      setIsClearanceDetailModalOpen(true);
    }
  }, [selectedDetailClearance])

  if (adminRolesLoaded && adminRoles.length == 0) {
    return (
      <Container>
        <Unselected image='leisure.svg' message='No Roles Assigned' />
      </Container>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <RemarksModal
        isModalOpen={isRemarksModalOpen}
        setIsModalOpen={closeRemarksModal}
        selectedClearance={selectedClearance}
      />
      <ClearanceDetailModal
        isModalOpen={isClearanceDetailModalOpen}
        setIsModalOpen={closeClearanceDetailModal}
        selectedClearance={selectedDetailClearance}
      />
      <Grid container spacing={2} >
        <Grid item xs={12} md={7}>
          <CustomDeptSegmented value={deptSelected} onChange={changeDeptSelected} />

          {
            pendingClearancesLoaded === false ?
              <Stack sx={{ mt: 5 }}>
                <Spin size='large' />
              </Stack> :
              pendingClearances.length == 0 ?
                <ClearancesEmpty />
                :
                pendingClearances.map(section => {
                  return (
                    <ClearanceSection
                      section_data={section}
                      onAction={clearanceAction}
                      handleRemarksClick={handleRemarksClick}
                      handleDetailClick={handleClearanceDetailModalClick}
                    />
                  )
                })
          }
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ mb: 2 }}>
            {
              adminRolesLoaded === false ?
                <Paper sx={{ py: 15 }}>
                  <Stack>
                    <Spin size='large' />
                  </Stack>
                </Paper>
                : <RolesCard roles={adminRoles} />
            }
          </Box>
          {
            adminAcType === 'academic' ?
              <Box sx={{ mb: 2 }}>
                {
                  <Paper sx={{ p: 2 }} >
                    <Typography component="div" variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                      Pending Accounts
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <CustomDeptSegmented
                        value={pendingStudentDept}
                        onChange={changePendingStudentDept}
                        trackBg="#f5f5f5"
                        block={true}
                      />
                    </Box>
                    {
                      pendingAccountsLoaded ?
                        <div>
                          {
                            pendingAccounts.length ?
                              pendingAccounts.map(s => (
                                <PendingStudent onDelete={deleteAccount} approve={approveAccount} student={s} />
                              )) :
                              <Stack sx={{ py: 5 }}>
                                <Empty />
                              </Stack>
                          }
                          {
                            pendingAccounts.length ?
                              <Popconfirm
                                title="Confirmation"
                                description="Are you sure to approve all pending students?"
                                okText="Yes"
                                cancelText="Cancel"
                                onConfirm={approveAllAccounts}
                              >
                                <Button
                                  variant='contained'
                                >
                                  Approve All
                                </Button>
                              </Popconfirm> : null
                          }
                        </div> :
                        <Stack sx={{ py: 15 }}>
                          <Spin size='large' />
                        </Stack>
                    }
                  </Paper>

                }
              </Box> : null
          }
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            deleteAccount(formData)
            closeDialog();
          },
        }}
      >
        <DialogTitle>Delete Student Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Before you proceed with deleting this account, provide a reason for the action.
            The student will receive an email notification regarding this decision
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="reason"
            name="reason"
            label="Specify Reason"
            type="text"
            fullWidth
            variant="standard"
          />
          <Box display="none">
            <TextField
              type="text"
              name="registration"
              value={deletableId}
            >
            </TextField>
          </Box>


        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Dashboard;