import React from 'react';
import {
    Box, Paper, Typography
} from '@mui/material';
import Clearance from '../molecules/Clearance';
import { Empty } from 'antd';

// Sample Data
import { students_data, peding_students } from '../../utils/sample_data'

const ClearanceSection = ({section_data, onAction}) => {
    let logo_src = "/static/images/cube.png";
    // if (section_data.type == 'administrative') {
    //     logo_src = "/static/images/cube.png"
    // }
    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', mb: 2 }} justifyContent="center">
                <img src={logo_src} alt="" width="30px" height="30px" />
                <Typography
                    variant='h5'
                    align='center'
                    sx={{ ml: 2 }}
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
                        type="pending"
                        onAction={onAction}
                        // handleOpenModal={}
                    />
                ))
            }
        </Box>
    )
}

export default ClearanceSection