import { useState, useEffect } from 'react';
import { Modal, Empty, Spin, message } from 'antd';
import {
    Stack, Typography, Alert, AlertTitle
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import * as urls from '../../utils/api_urls';
import { getCookie } from '../../utils/cookies';
import FileUploadButton from '../atoms/FileUploadButton';

const RegExcelModal = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const [excelFile, setExcelFile] = useState(null);

    const handleFileChange = e => {
        let file = e.target.files[0];
        setExcelFile(file);
    }

    async function uploadExcel() {
        setSubmitting(true);
        const postData = new FormData();
        postData.append('excel', excelFile);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            let res = await axios.post(urls.exportStudentRegExcel, postData, config);
            message.success("File Processed", 5);
            props.fetchStudents();
            props.setIsModalOpen(false);
        } catch (error) {
            let info = error?.response?.data?.details
            if (info === undefined) {
                info = error.message;
            }
            message.error(info, 5)
        }
        setSubmitting(false);
    }

    useEffect(() => {
        if (excelFile) {
            uploadExcel();
        }
    }, [excelFile])

    return (
        <Modal title="Export Excel" open={props.isModalOpen} footer={null} onCancel={() => props.setIsModalOpen(false)}>
            <Stack alignItems="center" sx={{ pt: 2, pb: 1 }} spacing={2}>
                <img src="/static/images/microsoft-excel.svg" alt="" width="90px" />
                <Typography variant='h6' textAlign="center">Add Student Registrations to {props.deptSelected.toUpperCase()}</Typography>
                <Alert severity='info'>
                    <AlertTitle>Please Note</AlertTitle>
                    The excel filename must contain session code (e.g.: 2018-19) and the file must have a column named as `reg` that contains the registration numbers of the session mentioned in the filename.
                </Alert>
                <Stack direction="row" justifyContent="flex-end" sx={{width: '100%', pt: 2}} spacing={3}>
                    <FileUploadButton title="Select & Process Excel" onChange={handleFileChange} isSubmitting={submitting} />
                </Stack>
            </Stack>
        </Modal>
    )
}

export default RegExcelModal