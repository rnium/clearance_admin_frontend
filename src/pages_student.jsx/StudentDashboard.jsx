import { useEffect } from 'react';
import {
  Container, Box, Grid, Paper, Stack, Typography, Button
} from '@mui/material';
import { Steps, Spin, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { loadInfo, setLoaded } from '../redux/studentStoreReducer';
import PendingCard from '../components/atoms/PendingCard';
import ApplyCard from '../components/atoms/ApplyCard';
import axios from 'axios';
import * as urls from '../utils/api_urls'


const StudentDashboard = () => {
  const studentInfo = useSelector(state => state.studentStore.info);
  const studentInfoLoaded = useSelector(state => state.studentStore.is_loaded);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadStudentInfo() {
      try {
        let res = await axios.get(urls.studentinfoUrl);
        dispatch(loadInfo(res.data.info));
        dispatch(setLoaded(true));
      } catch (error) {
        let error_msg = error?.response?.data?.details;
        if (error_msg === undefined) {
          error_msg = error.message;
        }
        message.error(error_msg);
      }
    }
    if (!studentInfoLoaded) {
      loadStudentInfo();
    }
  }, [])
  if (!studentInfoLoaded) {
    return (
      <Stack sx={{ mt: '15vh' }}>
        <Spin size='large' />
      </Stack>
    )
  }
  return (
    <Container sx={{ mt: 7, mb: 10 }} >
      <Box>
        <Steps
          current={studentInfo.state}
          items={[
            {
              title: 'Signup',
            },
            {
              title: 'Verification'
            },
            {
              title: 'Apply'
            },
            {
              title: 'Wait For approvals',
            },
            {
              title: 'Get clearance',
            },
          ]}
        />
      </Box>
      {
        studentInfo.state === 1 ? <PendingCard /> : null
      }
      {
        studentInfo.state === 2 ? <ApplyCard /> : null
      }


      {/* <Grid container spacing={2} sx={{mt: 5}}>
      <Grid item xs={12} md={7}>
        <Paper sx={{py:20}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, temporibus.
        </Paper>
      </Grid>
    </Grid> */}
    </Container>
  )
}

export default StudentDashboard;