import React, { useState } from 'react';
import {
    TextField, Button, Stack, Typography, Fade
} from '@mui/material';
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as urls from '../utils/api_urls';
import { getCookie } from '../utils/cookies';
import { useDispatch, UseDispatch } from 'react-redux';
import { setUserInfo, setLoaded } from '../redux/accountReducer';

const LoginForm = () => {
    const [loginForm, setLoginForm] = React.useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = event => {
        const { name, value } = event.target;
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            const res = await axios.post(urls.loginUrl, loginForm, config);
            dispatch(setLoaded(true));
            dispatch(setUserInfo(res.data.data));
            navigate('/');
        } catch (error) {
            setIsSubmitting(false);
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg, 5)
        }
    }

    const handleKeyDown = e => {
        if (e.keyCode === 13) {
            handleSubmit()
        }
    }

    return (
        <Fade in={true}>
            <div>
                <TextField sx={{ mb: 2 }} name="email" type="email" required onChange={handleChange} label="Email" variant="outlined" fullWidth />
                <TextField name="password" type="password" required onChange={handleChange} onKeyDown={handleKeyDown} label="Password" variant="outlined" fullWidth />
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ mt: 3 }}
                    fullWidth 
                    disabled = {isSubmitting || loginForm.email.length === 0 || loginForm.password.length === 0}
                >
                    Login
                </Button>
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