import React from 'react';
import {
    Box, Paper, Typography
} from '@mui/material';
import Clearance from '../molecules/Clearance';
import { Empty } from 'antd';


const ClearanceSection = ({section_data, onAction, handleRemarksClick, titleAlign='center', type='pending'}) => {
    let logo_src = "/static/images/cube.png";
    if (section_data.type === 'administrative' || section_data.type === 'dept_head') {
        logo_src = "/static/images/3d-cube.png"
    }
    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', mb: 2 }} alignItems="center" justifyContent={titleAlign}>
                <img src={logo_src} alt="" width="30px" height="30px" />
                <Typography
                    variant='h5'
                    align='center'
                    sx={{ ml: 2, fontSize: {xs: '1rem', md: '1.3rem'} }}
                    color="text.secondary"

                >
                    {section_data.title}
                </Typography>
            </Box>
            {
                section_data.approvals.length === 0 ?
                <Paper sx={{py: 7}}>
                    <Empty />
                </Paper>
                : section_data.approvals.map(student => (
                    <Clearance
                        key={student.registration}
                        student_data={student}
                        type={type}
                        approvalType={section_data.type}
                        onAction={onAction}
                        handleRemarksClick={handleRemarksClick}
                    />
                ))
            }
        </Box>
    )
}

export default ClearanceSection