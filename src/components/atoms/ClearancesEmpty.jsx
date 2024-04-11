import React from 'react';
import {
    Container, Grid, Paper, Box, CardMedia, Typography, Chip, Stack
} from '@mui/material';

const DashboardEmpty = () => {
    return (
        <Stack alignItems="center" sx={{mt: '5vh'}}>
            <img src="/static/images/destination.svg" width="60%" alt="" />
            <Typography variant='h5' color="primary">ALL DONE</Typography>
            <Typography variant='h6' color="text.secondary">No Clearances to Approve</Typography>
        </Stack>
    )
}

export default DashboardEmpty