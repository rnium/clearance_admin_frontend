import {useEffect} from 'react';
import NavbarStudent from '../components/molecules/NavbarStudent';
import {
  Container, Box, Grid, Paper, Stack, Typography, Button
} from '@mui/material';
import { Steps, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {loadInfo, setLoaded} from '../redux/studentStoreReducer';
import PendingCard from '../components/atoms/PendingCard';
import ApplyCard from '../components/atoms/ApplyCard';

const customState = {
  state: 2
}

const StudentHome = () => {
  const studentInfo = useSelector(state => state.studentStore.info);
  const studentInfoLoaded = useSelector(state => state.studentStore.is_loaded);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInfo(customState));
    dispatch(setLoaded(true));
  }, [])
  console.log(studentInfo);
  if (!studentInfoLoaded) {
    return (
      <div>
        <NavbarStudent />
        <Stack sx={{mt: '15vh'}}>
            <Spin size='large' />
        </Stack>
      </div>
    )
  }
  return (
    <div >
      <NavbarStudent />
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
          studentInfo.state == 1 ? <PendingCard /> : null
        }
        {
          studentInfo.state == 2 ? <ApplyCard /> : null
        }
        
        
        {/* <Grid container spacing={2} sx={{mt: 5}}>
          <Grid item xs={12} md={7}>
            <Paper sx={{py:20}}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, temporibus.
            </Paper>
          </Grid>
        </Grid> */}
      </Container>
    </div>
  )
}

export default StudentHome