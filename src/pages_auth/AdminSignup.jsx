import { useState, useEffect } from 'react';
import {
    Box, Typography, Stack, Button, TextField, Grid
} from '@mui/material';
import { message, Spin } from 'antd';
import PictureInput from '../components/atoms/PictureInput'
import axios from 'axios';
import * as urls from '../utils/api_urls';
import { getCookie } from '../utils/cookies';
import { useNavigate } from 'react-router-dom';


const AdminSignup = () => {
    const [token, setToken] = useState('');
    const [tokenValidated, setTokenValidated] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [formData, setFormData] = useState(
        {
            first_name: '',
            last_name: '',
            password: '',
        }
    );
    const [fileInfo, setFileInfo] = useState('No File Selected');
    const [rePass, setRePass] = useState(null);
    const [profilePhoto, setprofilePhoto] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault()
        if (formData.password !== rePass) {
            message.error("Passwords doesn't matches", 5)
            return;
        }
        
        const postData = new FormData();
        for (const key in formData) {
            if (key !== 'last_name' && formData[key].length === 0) {
                message.warning(`${key} cannot be empty`);
                return;
            }
            postData.append(key, formData[key]);
        }
        
        postData.append('tokenid', token);
        if (profilePhoto !== null) {
            postData.append('profilePhoto', profilePhoto);
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            await axios.post(urls.adminSignupApiUrl, postData, config);
            message.success("Signup complete", 5)
            setTimeout(() => {
                navigate('/');
            }, 1000)
        } catch (error) {
            let info = error?.response?.data?.details
            if (info === undefined) {
                info = error.message;
            }
            message.error(info, 5)
        }
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function validateToken(tokenid) {
        let params = { tokenid: tokenid }
        try {
            await axios.get(urls.validateTokenUrl, { params });
            setIsTokenValid(true);
            setToken(tokenid);
        } catch (error) {
            setIsTokenValid(false);
        }
        setTokenValidated(true);
    }

    const handleFileChange = e => {
        let file = e.target.files[0];
        let filesize = (file.size / 1024).toFixed(1);
        if (file.type !== 'image/png' & file.type !== 'image/jpeg') {
            message.error("Invalid File Type", 4);
            return;
        }
        if (filesize > 1000) {
            message.error("File too large. Must be less than 1MB", 5);
            return;
        }
        let info = `Image selected. Size: ${filesize}KB`
        setFileInfo(info);
        setprofilePhoto(file);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let tokenid = urlParams.get('tokenid');
        if (!tokenValidated) {
            validateToken(tokenid);
        }
    })
    document.title = "Member Signup"

    return (
        <Box sx={{ display: 'flex' }} flexDirection="column" justifyContent="center" alignItems="center">
            <Box width={{ xs: "90%", md: '40%' }} sx={{ mt: '15vh', mb: 5 }}>
                {
                    !tokenValidated ?
                        <Stack alignItems="center">
                            <Spin size='large' />
                        </Stack> :
                        !isTokenValid ?
                            <Stack alignItems="center">
                                <Typography variant='h4' color='error'>INVALID TOKEN</Typography>
                            </Stack> :
                            <div>
                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" >
                                    <img src="/static/images/cube(1).png" alt="Technoventure Logo" width="100px" />
                                    <Stack sx={{ ml: 1 }}>
                                        <Typography color="text.secondary" variant='h5' component="span">SEC Clearance Portal</Typography>
                                        <Typography color="text.secondary" variant='h6'>Member Signup</Typography>
                                    </Stack>
                                </Box>
                                <form action="" onSubmit={handleSubmit} >
                                    <Grid container spacing={3} sx={{ mt: 4 }}>
                                        <Grid item xs={12} md={6}>
                                            <TextField label="First Name" name='first_name' onChange={handleChange} variant='outlined' required fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField label="Last Name" name='last_name' onChange={handleChange} variant='outlined' fullWidth />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField label="Passoword" name='password' onChange={handleChange} type="password" variant='outlined' required fullWidth />
                                        </Grid>
                                        <Grid item xs={12}>
                                            {
                                                (rePass !== null) & (rePass !== formData.password) ?
                                                    <TextField
                                                        label="Retype Passoword"
                                                        error
                                                        type="password"
                                                        onChange={e => setRePass(e.target.value)}
                                                        variant='outlined'
                                                        required fullWidth
                                                    /> :
                                                    <TextField
                                                        label="Retype Passoword"
                                                        type="password"
                                                        onChange={e => setRePass(e.target.value)}
                                                        variant='outlined'
                                                        required fullWidth
                                                    />
                                            }
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={1}>
                                                <PictureInput onChange={handleFileChange} />
                                                <Typography variant='body2' color="text.secondary">{fileInfo}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Button type='submit' sx={{ px: 5 }} variant='contained'>Signup</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                </form>
                            </div>
                }
            </Box>
        </Box>
    )
}

export default AdminSignup