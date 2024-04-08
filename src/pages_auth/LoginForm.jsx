import React from 'react';
import {
    TextField, Button, Stack, Typography, Fade
} from '@mui/material';
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as urls from '../utils/api_urls';
import { useDispatch, UseDispatch } from 'react-redux';
import { setUserInfo, setLoaded } from '../redux/accountReducer'; 

const LoginForm = () => {
    const [loginForm, setLoginForm] = React.useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = event => {
        const { name, value } = event.target;
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        try {
          const res = await axios.post(urls.loginUrl, loginForm);
          dispatch(setLoaded(true));
          dispatch(setUserInfo(res.data.data));
          navigate('/');
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg, 5)
        }
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
                <Stack direction="row" sx={{ mt: 1 }} justifyContent="space-between">
                    <Link to="/forgot">
                        <Typography color="primary" variant='body2' >Forgot Password?</Typography>
                    </Link>
                    <Link to="/signup">
                        <Typography color="primary" variant='body2' >Student Signup</Typography>
                    </Link>
                </Stack>
            </div>
        </Fade>
    )
}

export default LoginForm;