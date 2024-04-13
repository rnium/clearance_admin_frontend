import { useState, useEffect } from 'react';
import { Modal, Spin, message } from 'antd';
import {
    Stack, Typography, TextField, FormControl, Select, MenuItem, Box, Button,
    InputLabel
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import * as urls from '../../utils/api_urls';

const undesignated_dept = {
    id: -1,
    codename: "undesignated",
    name: "<Undesignated>",
    display_name: "<Undesignated>",
    dept_type: "administrative"
}

const InvitationModal = ({ isModalOpen, setIsModalOpen }) => {
    const [email, setEmail] = useState(null);
    const [dept, setDept] = useState(-1);
    const [sending, setSending] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [deptsLoaded, setDeptsLoaded] = useState(false);

    async function loadDepts() {
        try {
            let res = await axios.get(urls.departmentsUrl);
            let data = res.data;
            data.unshift(undesignated_dept);
            setDepartments(data);
            setDeptsLoaded(true);
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
    }

    async function sendInvitation() {
        setSending(true);
        if (email === null || email === '') {
            message.warning("Enter email, please!");
            return;
        }
        try {
            let res = await axios.post(urls.sendInviatationUrl, {email, dept});
            setIsModalOpen(false);
            message.info(res.data.info);
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
        setSending(false);
    }

    useEffect(() => {
        if (!deptsLoaded) {
            loadDepts();
        }
    }, [])

    return (
        <Modal title="" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
            {
                !deptsLoaded ?
                    <Stack alignItems="center" sx={{ py: 10 }}>
                        <Spin size='large' />
                    </Stack> :
                    <Stack alignItems="center" sx={{ pt: 5, pb: 1 }} spacing={2}>
                        <img src="/static/images/message.png" alt="" width="120px" />
                        <Typography variant='body1' >Send signup invitation token via email</Typography>
                        <TextField
                            label="Recipient's Email"
                            variant="outlined"
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dept}
                                label="Select Department"
                                onChange={event => setDept(event.target.value)}
                            >
                                {
                                    departments.map((d, i) => (
                                        <MenuItem value={d.id}>{d.display_name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
                            <Button onClick={sendInvitation} disabled={sending} variant='contained' startIcon={<SendIcon />} sx={{ px: 2 }}>Send</Button>
                        </Box>
                    </Stack>
            }
        </Modal>
    )
}

export default InvitationModal