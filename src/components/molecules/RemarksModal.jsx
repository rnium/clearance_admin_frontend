import { useState, useEffect } from 'react';
import { Modal, Spin, Empty, message, Popconfirm } from 'antd';
import {
    Stack, Typography, TextField, Box, Button, Paper, IconButton
} from '@mui/material';
import axios from 'axios';
import * as urls from '../../utils/api_urls';
import { getCookie } from '../../utils/cookies';
import DeleteIcon from '@mui/icons-material/Delete';


const RemarksModal = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const [remarks, setRemarks] = useState({
        registration: null,
        title: null,
        remarks_text: null,
    });
    const [remarksLoaded, setRemarksLoaded] = useState(false);
    const [newRemarks, setNewRemarks] = useState('');

    const fetchRemarks = async () => {
        let params = { ...props.selectedClearance }
        try {
            let res = await axios.get(urls.clearanceRemarksUrl, { params });
            setRemarks(res.data);
            setRemarksLoaded(true);
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
    }

    const addRemakrs = async () => {
        setSubmitting(true)
        let payload = { ...props.selectedClearance, remarks_text: newRemarks }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            let res = await axios.post(urls.clearanceRemarksUrl, payload, config);
            setRemarks(res.data);
            setRemarksLoaded(true);
            setNewRemarks('')
            message.success("Remarks posted")
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
        setSubmitting(false)
    }

    const removeRemakrs = async () => {
        setSubmitting(true)
        let payload = { ...props.selectedClearance }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            let res = await axios.post(urls.clearanceRemarksDeleteUrl, payload, config);
            message.success("Remarks deleted")
            onLocalClosure();
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
        setSubmitting(false)
    }

    const onLocalClosure = () => {
        props.setIsModalOpen(false)
        setRemarksLoaded(false);
        setRemarks({
            registration: null,
            title: null,
            remarks_text: null,
        });
        setNewRemarks('');
    }

    useEffect(() => {
        if (props.isModalOpen && !remarksLoaded) {
            fetchRemarks();
        }
    })

    let title = '';
    if (remarksLoaded) {
        title = `Remarks for ${remarks.registration}`
    }


    return (
        <Modal title={title} open={props.isModalOpen} footer={null} onCancel={onLocalClosure}>
            {
                !remarksLoaded ?
                    <Stack sx={{ py: 5 }}>
                        <Spin size='large' />
                    </Stack> :
                    <Stack alignItems="center" sx={{ mt: 4, pb: 1 }} spacing={2}>
                        <Typography sx={{ mb: 1, fontSize: { xs: '1rem', md: '1.3rem' } }} variant='h6' color="primary" textAlign="center">
                            {remarks.title}
                        </Typography>
                        {
                            remarks?.remarks_text ?
                                <Paper style={{ boxSizing: 'border-box' }} sx={{ width: '100%', pr: 3, backgroundColor: '#efefef', position: 'relative' }}>
                                    <Box sx={{ position: 'absolute', p: 1, right: 0, top: 0 }}>
                                        <Popconfirm
                                            title="Delete Remarks"
                                            description="Are you sure to delete the remarks?"
                                            onConfirm={removeRemakrs}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <IconButton color='error'>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Popconfirm>
                                    </Box>
                                    <Typography sx={{ p: 2 }} variant='body1'>
                                        {remarks.remarks_text}
                                    </Typography>
                                </Paper> :
                                <Empty
                                    description={
                                        <Typography variant='body2' color="text.secondary">No Remarks</Typography>
                                    }
                                />
                        }
                        {
                            props.pagetype !== 'approved' ?
                                <Stack spacing={2} sx={{ width: '100%' }}>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Write Remarks"
                                        onChange={e => setNewRemarks(e.target.value)}
                                        multiline
                                        fullWidth
                                        value={newRemarks}
                                        rows={3}
                                    />
                                    <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
                                        <Button
                                            disabled={submitting || newRemarks.length === 0}
                                            variant='contained'
                                            sx={{ px: 4 }}
                                            onClick={addRemakrs}
                                        >
                                            Post
                                        </Button>
                                    </Box>
                                </Stack> : null
                        }
                    </Stack>
            }

        </Modal>
    )
}

export default RemarksModal