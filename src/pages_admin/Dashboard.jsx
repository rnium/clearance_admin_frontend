import { useState, useEffect } from 'react';
import Clearance from '../components/molecules/Clearance'
import PendingStudent from '../components/molecules/PendingStudent';
import {
  Container, Grid, Paper, Box, CardMedia, Typography, Chip, Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RolesCard from '../components/molecules/RolesCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Spin, message, Empty } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import * as urls from '../utils/api_urls'
import {
  setPendingClearances, setPendingClearancesLoaded, setAdminRoles, setAdminRolesLoaded,
  setPendingAccounts, setPendingAccountsLoaded
} from '../redux/dashboardReducer';
import ClearanceSection from '../components/organisms/ClearanceSection';
import ClearancesEmpty from '../components/atoms/ClearancesEmpty';


const Dashboard = (props) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
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

  const hitClearanceAction = async url => {
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
    <Container sx={{ mt: 4 }}>
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
                    <ClearanceSection section_data={section} onAction={hitClearanceAction} />
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
                            <PendingStudent student={s} />
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
    </Container>
  )
}

export default Dashboard;