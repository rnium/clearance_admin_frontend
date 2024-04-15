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
    const deptName = props.dept.toUpperCase();
    const [formData, setFormdata] = useState(
        {
            from_year: '',
            to_year: '',
            batch_no: '',
        }
    );

    const handleChange = e => {
        if (e.target.value.length === 0) {
            setFormdata({
                ...formData,
                [e.target.name]: ''
            })
            return;
        }
        let val = parseInt(e.target.value);
        if (isNaN(val)) {
            message.warning("Please enter a number");
            return;
        }   else if (e.target.name !== 'batch_no') {
            val = (val % 2000) + 2000;
        }
        setFormdata({
            ...formData,
            [e.target.name]: val
        })
    }

    async function addSession() {
        setAdding(true);
        let params = { ...formData, dept: props.dept }
        try {
            let res = await axios.post(urls.sessionAddUrl, params);
            message.success(res.data.info);
            await props.loadDeptSessions();
            props.setIsModalOpen(false);
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
        setAdding(false);
    }

    return (
        <Modal title="" open={props.isModalOpen} footer={null} onCancel={() => props.setIsModalOpen(false)}>
            <Stack alignItems="center" sx={{ pt: 2, pb: 1 }} spacing={2}>
                <Typography variant='h6' >Add Session in {deptName}</Typography>
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
                <TextField
                    label={`${deptName} Batch Number`}
                    name="batch_no"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                />
                <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
                    <Button
                        disabled={adding || !formData.from_year || !formData.to_year || !formData.batch_no}
                        variant='contained'
                        sx={{ px: 2 }}
                        onClick={addSession}
                    >
                        Add
                    </Button>
                </Box>
            </Stack>
        </Modal>
    )
}

export default SessionAddModal