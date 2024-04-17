import { useEffect, useState } from 'react';
import {
  Container, Box, Grid, Paper, Stack, Typography, Button
} from '@mui/material';
import { Steps, Spin, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { loadInfo, setLoaded } from '../redux/studentStoreReducer';
import PendingCard from '../components/atoms/PendingCard';
import ApplyCard from '../components/atoms/ApplyCard';
import RemarksTimeline from '../components/organisms/RemarksTimeline';
import StudentClearanceSection from '../components/organisms/StudentClearanceSection';
import axios from 'axios';
import CircularProgressWithLabel from '../components/atoms/CircularProgressWithLabel';
import * as urls from '../utils/api_urls';
import '../styles/student.css';
import DonwloadCard from '../components/molecules/DonwloadCard';


const StudentDashboard = () => {
  const studentInfo = useSelector(state => state.studentStore.info);
  const studentInfoLoaded = useSelector(state => state.studentStore.is_loaded);
  const [clearanceInfo, setClearanceInfo] = useState(
    {
      loaded: false,
      info: null
    }
  )
  const dispatch = useDispatch();

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

  async function loadClearanceInfo() {
    try {
      let res = await axios.get(urls.clearanceInfoUrl);
      setClearanceInfo({
        loaded: true,
        info: res.data
      })
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  useEffect(() => {
    if (!studentInfoLoaded) {
      loadStudentInfo();
    }
  }, [])

  useEffect(() => {
    if (studentInfo.state === 3) {
      loadClearanceInfo();
    }
  }, [studentInfoLoaded])


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
              title: 'Wait For Approvals',
            },
            {
              title: 'Get Clearance',
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
      {
        studentInfo.state >= 3 ?
          clearanceInfo.loaded ?
            <Grid container sx={{ mt: 5 }} spacing={2}>
              <Grid item xs={12} md={3}>
                <Stack spacing={2}>
                  {
                    studentInfo.state === 4 ?
                    <DonwloadCard /> : null
                  }
                  <Stack direction="row" justifyContent="center" spacing={2} alignItems="center">
                    <Typography variant='h5' sx={{ fontSize: { xs: '1rem', md: '1.3rem' }, mb: 2 }}>Overall Progress</Typography>
                    <CircularProgressWithLabel value={59} />
                  </Stack>
                  <RemarksTimeline />
                </Stack>
              </Grid>
              <Grid item xs={12} md={9}>
                <Paper sx={{ p: 2, backgroundColor: "#e3e3e3" }}>
                  <StudentClearanceSection type="administrative" data={clearanceInfo.info.adminstrative} />
                  {
                    clearanceInfo.info.department.map(dept => (
                      <StudentClearanceSection type="department" data={dept} />
                    ))
                  }
                </Paper>
              </Grid>
              

            </Grid> :
            <Stack alignItems="center">
              <Spin size='large' />
            </Stack>
          : null
      }



    </Container>
  )
}

export default StudentDashboard;