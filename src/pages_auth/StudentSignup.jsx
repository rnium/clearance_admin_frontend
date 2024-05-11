import { useEffect } from 'react';
import {
    Box, Typography, Stack, Button, TextField, Grid, FormControl,
    Paper, Select, InputLabel, MenuItem, Container, Accordion,
    AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon
} from '@mui/material';
import PictureInput from '../components/atoms/PictureInput'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useState } from 'react';
import { message, Spin, Timeline } from 'antd';
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
        <Container sx={{ my: 6 }} >

            <Box display="flex" flexDirection="row" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }} >
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" >
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <img src="/static/images/cube(1).png" alt="Logo" width="70px" />
                    </Box>
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <img src="/static/images/cube(1).png" alt="Logo" width="60px" />
                    </Box>
                    <Stack sx={{ ml: { xs: 1, md: 3 } }}>
                        <Typography sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }} variant='h5' component="span">SEC Clearance Portal</Typography>
                        <Typography color="text.secondary" variant='h6' sx={{ fontSize: { xs: '0.8rem', md: '1.2rem' } }}>Student Signup</Typography>
                    </Stack>
                </Box>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>

                    {
                        !hallsLoaded ?
                            <Stack sx={{ mt: 5 }}>
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
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper sx={{ py: 3, px: { xs: 2, md: 3 }, backgroundColor: 'aliceblue' }}>
                        <Typography variant='h6'>Guide for Students</Typography>
                        <Typography variant='body1'>
                            Congratulations on successfully completing your academic journey at Sylhet Engineering College. As you begin the clearance registration process, here are some important notes to guide you.
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Traditional vs Online Clearance Method
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant='body2' color="text.secondary">
                                        In the traditional method, applicants had to collect a clearance form and visit each lab in-charge, the department head, and administration for their signatures. This process was time-consuming and exhausting for the applicant. The online portal simplifies the approval process. All you need to do is create an account as a student and apply for clearance once your account is approved
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    Steps of Getting Online Clearance
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Timeline
                                        items={[
                                            {
                                                children: 'Create an account with valid information',
                                            },
                                            {
                                                children: 'Wait until SEC Academic verifies your information and gives approval. You will be notified the confirmation approval via email.',
                                            },
                                            {
                                                children: "After your account is approved, you'll be able to apply for clearance from your dashboard.",
                                            },
                                            {
                                                children: "After you've applied for clearance, an approval request will be sent to all lab in-charges, department heads, general department staff, the general department in-charge, the cash section, the principal, and SEC Academic. It may take a day or two to receive all the approvals.",
                                            },
                                            {
                                                children: "Once you have received all the approvals, you will be able to download your Clearance Approval Report from the dashboard. This report is the final document required for official documentation.",
                                            },
                                        ]}
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    Prerequisites
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <TaskAltIcon sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }} />
                                            </ListItemIcon>
                                            <Typography variant='body2' color="text.secondary">
                                                Your final semester result must be published, and you need to pass accordingly.
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <TaskAltIcon sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }} />
                                            </ListItemIcon>
                                            <Typography variant='body2' color="text.secondary">
                                                To be able to signup, your registration number needs to be added in the clearance system by SEC Academic.
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <TaskAltIcon sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }} />
                                            </ListItemIcon>
                                            <Typography variant='body2' color="text.secondary">
                                                It's advised to clear all dues before applying for clearance.
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    The Clearance Approval Report
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant='body2' color="text.secondary">
                                        After you have received 100% approval, you will receive a Clearance Approval Report. This is similar to the traditional clearance form, but it does not require any physical signatures, as all administrative members have already digitally signed it. Download the report from the dashboard and print a color copy of it.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    The Profile Picture
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant='body2' color="text.secondary">
                                        Every student applying for online clearance must upload a formal profile picture. The photo should have an aspect ratio of 1:1 and the file size must be less than 1MB. Please ensure to upload a formal photo for your profile picture, as it will be utilized in official documents.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default StudentSignup