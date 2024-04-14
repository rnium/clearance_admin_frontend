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
import { loadMembers } from './Members';
import DepartmentSection from '../components/organisms/DepartmentSection';

const Departments = () => {
  const adminAcType = useSelector(state => state.account.userinfo?.user_type)
  const membersLoaded = useSelector(state => state.members.is_loaded)
  const [pageInitialized, setPageInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState({ title: null, section: null, role: null, code: null })
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

  async function unAssignMember(role, code, user_id) {
    let params = { role, code, user_id }
    try {
      let res = await axios.post(urls.unAssignMemberUrl, params);
      await loadDeptSections();
      message.success(res.data.info);
      if (membersLoaded) {
        loadMembers(dispatch);
      }
      setIsModalOpen(false)
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  const handleAssignClick = (title, section, role, code) => {
    setSelectedRole({ title, section, role, code });
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (!pageInitialized) {
      setPageInitialized(true);
    }
    if (!sectionsLoaded) {
      loadDeptSections();
    }
  }, [pageInitialized])

  if (!sectionsLoaded || !pageInitialized) {
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
            handleAssignClick={handleAssignClick}
            handleUnAssignClick={unAssignMember}
          />
        ))
      }
      <MemberAssignModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedRole={selectedRole}
        loadDeptSections={loadDeptSections}
      />
    </Container>
  )
}

export default Departments