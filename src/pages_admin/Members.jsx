import { useState, useEffect } from 'react';
import {
  Box, Container, Grid, Typography, Paper, Avatar, Stack, Chip, Button, TextField,
  FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';

import MemberSection from '../components/organisms/MemberSection';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, message } from 'antd';
import axios from 'axios';
import * as urls from '../utils/api_urls'
import {setMembers, setLoaded} from '../redux/membersReducer';
import InvitationModal from '../components/molecules/InvitationModal';



const Members = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const memberSections = useSelector(state => state.members.memberSections)
  const membersLoaded = useSelector(state => state.members.is_loaded)
  const dispatch = useDispatch();

  async function loadMembers() {
    try {
      let res = await axios.get(urls.membersUrl);
      dispatch(setMembers(res.data))
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
    if (!membersLoaded) {
      loadMembers();
    }
  }, [])

  if (!membersLoaded) {
    return (
      <Stack alignItems="center" sx={{mt: 10}}>
        <Spin size='large' />
      </Stack>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Box sx={{ display: 'flex' }} justifyContent="flex-end">
        <Button variant='contained' startIcon={<MarkAsUnreadIcon />} onClick={() => setIsModalOpen(true)}>Send Invitation</Button>
        <InvitationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Box>
      {
        memberSections.map(section => (
          <MemberSection section={section} />
        ))
      }
    </Container>
  )
}

export default Members