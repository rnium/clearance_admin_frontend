import {useState} from 'react';
import Clearance from '../components/molecules/Clearance'
import PendingStudent from '../components/molecules/PendingStudent';
import {
  Container, Grid, Paper, Box, CardMedia, Typography, Chip, Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RolesCard from '../components/molecules/RolesCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from 'antd';

// Sample Data
import {students_data, peding_students} from '../utils/sample_data'


const Dashboard = (props) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const super_roles = ['Head of EEE', 'SEC Academic']
  const roles = ['ATTS Lab', 'Microprocessor Lab']
  const openCommentsModal = () => {
    setIsCommentModalOpen(true);
  }
  return (
    <Container sx={{ mt: 4 }}>
      <Modal title="" open={isCommentModalOpen} onCancel={() => setIsCommentModalOpen(false)}>
        <p>Lorem, ipsum dolor.</p>
        <p>Lorem, ipsum dolor.</p>
        <p>Lorem, ipsum dolor.</p>
      </Modal>
      <Grid container spacing={2} >
        <Grid item xs={12} md={7}>
          {/* type 1 */}
          <Box sx={{mb: 4}}>
            <Box sx={{ display: 'flex', mb: 2 }} justifyContent="center">
              <img src="/static/images/cube.png" alt="" width="30px" height="30px" />
              <Typography
                variant='h5'
                align='center'
                sx={{ ml: 2 }}
                color="text.secondary"
              >
                Head of EEE
              </Typography>
            </Box>
            {
              students_data.map(student => (
                <Clearance 
                  key={student.registration} 
                  student_data={student} 
                  type="pending" 
                  handleOpenModal={openCommentsModal}
                />
              ))
            }
          </Box>
          {/* Type 2 */}
          <Box sx={{mb: 2}}>
            <Box sx={{ display: 'flex', mb: 2 }} justifyContent="center">
              <img src="/static/images/cube-gray.png" alt="" width="30px" height="30px" />
              <Typography
                variant='h5'
                align='center'
                sx={{ ml: 2 }}
                color="text.secondary"
              >
                Microprocessor Lab
              </Typography>
            </Box>
            {
              students_data.map(student => (
                <Clearance 
                  key={student.registration} 
                  student_data={student} 
                  type="pending"
                  handleOpenModal={openCommentsModal}
                />
              ))
            }
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ mb: 2 }}>
            <RolesCard roles={roles} super_roles={super_roles} />
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