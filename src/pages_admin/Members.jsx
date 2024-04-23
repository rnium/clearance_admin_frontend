import { useState, useEffect } from 'react';
import {
  Box, Container, Stack, Button, Grid, Paper
} from '@mui/material';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';

import MemberSection from '../components/organisms/MemberSection';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, message } from 'antd';
import axios from 'axios';
import * as urls from '../utils/api_urls'
import { setMembers, setLoaded } from '../redux/membersReducer';
import InvitationModal from '../components/molecules/InvitationModal';
import ChangeDeptModal from '../components/molecules/ChangeDeptModal';
import DeleteAccountModal from '../components/molecules/DeleteAccountModal';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


export const loadMembers = async (dispatch) => {
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

const Members = () => {
  const adminAcType = useSelector(state => state.account.userinfo?.user_type);
  const [pageInitialized, setPageInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangeDeptModalOpen, setIsChangeDeptModalOpen] = useState(false);
  const [isDeleteAcModalOpen, setIsDeleteAcModalOpen] = useState(false);
  const memberSections = useSelector(state => state.members.memberSections)
  const membersLoaded = useSelector(state => state.members.is_loaded)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pageInitialized) {
      setPageInitialized(true);
    }
    if (!membersLoaded) {
      loadMembers(dispatch);
    }
  }, [pageInitialized])

  if (!membersLoaded || !pageInitialized) {
    return (
      <Stack alignItems="center" sx={{ mt: 10 }}>
        <Spin size='large' />
      </Stack>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      {
        adminAcType === 'academic' || adminAcType === 'principal' ?
          <Box sx={{ display: 'flex' }} justifyContent="flex-end">
            <Button variant='contained' startIcon={<MarkAsUnreadIcon />} onClick={() => setIsModalOpen(true)}>Send Invitation</Button>
            <InvitationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          </Box> : null
      }

      {
        memberSections.map(section => (
          <MemberSection section={section} />
        ))
      }
      {
        adminAcType === 'academic' || adminAcType === 'principal' ?
          <Box sx={{ p: 3, my: 2 }}>
            <ChangeDeptModal
              isModalOpen = {isChangeDeptModalOpen}
              setIsModalOpen = {setIsChangeDeptModalOpen}
              loadMembers = {() => loadMembers(dispatch)}
            />
            <DeleteAccountModal
              isModalOpen = {isDeleteAcModalOpen}
              setIsModalOpen = {setIsDeleteAcModalOpen}
              loadMembers = {() => loadMembers(dispatch)}
            />
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} md={4}>
                <Button sx={{ borderRadius: '180px' }} onClick={() => setIsChangeDeptModalOpen(true)} variant='contained' startIcon={<ManageAccountsIcon />} color="secondary" fullWidth >Change User Department</Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button sx={{ borderRadius: '180px' }} onClick={() => setIsDeleteAcModalOpen(true)} variant='contained' startIcon={<DeleteIcon />} color="error" fullWidth>Delete An Account</Button>
              </Grid>
            </Grid>
          </Box> : null
      }

    </Container>
  )
}

export default Members