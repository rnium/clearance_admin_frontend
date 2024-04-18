import React from 'react';
import {
    TextField, Button, Stack, Typography, Fade
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { message } from 'antd'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../utils/cookies';
import * as urls from '../utils/api_urls'

const ResetPass = () => {
    const [password, setPassword] = React.useState('')
    const [rePass, setRepass] = React.useState('')

    const navigate = useNavigate();
    const {uid, emailb64} = useParams()


    const handleSubmit = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            let payload = {uid, emailb64, password}
          const res = await axios.post(urls.resetPassowordUrl, payload, config);
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
            <div sx={{ width: '100%' }}>
                <TextField sx={{mb: 1}} onChange={e => setPassword(e.target.value)} label="New Passoword" type="passoword" variant="outlined" fullWidth />
                {
                    (rePass.length > 0) & (rePass !== password) ?
                        <TextField sx={{mb: 3}} error label="Retype Passoword" onChange={e => setRepass(e.target.value)} type="password" variant='outlined' fullWidth />
                        : <TextField sx={{mb: 3}} label="Retype Passoword" onChange={e => setRepass(e.target.value)} type="password" variant='outlined' fullWidth />
                }
                {
                    (password.length > 0) & (password === rePass) ?
                        <Button onClick={handleSubmit} variant="contained" fullWidth>Reset</Button>
                        : <Button onClick={handleSubmit} variant="contained" disabled fullWidth>Reset</Button>
                }
            </div>
        </Fade>
    )
}

export default ResetPass;