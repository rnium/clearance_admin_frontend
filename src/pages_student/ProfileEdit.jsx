import { useState, useEffect } from 'react';
import {
    Grid, Box, Stack, Typography, TextField, Button, Chip, FormControl, Select, MenuItem, InputLabel
} from '@mui/material';
import { Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as urls from '../utils/api_urls';
import PictureInput from '../components/atoms/PictureInput'
import { message, Spin } from 'antd';
import { loadInfo, setLoaded } from '../redux/studentStoreReducer';
import { getCookie } from '../utils/cookies';


const img_dim = 110;
const non_resident_hall = {
    id: -1,
    codename: "non-resident",
    name: "Non-Residential",
    display_name: "Non-Residential",
    dept_type: "hall"
}


const Profile = () => {
    const dispatch = useDispatch();
    const studentInfo = useSelector(state => state.studentStore.info);
    const studentInfoLoaded = useSelector(state => state.studentStore.is_loaded);
    const [halls, setHalls] = useState([]);
    const [hallsLoaded, setHallsLoaded] = useState(false);
    let full_name = studentInfo?.first_name;
    if (studentInfo?.last_name) {
        full_name += ` ${studentInfo?.last_name}`
    }
    const [formData, setFormData] = useState(
        {
            first_name: studentInfo?.first_name,
            last_name: studentInfo?.last_name,
            email: studentInfo?.email,
            hall: null,
            password: '',
        }
    );
    const [fileInfo, setFileInfo] = useState('No File Selected');
    const [rePass, setRePass] = useState(null);
    const [profilePhoto, setprofilePhoto] = useState(null);

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

    const handleSubmit = async event => {
        event.preventDefault()
        if (formData.password.length > 0 && formData.password !== rePass) {
            message.error("Passwords doesn't matches", 5)
            return;
        }
        const postData = new FormData();
        for (const key in formData) {
            if (Boolean(formData[key])) {
                postData.append(key, formData[key]);
            }
        }
        if (profilePhoto !== null) {
            postData.append('profilePhoto', profilePhoto);
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            const response = await axios.post(urls.studentProfileUpdateUrl, postData, config);
            message.success("Profile Updated", 5)
            setTimeout(() => {
                dispatch(loadInfo(response.data.info));
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
    useEffect(() => {
        async function loadStudentInfo() {
            try {
                let res = await axios.get(urls.studentinfoUrl);
                dispatch(loadInfo(res.data.info));
                dispatch(setLoaded(true));
                setFormData(
                    {
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: '',
                    }
                )
            } catch (error) {
                let error_msg = error?.response?.data?.details;
                if (error_msg === undefined) {
                    error_msg = error.message;
                }
                message.error(error_msg);
            }
        }
        if (!studentInfoLoaded) {
            loadStudentInfo();
        }
        if (!hallsLoaded) {
            loadHalls();
        }
    }, [])
    if (!studentInfoLoaded || !hallsLoaded) {
        return (
            <Stack sx={{ mt: '15vh' }}>
                <Spin size='large' />
            </Stack>
        )
    }
    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignContent="center">
            <Box sx={{ mt: '5vh', mb: 5 }} width={{ xs: "90%", md: '40%' }}>
                <Box display="flex" flexDirection="row" alignContent="center">
                    <Image
                        width={img_dim}
                        height={img_dim}
                        src={urls.baseUrl + studentInfo?.avatar_url}
                        fallback="data:image/png;base64,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"
                    />
                    <Stack sx={{ ml: { xs: 2, md: 5 } }} justifyContent="center">
                        <Typography variant='h5' sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>{full_name}</Typography>
                        <Typography variant='subtitle1' sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>{studentInfo?.registration}</Typography>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Typography variant='subtitle2'>{studentInfo?.session}</Typography>
                            {
                                studentInfo.hall ?
                                    <Chip label={studentInfo.hall} color="primary" size='small' /> :
                                    <Chip label="Non Resident" color="secondary" size='small' variant="outlined" />
                            }
                        </Stack>
                        <Stack sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <Typography variant='subtitle2'>{studentInfo?.session}</Typography>
                            {
                                studentInfo.hall ?
                                    <Chip label={studentInfo.hall} color="primary" size='small' /> :
                                    <Chip label="Non Resident" color="secondary" size='small' variant="outlined" />
                            }
                        </Stack>
                    </Stack>
                </Box>
                <form action="" onSubmit={handleSubmit} >
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                            <TextField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} variant='outlined' fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} variant='outlined' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} variant='outlined' fullWidth />
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
                            <TextField label="Password" name="password" type="password" onChange={handleChange} variant='outlined' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            {
                                (rePass !== null) & (rePass !== formData.password) ?
                                    <TextField error label="Retype Password" onChange={handleRePassChange} type="password" variant='outlined' fullWidth />
                                    : <TextField label="Retype Password" onChange={handleRePassChange} type="password" variant='outlined' fullWidth />
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
                                <Button sx={{ px: 5 }} type="submit" variant='contained'>Save</Button>
                            </Box>
                        </Grid>
                    </Grid>

                </form>
            </Box>
        </Box>
    )
}

export default Profile