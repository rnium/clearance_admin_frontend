import React from 'react';
import {
    TextField, Button, Stack, Typography, Fade
} from '@mui/material';
import { message } from 'antd'
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [loginForm, setLoginForm] = React.useState({
        email: "",
        password: ""
    })

    const handleChange = event => {
        const { name, value } = event.target;
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
        <Fade in={true}>
            <div>
                <TextField sx={{ mb: 2 }} name="email" type="email" required onChange={handleChange} label="Email" variant="outlined" fullWidth />
                <TextField name="password" type="password" required onChange={handleChange} label="Password" variant="outlined" fullWidth />

                {
                    loginForm.email.length && loginForm.password.length ?
                        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 3 }} fullWidth>Login</Button>
                        : <Button onClick={handleSubmit} variant="contained" sx={{ mt: 3 }} fullWidth disabled>Login</Button>
                }
                <Stack direction="row" sx={{ mt: 1 }} justifyContent="right">
                    <Link to="/forgot">
                        <Typography color="primary" variant='body2' >Forgot Password?</Typography>
                    </Link>
                </Stack>
            </div>
        </Fade>
    )
}

export default LoginForm;