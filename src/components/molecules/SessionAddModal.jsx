import { useState, useEffect } from 'react';
import { Modal, Empty, Spin, message } from 'antd';
import {
    Stack, Typography, TextField, Box, Button
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import * as urls from '../../utils/api_urls';


const SessionAddModal = (props) => {
    const [adding, setAdding] = useState(false);
    const [formData, setFormdata] = useState(
        {
            from_year: '',
            to_year: '',
        }
    );

    const handleChange = e => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // async function addSession() {
    //     setSending(true);
    //     let params = { ...props.selectedRole, user_id: selectedUser }
    //     try {
    //         let res = await axios.post(urls.assignMemberUrl, params);
    //         await props.loadDeptSections();
    //         message.success(res.data.info);
    //         if (membersLoaded) {
    //             loadMembers(dispatch);
    //         }
    //         props.setIsModalOpen(false)
    //         setSelectedUser(null);
    //     } catch (error) {
    //         let error_msg = error?.response?.data?.details;
    //         if (error_msg === undefined) {
    //             error_msg = error.message;
    //         }
    //         message.error(error_msg);
    //     }
    //     setSending(false);
    // }

    return (
        <Modal title="" open={props.isModalOpen} footer={null} onCancel={() => props.setIsModalOpen(false)}>
            <Stack alignItems="center" sx={{ pt: 2, pb: 1 }} spacing={2}>
                <Typography variant='h6' >Add Session in EEE</Typography>
                <TextField
                    label="From Year"
                    name="from_year"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="To Year"
                    name="to_year"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                />
                <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
                    <Button
                        disabled={adding || formData.from_year.length == 0 || formData.to_year.length == 0}
                        variant='contained'
                        sx={{ px: 2 }}
                    >
                        Add
                    </Button>
                </Box>
            </Stack>
        </Modal>
    )
}

export default SessionAddModal