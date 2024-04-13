import { useState, useEffect } from 'react';
import Clearance from '../components/molecules/Clearance'
import PendingStudent from '../components/molecules/PendingStudent';
import {
  Container, Grid, Paper, Box, Typography, Stack, Dialog, TextField, Button,
  DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import RolesCard from '../components/molecules/RolesCard';
import { Modal, Spin, message, Empty } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import * as urls from '../utils/api_urls';
import {
  setPendingClearances, setPendingClearancesLoaded, setAdminRoles, setAdminRolesLoaded,
  setPendingAccounts, setPendingAccountsLoaded
} from '../redux/dashboardReducer';
import ClearanceSection from '../components/organisms/ClearanceSection';
import ClearancesEmpty from '../components/atoms/ClearancesEmpty';


const Dashboard = (props) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletableId, setDeletableId] = useState(null);
  const dispatch = useDispatch();
  const pendingClearances = useSelector(state => state.dashboard.pendingClearances.clearances)
  const pendingClearancesLoaded = useSelector(state => state.dashboard.pendingClearances.isLoaded)
  const adminRoles = useSelector(state => state.dashboard.adminRoles.roles)
  const adminRolesLoaded = useSelector(state => state.dashboard.adminRoles.isLoaded)
  const pendingAccounts = useSelector(state => state.dashboard.pendingAccounts.accounts)
  const pendingAccountsLoaded = useSelector(state => state.dashboard.pendingAccounts.isLoaded)
  const adminAcType = useSelector(state => state.account.userinfo?.user_type)

  const openCommentsModal = () => {
    setIsCommentModalOpen(true);
  }
  const closeDialog = () => {
    setDialogOpen(false);
    setDeletableId(null);
  }
  const openDialog = reg_id => {
    setDialogOpen(true);
    setDeletableId(reg_id);
  }

  async function loadClearances() {
    try {
      let res = await axios.get(urls.dashboardClearancesUrl);
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
    try {
      let res = await axios.get(urls.pendingStudentAcUrl);
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
      res = await axios.get(urls.dashboardClearancesUrl);
      dispatch(setPendingClearances(res.data))
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  const approveAccount = async registration => {
    try {
      let res = await axios.post(
        urls.approveStudentAcUrl,
        { registration: registration }
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

  const deleteAccount = async payload => {
    try {
      let res = await axios.post(
        urls.deleteStudentAcUrl, payload
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

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Modal title="" open={isCommentModalOpen} onCancel={() => setIsCommentModalOpen(false)}>
        <p>Lorem, ipsum dolor.</p>
        <p>Lorem, ipsum dolor.</p>
        <p>Lorem, ipsum dolor.</p>
      </Modal>
      <Grid container spacing={2} >
        <Grid item xs={12} md={7}>
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
                    <ClearanceSection section_data={section} onAction={clearanceAction} />
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
                  pendingAccountsLoaded ?
                    <Paper sx={{ p: 2 }} >
                      <Typography component="div" variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                        Pending Accounts
                      </Typography>
                      {
                        pendingAccounts.length ?
                          pendingAccounts.map(s => (
                            <PendingStudent openDialog={openDialog} approve={approveAccount} student={s} />
                          )) :
                          <Stack sx={{ py: 5 }}>
                            <Empty />
                          </Stack>
                      }
                    </Paper> :
                    <Paper sx={{ py: 15 }}>
                      <Stack>
                        <Spin size='large' />
                      </Stack>
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