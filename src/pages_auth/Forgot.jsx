import React from 'react';
import {
    TextField, Button, Stack, Typography, Fade
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { message } from 'antd'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as urls from '../utils/api_urls'
import { getCookie } from '../utils/cookies';

const Forgot = () => {
    const [forgotForm, setForgotForm] = React.useState({
        email: ""
    })

    const navigate = useNavigate()

    const handleChange = event => {
        const { name, value } = event.target;
        setForgotForm({
            ...forgotForm,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
          const res = await axios.post(urls.sendRecoveryMailUrl, forgotForm, config);
          message.success(res.data.info)
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
                <TextField sx={{ mb: 2 }} name="email" required onChange={handleChange} label="Email" type="email" variant="outlined" fullWidth />
                <Button onClick={handleSubmit} variant="contained" disabled={forgotForm.email.length === 0} fullWidth>Send Recovery Link</Button>
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

export default Forgot;