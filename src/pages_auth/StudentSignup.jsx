import { useEffect } from 'react';
import {
    Box, Typography, Stack, Button, TextField, Grid, FormControl, Select, InputLabel, MenuItem
} from '@mui/material';
import PictureInput from '../components/atoms/PictureInput'
import { useState } from 'react';
import { message, Spin } from 'antd';
import axios from 'axios';
import * as urls from '../utils/api_urls';
import { getCookie } from '../utils/cookies';
import { useNavigate } from 'react-router-dom';
import { setUserInfo, setLoaded } from '../redux/accountReducer';
import { useDispatch } from 'react-redux';

const non_resident_hall = {
    id: -1,
    codename: "non-resident",
    name: "Non-Residential",
    display_name: "Non-Residential",
    dept_type: "hall"
}


const StudentSignup = () => {
    const navigate = useNavigate();
    const [halls, setHalls] = useState([]);
    const [hallsLoaded, setHallsLoaded] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(
        {
            first_name: '',
            last_name: '',
            registration_no: '',
            phone: '',
            email: '',
            session: '',
            department: '',
            hall: null,
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
        if (formData.phone.length !== 11) {
            message.error("Phone number should be 11 digits long", 5)
            return;
        }
        if (formData.hall === null) {
            message.error("Hall Selection Required! If you haven't been assigned a hall seat, please select the Non-Residential option.", 8)
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
            let res = await axios.post(urls.studentSignupUrl, postData, config);
            message.success("Signup complete", 5)
            setTimeout(() => {
                dispatch(setUserInfo(res.data.info));
                dispatch(setLoaded(true));
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

    async function loadHalls() {
        try {
            let res = await axios.get(urls.hallsUrl);
            let data = res.data;
            data.unshift(non_resident_hall);
            setHalls(data);
            setHallsLoaded(true);
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
    }
    useEffect(() => {
        loadHalls();
    }, [])

    return (
        <Box sx={{ display: 'flex' }} flexDirection="column" justifyContent="center" alignItems="center">
            <Box width={{ xs: "90%", md: '40%' }} sx={{ mt: 3, mb: 5 }}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" >
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <img src="/static/images/cube(1).png" alt="Technoventure Logo" width="100px" />
                    </Box>
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <img src="/static/images/cube(1).png" alt="Technoventure Logo" width="60px" />
                    </Box>
                    <Stack sx={{ ml: 1 }}>
                        <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }} variant='h5' component="span">SEC Clearance Portal</Typography>
                        <Typography color="text.secondary" variant='h6' sx={{ fontSize: { xs: '0.8rem', md: '1.2rem' } }}>Student Signup</Typography>
                    </Stack>
                </Box>
                {
                    !hallsLoaded ?
                        <Stack sx={{mt: 5}}>
                            <Spin size='large' />
                        </Stack> :
                        <form onSubmit={handleSubmit} >
                            <Grid container spacing={1} sx={{ mt: 2 }}>
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
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Hall</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.hall}
                                            label="Select Hall"
                                            onChange={handleChange}
                                            name="hall"
                                        >
                                            {
                                                halls.map(h => (
                                                    <MenuItem key={h.id} value={h.id}>{h.display_name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Phone Number" name="phone" onChange={handleChange} variant='outlined' required fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Email Address" name="email" type="email" onChange={handleChange} variant='outlined' required fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Password" name="password" type="password" onChange={handleChange} variant='outlined' required fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        (rePass !== null) & (rePass !== formData.password) ?
                                            <TextField error label="Retype Password" onChange={handleRePassChange} type="password" variant='outlined' required fullWidth />
                                            : <TextField label="Retype Password" onChange={handleRePassChange} type="password" variant='outlined' required fullWidth />
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
                }

            </Box>
        </Box>
    )
}

export default StudentSignup