import { useState, useEffect } from 'react';
import { Modal, Spin, Empty, message } from 'antd';
import {
    Stack, Typography, TextField, Box, Button, Paper, Grid, Chip
} from '@mui/material';
import axios from 'axios';
import ClearanceDetailModalEntity from '../atoms/ClearanceDetailModalEntity';
import * as urls from '../../utils/api_urls';
import { getCookie } from '../../utils/cookies';



const ClearanceDetailModal = (props) => {

    const [apprdepartmentsLoaded, setApprDepartmentsLoaded] = useState(false);
    const [apprdepartments, setApprDepartments] = useState([]);

    const fetchApprDepartments = async () => {
        let params = { ...props.selectedClearance }
        try {
            let res = await axios.get(urls.clearanceRemarksUrl, { params });
            setApprDepartments(res.data);
            setApprDepartmentsLoaded(true);
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
    }


    const onLocalClosure = () => {
        props.setIsModalOpen(false);
        setApprDepartmentsLoaded(false);
        setApprDepartments([]);
    }

    useEffect(() => {
        if (props.isModalOpen && !apprdepartmentsLoaded) {
            fetchApprDepartments();
        }
    })

    let title = 'Approvals';
    // if (apprdepartmentsLoaded) {
    //     title = `ApprDepartments  ${remarks.registration}`
    // }


    return (
        <Modal title={title} open={props.isModalOpen} footer={null} onCancel={onLocalClosure}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <ClearanceDetailModalEntity />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ClearanceDetailModalEntity />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ClearanceDetailModalEntity />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ClearanceDetailModal;