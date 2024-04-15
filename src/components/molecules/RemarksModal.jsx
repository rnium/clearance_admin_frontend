import { useState, useEffect } from 'react';
import { Modal, Spin, message } from 'antd';
import {
    Stack, Typography, TextField, Box, Button, Paper
} from '@mui/material';
import axios from 'axios';
import * as urls from '../../utils/api_urls';


const RemarksModal = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const [remarks, setRemarks] = useState({
        registration: null,
        title: null,
        remarks_text: null,
    });
    const [remarksLoaded, setRemarksLoaded] = useState(false);
    const [newRemarks, setNewRemarks] = useState(null);

    const fetchRemarks = async () => {
        let params = {...props.selectedClearance}
        try {
            let res = await axios.get(urls.clearanceRemarksUrl, {params});
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

    let title = '';
    if (remarksLoaded) {
        title = `Remarks for ${remarks.registration}`
    }

    async function addRemakrs() {
        setSubmitting(true);
        // let params = { ...formData, dept: props.dept }
        // try {
        //     let res = await axios.post(urls.sessionAddUrl, params);
        //     message.success(res.data.info);
        //     await props.loadDeptSessions();
        //     props.setIsModalOpen(false);
        // } catch (error) {
        //     let error_msg = error?.response?.data?.details;
        //     if (error_msg === undefined) {
        //         error_msg = error.message;
        //     }
        //     message.error(error_msg);
        // }
        setSubmitting(false);
    }

    return (
        <Modal title={title} open={props.isModalOpen} footer={null} onCancel={() => props.setIsModalOpen(false)}>
            {
                !remarksLoaded ?
                    <Stack sx={{ py: 5 }}>
                        <Spin size='large' />
                    </Stack> :
                    <Stack alignItems="center" sx={{ mt: 4, pb: 1 }} spacing={2}>
                        <Typography sx={{ mb: 1 }} variant='h6' color="primary">
                            Electronics Lab
                        </Typography>
                        <Paper sx={{ width: '100%', backgroundColor: '#efefef' }}>
                            <Typography sx={{ p: 2 }} variant='body1'>
                                Lorem ipsum dolor sit.
                            </Typography>
                        </Paper>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Enter Remarks"
                            onChange={e => setNewRemarks(e.target.value)}
                            multiline
                            fullWidth
                            rows={3}
                        />
                        <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
                            <Button
                                disabled={submitting || newRemarks === null || newRemarks.length === 0}
                                variant='contained'
                                sx={{ px: 4 }}
                                onClick={addRemakrs}
                            >
                                Post
                            </Button>
                        </Box>
                    </Stack>
            }

        </Modal>
    )
}

export default RemarksModal