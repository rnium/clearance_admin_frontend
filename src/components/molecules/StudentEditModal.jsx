import { useState, useEffect } from 'react';
import { Modal, Spin, message, Popconfirm } from 'antd';
import {
    Stack, Typography, TextField, Grid,
    ListItemAvatar, Box, Button, InputLabel, FormControl, Select, MenuItem
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import * as urls from '../../utils/api_urls';
import { useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookies';

const non_resident_hall = {
    id: -1,
    codename: "non-resident",
    name: "Non-Residential",
    display_name: "Non-Residential",
    dept_type: "hall"
}


const StudentEditModal = (props) => {
    const usertype = useSelector(state => state.account.userinfo.user_type);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [halls, setHalls] = useState([]);
    const [hallsLoaded, setHallsLoaded] = useState(false);
    const [formData, setFormData] = useState(
        {
            first_name: '',
            last_name: '',
            hall_id: ''
        }
    );

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
        setIsSubmitting(true);
        event.preventDefault();
        const postData = new FormData();
        for (const key in formData) {
            if (Boolean(formData[key])) {
                postData.append(key, formData[key]);
            }
        }
        postData.append('registration', props.studentInfo.registration);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            await axios.post(urls.studentProfileUpdateByAdminUrl, postData, config);
            props.fetchStudents();
            message.success("Profile Updated", 5);
            props.setIsModalOpen(false);
        } catch (error) {
            let info = error?.response?.data?.details
            if (info === undefined) {
                info = error.message;
            }
            message.error(info, 5)
        }
        setIsSubmitting(false);
    }

    const handleDelete = async event => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            await axios.post(urls.deleteStudentAcUrl, {registration: props.studentInfo.registration}, config);
            props.fetchStudents();
            message.info("Account Deleted", 5)
            props.setIsModalOpen(false);
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


    useEffect(() => {
        if (!hallsLoaded) {
            loadHalls();
        }
    }, [])

    useEffect(() => {
        if (props.studentInfo) {
            setFormData(
                {
                    first_name: props.studentInfo?.first_name,
                    last_name: props.studentInfo?.last_name,
                    hall_id: props.studentInfo?.hall_id
                }
            )
        }
    }, [props.studentInfo])

    return (
        <Modal title="Edit Student Info" open={props.isModalOpen} footer={null} onCancel={() => props.setIsModalOpen(false)}>
            {
                props.studentInfo === null || hallsLoaded === false ?
                    <Stack sx={{ my: 10 }}>
                        <Spin size='large' />
                    </Stack> :
                    <form action="" onSubmit={handleSubmit} >
                        <Grid container spacing={1} sx={{ mt: 2 }}>
                            <Grid item xs={12}>
                                <TextField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} variant='outlined' fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} variant='outlined' fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Hall</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.hall_id}
                                        label="Select Hall"
                                        onChange={handleChange}
                                        name="hall_id"
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
                                {
                                    usertype === 'principal' || usertype === 'academic' ?
                                        <Box display="flex" justifyContent="space-between">
                                            <Popconfirm
                                                title="Delete Account"
                                                description="Are you sure to delete this student?"
                                                onConfirm={handleDelete}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button disabled={isSubmitting} sx={{ px: 5 }} color="error" variant='outlined'>Delete Student</Button>
                                            </Popconfirm>
                                            <Button disabled={isSubmitting} sx={{ px: 5 }} type="submit" variant='contained'>Save</Button>
                                        </Box> :
                                        <Box display="flex" justifyContent="flex-end">
                                            <Button disabled={isSubmitting} sx={{ px: 5 }} type="submit" variant='contained'>Save</Button>
                                        </Box>
                                }

                            </Grid>
                        </Grid>

                    </form>
            }
        </Modal>
    )
}

export default StudentEditModal