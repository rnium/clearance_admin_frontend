import React from 'react';
import {
    Box, Typography, Stack, Button, TextField, Grid
} from '@mui/material';
import PictureInput from '../components/atoms/PictureInput'
import { useState } from 'react';
import { message } from 'antd';
import axios from 'axios';
import * as urls from '../utils/api_urls';
import { getCookie } from '../utils/cookies';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/accountReducer';
import { useNavigate } from 'react-router-dom';


const StudentSignup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {
            first_name: '',
            last_name: '',
            registration_no: '',
            email: '',
            session: '',
            department: '',
            password: '',
        }
    );
    const [fileInfo, setFileInfo] = useState('No File Selected');
    const [rePass, setRePass] = useState(null);
    const [profilePhoto, setprofilePhoto] = useState(null);
    const handleSubmit = async event => {
        event.preventDefault()
        if (formData.password !== rePass) {
            message.error("Passwords doesn't matches", 5)
            return;
        }
        if (profilePhoto === null) {
            message.error("Profile photo not selected", 5)
            return;
        }
        const postData = new FormData();
        for (const key in formData) {
            postData.append(key, formData[key]);
        }
        postData.append('profilePhoto', profilePhoto);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            const response = await axios.post(urls.studentSignupUrl, postData, config);
            message.success("Signup complete", 5)
            setTimeout(() => {
                dispatch(setUserInfo(response.data.info));
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
    const handleRePassChange = e => {
        setRePass(e.target.value);
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

    return (
        <Box sx={{ display: 'flex' }} flexDirection="column" justifyContent="center" alignItems="center">
            <Box width={{ xs: "90%", md: '40%' }} sx={{ mt: '8vh', mb: 5 }}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" >
                    <img src="/static/images/cube(1).png" alt="Technoventure Logo" width="100px" />
                    <Stack sx={{ ml: 1 }}>
                        <Typography color="text.secondary" variant='h5' component="span">SEC Clearance Portal</Typography>
                        <Typography color="text.secondary" variant='h6'>Student Signup</Typography>
                    </Stack>
                </Box>
                <form onSubmit={handleSubmit} >
                    <Grid container spacing={1} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={6}>
                            <TextField label="First Name" name="first_name" onChange={handleChange} variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Last Name" name="last_name" onChange={handleChange} variant='outlined' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Registration No." name="registration_no" onChange={handleChange} variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Department (e.g., EEE)" name="department" onChange={handleChange} variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Session (e.g., 2018-19)" name="session" onChange={handleChange} variant='outlined' fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Email Address" name="email" type="email" onChange={handleChange} variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Passoword" name="password" type="password" onChange={handleChange} variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            {
                                (rePass !== null) & (rePass !== formData.password) ?
                                    <TextField error label="Retype Passoword" onChange={handleRePassChange} type="password" variant='outlined' required fullWidth />
                                    : <TextField label="Retype Passoword" onChange={handleRePassChange} type="password" variant='outlined' required fullWidth />
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
                                {/* <FormGroup>
                                    <FormControlLabel required control={<Checkbox defaultChecked />} label="Agree to terms of service" />
                                </FormGroup> */}
                                <Button sx={{ px: 5 }} type="submit" variant='contained'>Signup</Button>
                            </Box>
                        </Grid>
                    </Grid>

                </form>
            </Box>
        </Box>
    )
}

export default StudentSignup