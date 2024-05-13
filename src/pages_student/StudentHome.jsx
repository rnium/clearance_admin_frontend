import NavbarStudent from '../components/molecules/NavbarStudent';
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import ProfileEdit from "./ProfileEdit";
import { Box, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import * as urls from '../utils/api_urls';
import { setNoticeLoaded, loadNotice } from '../redux/studentStoreReducer';


const StudentHome = () => {
  const notice = useSelector(state => state.studentStore.notice);
  const dispatch = useDispatch();
  const loadStudentNotice = async () => {
    try {
      let res = await axios.get(urls.studentNoticeUrl);
      dispatch(loadNotice(res.data.notice));
    } catch (error) {
      console.log(error);
    }
    dispatch(setNoticeLoaded(true));
  }

  useEffect(() => {
    if (!notice.is_loaded) {
      loadStudentNotice();
    }
  })

  return (
    <div>
      <NavbarStudent />
      {
        notice.notice ?
          <Box sx={{ my: 0, py: 1 }} style={{ zIndex: '-1' }} >
            <Marquee speed={40} delay={3}>
              <Typography variant='body1' color="primary" sx={{ px: 2, fontSize: { xs: '0.7rem', md: '1rem' } }}>
                {notice.notice}
              </Typography>
            </Marquee>
          </Box> : null
      }
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/profile" element={<ProfileEdit />} />
      </Routes>
    </div>
  )
}

export default StudentHome