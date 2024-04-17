import React from 'react';
import {
    Box, Typography, Paper, Alert, AlertTitle, Stack, Chip
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';

const DeptEntity = ({ entity }) => {
    let logo_src = '/static/images/cube.png';
    if (entity.role === 'administrative' || entity.role === 'dept_head') {
        logo_src = '/static/images/3d-cube.png';
    }
    let title = entity.title;
    if (entity.role === 'dept_head') {
        title = 'Head of the department';
    }

    return (
        <Paper style={{ overflow: 'hidden', position: 'relative' }} className="clearanceEntity" elevation={2}>
            <img className='role-logo' src={logo_src} alt="" />
            <Box>
                <Stack alignItems="center" sx={{ px: 2, py: 3 }} spacing={3}>
                    <Typography align='center' variant='h6' color="primary" sx={{ fontSize: { xs: '1rem', md: '1.4rem' } }}>
                        {title}
                    </Typography>
                    {
                        entity.is_approved ?
                            <Chip label="Cleared" color='success' icon={<CheckIcon />} sx={{ px: 2 }} />
                            : entity.is_seekable ?
                                <Chip label="Pending" color="secondary" icon={<HourglassBottomIcon />} sx={{ px: 2 }} />
                                : <Chip label="Not Activated" icon={<HourglassDisabledIcon />} sx={{ px: 2 }} />
                    }

                </Stack>
            </Box>
        </Paper>
    )
}

export default DeptEntity