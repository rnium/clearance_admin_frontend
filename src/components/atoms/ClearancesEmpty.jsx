import React from 'react';
import {
    Fade, Typography, Chip, Stack
} from '@mui/material';

const DashboardEmpty = () => {
    return (
        <Fade in={true}>
            <Stack alignItems="center" sx={{ mt: '5vh' }}>
                <img src="/static/images/destination.svg" width="60%" alt="" />
                <Typography variant='h5' color="primary">ALL DONE</Typography>
                <Typography variant='h6' color="text.secondary">No Clearances to Approve</Typography>
            </Stack>
        </Fade>
    )
}

export default DashboardEmpty