import { useState, useEffect } from 'react';
import {
  Box, Container, Grid, Typography, Paper, Avatar, Stack, Chip, Button, TextField,
  FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
import { Modal } from 'antd';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import SendIcon from '@mui/icons-material/Send';
import MemberSection from '../components/organisms/MemberSection';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, message } from 'antd';
import axios from 'axios';
import * as urls from '../utils/api_urls'
import {setMembers, setLoaded} from '../redux/membersReducer'

const departments = [
  {
    codename: 'general',
    name: 'General',
    title: 'General Department'
  },
  {
    codename: 'eee',
    name: 'EEE',
    title: 'Department of EEE'
  },
  {
    codename: 'cse',
    name: 'CSE',
    title: 'Department of CSE'
  },
  {
    codename: 'ce',
    name: 'CE',
    title: 'Department of CE'
  },
  {
    codename: 'non-tech',
    name: 'Non Tech',
    title: 'Non Tech Department'
  },
]

const Members = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dept, setDept] = useState('general');
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
        <Modal title="" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
          <Stack alignItems="center" sx={{ pt: 5, pb: 1 }} spacing={2}>
            <img src="/static/images/message.png" alt="" width="120px" />
            <Typography variant='body1' >Send signup invitation token via email</Typography>
            <TextField
              label="Recipient's Email"
              variant="outlined"
              type="email"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dept}
                label="Select Department"
                onChange={event => setDept(event.target.value)}
              >
                {
                  departments.map((d, i) => (
                    <MenuItem value={d.codename}>{d.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
              <Button variant='contained' startIcon={<SendIcon />} sx={{ px: 2 }}>Send</Button>
            </Box>
          </Stack>
        </Modal>
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