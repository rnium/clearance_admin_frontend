import React from 'react';
import {
  Box, Typography
} from '@mui/material';
import LoginForm from './LoginForm';
import Forgot from './Forgot'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import * as urls from '../data/backendUrls';


const MainAuth = () => {

  return (
    <BrowserRouter>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" flexDirection="column" alignItems="center" width={{ xs: "90%", md: '30%' }} sx={{ mt: '15vh' }}>
          <img src="/static/images/cube(1).png" alt="Technoventure Logo" width="100px" />
          <Typography sx={{ mb: 4, mt: 1 }} color="text.secondary" variant='h5'>SEC Clearance Portal</Typography>
          <Routes>
            <Route path='' element={<Navigate to="/login" />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/forgot' element={<Forgot />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default MainAuth