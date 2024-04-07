import React from 'react';
import {
    TextField, Button, Stack, Typography, Fade
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { message } from 'antd'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        message.success("Recovery Email Sent", 5)
        // axios call here
        navigate('/')
    }
    return (
        <Fade in={true}>
            <div>
                <TextField sx={{ mb: 2 }} name="email" required onChange={handleChange} label="Email" type="email" variant="outlined" fullWidth />
                {
                    forgotForm.email.length ?
                        <Button onClick={handleSubmit} variant="contained" fullWidth>Send Recovery Link</Button>
                        : <Button onClick={handleSubmit} variant="contained" disabled fullWidth>Send Recovery Link</Button>
                }
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