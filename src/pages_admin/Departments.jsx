import { useState, useEffect } from 'react';
import '../styles/department.css'
import {
  Box, Container, Grid, Typography, Paper, Avatar, Stack, Chip
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, message, Modal } from 'antd';
import axios from 'axios';
import * as urls from '../utils/api_urls'
import { setDeptSections, setLoaded } from '../redux/departmentsReducer';
import MemberAssignModal from '../components/molecules/MemberAssignModal';


import DepartmentSection from '../components/organisms/DepartmentSection';

const Departments = () => {
  const adminAcType = useSelector(state => state.account.userinfo?.user_type)
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedTitle, setTitle] = useState(null);
  const [selectedRole, setRole] = useState(null);
  const [selectedCode, setCode] = useState(null);
  const deptSections = useSelector(state => state.departments.deptSections)
  const sectionsLoaded = useSelector(state => state.departments.is_loaded)
  const dispatch = useDispatch();

  async function loadDeptSections() {
    try {
      let res = await axios.get(urls.departmentsSectionsUrl);
      dispatch(setDeptSections(res.data))
      dispatch(setLoaded(true))
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  useEffect(() => {
    if (!sectionsLoaded) {
      loadDeptSections();
    }
  }, [])

  if (!sectionsLoaded) {
    return (
      <Stack alignItems="center" sx={{ mt: 10 }}>
        <Spin size='large' />
      </Stack>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      {
        deptSections.map(section => (
          <DepartmentSection
            section={section}
            setTitle={setTitle}
            setCode={setCode}
            setRole={setRole}
          />
        ))
      }
      <MemberAssignModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Container>
  )
}

export default Departments