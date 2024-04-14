import { useState, useEffect } from 'react';
import '../styles/department.css';
import {
  Box, ToggleButtonGroup, ToggleButton, Container, Stack, Grid, Typography, Paper, Button
} from '@mui/material';
import { Modal } from 'antd';
import { departments, students_data } from '../utils/sample_data';
import StudentProfile from '../components/molecules/StudentProfile';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, message } from 'antd';
import axios from 'axios';
import * as urls from '../utils/api_urls';
import { setDeptSessions, setLoaded } from '../redux/deptSessionReducer';

export const loadDeptSessions = async (dispatch) => {
  try {
    let res = await axios.get(urls.departmentsSessionsUrl);
    dispatch(setDeptSessions(res.data))
    dispatch(setLoaded(true))
  } catch (error) {
    let error_msg = error?.response?.data?.details;
    if (error_msg === undefined) {
      error_msg = error.message;
    }
    message.error(error_msg);
  }
}

const Students = () => {
  const adminAcType = useSelector(state => state.account.userinfo?.user_type);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const departments = useSelector(state => state.deptSession.departments)
  const deptSessionsLoaded = useSelector(state => state.deptSession.is_loaded)
  const dispatch = useDispatch();
  const [deptSelected, setDeptSelected] = useState(null);
  const [sessionSelected, setSessionSelected] = useState(null);

  const handleDeptChange = (e, newDept) => {
    if (newDept != null) {
      setDeptSelected(newDept);
    }
  }

  useEffect(() => {
    if (departments) {
      setDeptSelected(Object.keys(departments)[0]);
    }
    if (!deptSessionsLoaded) {
      loadDeptSessions(dispatch);
    }
  }, [departments])

  if (!deptSessionsLoaded) {
    return (
      <Stack alignItems="center" sx={{ mt: 10 }}>
        <Spin size='large' />
      </Stack>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Stack sx={{ mb: 2 }} direction="row" justifyContent="center">
          <img src="/static/images/3d-cube.png" alt="" width="30px" height="30px" />
          <Typography
            variant='h5'
            align='center'
            sx={{ ml: 2 }}
            color="text.secondary"
          >
            View Students
          </Typography>
        </Stack>
      <Paper sx={{ p: 3 }}>
        <Stack alignItems="center" spacing={2}>
          {/* <Typography variant='h5'>Students Registered</Typography> */}
          <ToggleButtonGroup
            color="primary"
            value={deptSelected}
            exclusive
            onChange={handleDeptChange}
            aria-label="Platform"
          >
            {
              Object.keys(departments).map(dept => (
                <ToggleButton value={dept} aria-label="list" sx={{ px: 4 }}>
                  {dept}
                </ToggleButton>
              ))
            }
          </ToggleButtonGroup>
          {
            deptSelected ?
              <Grid container alignItems="center" justifyContent="center">
                {
                  departments[deptSelected].map(s => (
                    sessionSelected === s.id ?
                    <Grid sx={{p:1}} xs={6} sm={4} md={2}>
                      <Button sx={{width: '100%'}} variant="contained" onClick={() => console.log("sd")} >{s.session_code}</Button>
                    </Grid>
                    : <Grid sx={{p:1}} xs={6} sm={4} md={2}>
                      <Button sx={{width: '100%'}} variant="outlined" onClick={() => setSessionSelected(s.id)}>{s.session_code}</Button>
                    </Grid>
                  ))
                }
              </Grid>
              : null
          }
        </Stack>
      </Paper>
      <Box sx={{mt: 2}}>
        <Grid container spacing={2}>
          {
            students_data.map(student => (
              <Grid item xs={6} md={4}>
                <StudentProfile student={student} />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </Container>
  )
}

export default Students