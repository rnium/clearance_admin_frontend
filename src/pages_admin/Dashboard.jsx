import { useState, useEffect } from 'react';
import Clearance from '../components/molecules/Clearance'
import PendingStudent from '../components/molecules/PendingStudent';
import {
  Container, Grid, Paper, Box, CardMedia, Typography, Chip, Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RolesCard from '../components/molecules/RolesCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Spin, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import * as urls from '../utils/api_urls'
import {
  setPendingClearances, setPendingClearancesLoaded, setAdminRoles, setAdminRolesLoaded
} from '../redux/dashboardReducer';

// Sample Data
import { students_data, peding_students } from '../utils/sample_data'
import ClearanceSection from '../components/organisms/ClearanceSection';


const Dashboard = (props) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const dispatch = useDispatch();
  const pendingClearances = useSelector(state => state.dashboard.pendingClearances.clearances)
  const pendingClearancesLoaded = useSelector(state => state.dashboard.pendingClearances.isLoaded)
  const adminRoles = useSelector(state => state.dashboard.adminRoles.roles)
  const adminRolesLoaded = useSelector(state => state.dashboard.adminRoles.isLoaded)
  const super_roles = ['Head of EEE', 'SEC Academic']
  const roles = ['ATTS Lab', 'Microprocessor Lab']
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

  useEffect(() => {
    if (!pendingClearancesLoaded) {
      loadClearances();
    };
    if (!adminRolesLoaded) {
      loadRoles();
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
              </Stack>
              : pendingClearances.map(section => {
                return (
                  <ClearanceSection section_data={section} />
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
          <Box sx={{ mb: 2 }}>
            <Paper sx={{ p: 2 }} >
              <Typography component="div" variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                Pending Accounts
              </Typography>
              {
                peding_students.map(s => (
                  <PendingStudent student={s} />
                ))
              }
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard;