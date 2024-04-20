import { useState, useEffect } from 'react';
import { Modal, Spin, Empty, message } from 'antd';
import {
    Stack, Typography, TextField, Box, Button, Paper, Grid, Chip
} from '@mui/material';
import axios from 'axios';
import ClearanceDetailModalEntity from '../atoms/ClearanceDetailModalEntity';
import * as urls from '../../utils/api_urls';
import { getCookie } from '../../utils/cookies';


const ClearanceSection = (props) => {
    let entities = [];
    let title = "";
    console.log(props);
    if (props.type === 'administrative') {
        entities = props.data;
        title = "Administration"
    } else {
        if (props.data?.section_title) {
            title = props.data.section_title
        } else {
            title = props.data.title
        }
        entities = [...props.data.lab_approval, ...props.data.clerk_approval, props.data]
    }
    return (
        <div>
            <Typography
                variant='h5'
                textAlign="center"
                color="text.secondary"
                sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '1rem' } }}
            >
                {title}
            </Typography>
            <Grid container spacing={1} sx={{ mb: 3 }}>
                {
                    entities.map(e => (
                        <Grid item xs={12} md={6}>
                            <ClearanceDetailModalEntity entity={e} />
                        </Grid>
                    ))
                }

            </Grid>
        </div>
    )
}


const ClearanceDetailModal = (props) => {

    const [clearanceInfo, setClearanceInfo] = useState(
        {
            loaded: false,
            info: null
        }
    )

    const fetchClearanceInfo = async () => {
        let params = { ...props.selectedClearance }
        try {
            let res = await axios.get(urls.clearanceInfoAsAdminUrl, { params });
            setClearanceInfo(
                {
                    loaded: true,
                    info: res.data
                }
            );
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
        setClearanceInfo(
            {
                loaded: false,
                info: null
            }
        )
    }

    useEffect(() => {
        if (props.isModalOpen && !clearanceInfo.loaded) {
            fetchClearanceInfo();
        }
    })

    let title = 'View Clearance Flow';
    // if (apprdepartmentsLoaded) {
    //     title = `ApprDepartments  ${remarks.registration}`
    // }


    return (
        <Modal title={title} open={props.isModalOpen} footer={null} onCancel={onLocalClosure}>
            {
                clearanceInfo.loaded ?
                    props.selectedClearance.type === 'administrative' ?
                        <div>
                            <ClearanceSection type="administrative" data={clearanceInfo.info.adminstrative} />
                            {
                                clearanceInfo.info.department.map(dept => (
                                    <ClearanceSection type="department" data={dept} />
                                ))
                            }
                        </div>
                        : <ClearanceSection type="department" data={clearanceInfo.info} />
                    :
                    <Stack sx={{ py: 5 }}>
                        <Spin size='large' />
                    </Stack>
            }
        </Modal>
    )
}

export default ClearanceDetailModal;