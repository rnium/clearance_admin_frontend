import React from 'react';
import {
  TextField, Button, Stack, Typography, Fade, Alert
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { message } from 'antd'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginRequired = () => {
  return (
    <Fade in={true}>
      <div>
        <Alert severity="info">You need to login to view this page</Alert>
        <Stack direction="row" sx={{ mt: 2 }} justifyContent="left" alignItems="center">
          <ArrowBackIosIcon fontSize='small' color='primary' />
          <Link to="/">
            <Typography color="primary" variant='body1' >Login</Typography>
          </Link>
        </Stack>
      </div>
    </Fade>
  )
}

export default LoginRequired