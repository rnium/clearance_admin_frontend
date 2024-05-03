import { useState, useEffect } from 'react';
import '../styles/department.css';
import {
  Box, ToggleButtonGroup, ToggleButton, Container, Stack, Grid, Typography, Paper, Button
} from '@mui/material';
import { Modal } from 'antd';
import StudentProfile from '../components/molecules/StudentProfile';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, message, Empty } from 'antd';
import axios from 'axios';
import * as urls from '../utils/api_urls';
import { setDeptSessions, setLoaded } from '../redux/deptSessionReducer';
import Unselected from '../components/atoms/Unselected';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SessionAddModal from '../components/molecules/SessionAddModal';
import ClearanceDetailModal from '../components/molecules/ClearanceDetailModal';
import StudentEditModal from '../components/molecules/StudentEditModal';
import RegExcelModal from '../components/molecules/RegExcelModal';
import StudentPlaceholder from '../components/molecules/StudentPlaceholder'

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
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [isFlowModalOpen, setIsFlowModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const departments = useSelector(state => state.deptSession.departments)
  const deptSessionsLoaded = useSelector(state => state.deptSession.is_loaded)
  const dispatch = useDispatch();
  const [deptSelected, setDeptSelected] = useState(null);
  const [studentSelected, setStudentSelected] = useState(null);
  const [editStudentSelected, setEditStudentSelected] = useState(null);
  const [sessionSelected, setSessionSelected] = useState(null);
  const [students_data, setStudentsData] = useState([]);
  const [studentsDataLoaded, setStudentsDataLoaded] = useState(false);

  const setIsFlowModalOpenCustom = val => {
    if (val === false) {
      setStudentSelected(null);
    }
    setIsFlowModalOpen(val);
  }

  const handleDeptChange = (e, newDept) => {
    if (newDept != null) {
      setDeptSelected(newDept);
      setStudentsDataLoaded(false);
      setSessionSelected(null);
    }
  }

  const fetchStudents = async () => {
    if (sessionSelected === null) {
      return;
    }
    let params = { sessionid: sessionSelected };
    try {
      let res = await axios.get(urls.sessionStudentsUrl, { params });
      setStudentsData(res.data);
      setStudentsDataLoaded(true);
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  const setEditInfo = (info) => {
    setEditStudentSelected(info);
    setIsEditModalOpen(true);
  }


  useEffect(() => {
    if (departments && !deptSelected) {
      setDeptSelected(Object.keys(departments)[0]);
    }
    if (!deptSessionsLoaded) {
      loadDeptSessions(dispatch);
    }
  }, [departments])

  useEffect(() => {
    if (sessionSelected) {
      fetchStudents();
    }
  }, [sessionSelected])

  useEffect(() => {
    if (studentSelected) {
      setIsFlowModalOpen(true);
    }
  }, [studentSelected]);

  useEffect(() => {
    if (editStudentSelected) {
      setIsEditModalOpen(true);
    }
  }, [editStudentSelected]);


  if (!deptSessionsLoaded) {
    return (
      <Stack alignItems="center" sx={{ mt: 10 }}>
        <Spin size='large' />
      </Stack>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <ClearanceDetailModal
        isModalOpen={isFlowModalOpen}
        setIsModalOpen={setIsFlowModalOpenCustom}
        selectedStudent={studentSelected}
        type="administrative"
      />
      <StudentEditModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        studentInfo={editStudentSelected}
        fetchStudents={fetchStudents}
      />
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
                      <Grid sx={{ p: 1 }} xs={6} sm={4} md={2}>
                        <Button sx={{ width: '100%' }} variant="contained" >{s.session_code}</Button>
                      </Grid>
                      : <Grid sx={{ p: 1 }} xs={6} sm={4} md={2}>
                        <Button sx={{ width: '100%' }} variant="outlined" onClick={() => setSessionSelected(s.id)}>{s.session_code}</Button>
                      </Grid>
                  ))
                }
              </Grid>
              : null
          }
        </Stack>
        {
          deptSelected && (adminAcType === 'academic' || adminAcType === 'principal') ?
            <Stack sx={{ width: '100%' }} spacing={2} direction="row" justifyContent="flex-end" alignItems="flex-end">
              <SessionAddModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                dept={deptSelected}
                loadDeptSessions={() => loadDeptSessions(dispatch)}
              />
              <RegExcelModal
                isModalOpen={isExcelModalOpen}
                setIsModalOpen={setIsExcelModalOpen}
                deptSelected={deptSelected}
                fetchStudents={fetchStudents}
              />
              <Button
                size='small'
                color='secondary'
                startIcon={<PlaylistAddIcon />}
                onClick={() => setIsModalOpen(true)}
              >
                Add Session
              </Button>
              <Button
                size='small'
                color='secondary'
                startIcon={<PlaylistAddIcon />}
                onClick={() => setIsExcelModalOpen(true)}
              >
                Add Student Registrations
              </Button>
            </Stack> : null
        }
      </Paper>
      <Box sx={{ mt: 2 }}>
        {
          studentsDataLoaded ?
            students_data.students.length || students_data.placeholders.length ?
              <Grid container spacing={2}>
                {
                  students_data.students.map(student => (
                    <Grid item xs={12} md={4}>
                      <StudentProfile 
                        onProgressClick={(reg) => setStudentSelected(reg)} 
                        onEditClick={(info) => setEditInfo(info)} 
                        student={student}
                      />
                    </Grid>
                  ))
                }
                {
                  students_data.placeholders.map(student => (
                    <Grid item xs={12} md={4}>
                      <StudentPlaceholder
                      student={student}
                      />
                    </Grid>
                  ))
                }
              </Grid> :
              <Stack sx={{ mt: '10vh' }}>
                <Empty
                  image="/static/images/empty-folder.png"
                  imageStyle={{
                    height: 100,
                  }}
                  description={
                    <Typography variant='body1'>No Students</Typography>
                  }
                />
              </Stack>
            :
            <Unselected message='' />
        }
      </Box>
    </Container>
  )
}

export default Students