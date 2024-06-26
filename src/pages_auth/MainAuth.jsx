import React from 'react';
import {
  Box, Typography
} from '@mui/material';
import LoginForm from './LoginForm';
import Forgot from './Forgot';
import ResetPass from './ResetPass';
import StudentSignup from './StudentSignup';
import AdminSignup from './AdminSignup';
import { Routes, Route } from 'react-router-dom'
import LoginRequired from './LoginRequired';
// import * as urls from '../data/backendUrls';

const CheckAuth = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center" width={{ xs: "90%", md: '30%' }} sx={{ mt: '15vh' }}>
        <img src="/static/images/cube(1).png" alt="CLR Logo" width="100px" />
        <Typography sx={{ mb: 4, mt: 1, fontSize: {xs: '1.2rem', md: '1.5rem'} }} color="text.secondary" variant='h5'>SEC Clearance Portal</Typography>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/account/recovery/:uid/:token/' element={<ResetPass />} />
          <Route path='/*' element={<LoginRequired />} />
        </Routes>
      </Box>
    </Box>
  )
}


const MainAuth = () => {
  return (
    <Routes>
      <Route path='member-signup/' element={<AdminSignup />} />
      <Route path='signup/' element={<StudentSignup />} />
      <Route path='/*' element={<CheckAuth />} />
    </Routes>
  )
}

export default MainAuth;