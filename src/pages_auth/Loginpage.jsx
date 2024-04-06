import React from 'react';
import {
    Box, TextField, Button, Typography
} from '@mui/material';
import {message} from 'antd'
import axios from 'axios';
// import * as urls from '../data/backendUrls';


const Loginpage = () => {
  const [loginForm, setLoginForm] = React.useState({
    username: "",
    password: ""
  })

  const handleChange = event => {
    const {name, value} = event.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }

  const handleSubmit = async () => {
    message.error("Credentials Mismatch", 5)
    // try {
    //   const res = await axios.post(urls.loginUrl, loginForm);
    //   setAdminUserName(res.data.username);
    // } catch (error) {
    //   alert(error.message);
    // }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" flexDirection="column" alignItems="center" width={{xs: "90%", md: '30%'}} sx={{mt:'15vh'}}>
          <img src="/static/images/cube(1).png" alt="Technoventure Logo" width="100px" />
          <Typography sx={{mb:4, mt: 1}} color="text.secondary" variant='h5'>SEC Clearance Portal</Typography>
          <TextField sx={{mb:2}} name="username" required onChange={handleChange} label="Username" variant="outlined" fullWidth/>
          <TextField name="password" type="password" required onChange={handleChange} label="Password" variant="outlined" fullWidth/>
          <Button onClick={handleSubmit} variant="contained" sx={{mt: 3}} fullWidth>Login</Button>
        </Box>
    </Box>
  )
}

export default Loginpage