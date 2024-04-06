import React from 'react';
import {
    Box, Typography
} from '@mui/material';
import { Spin } from 'antd';


const MainAuth = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" flexDirection="column" alignItems="center" width={{ xs: "90%", md: '30%' }} sx={{ mt: '25vh' }}>
                <img src="/static/images/cube(1).png" alt="Technoventure Logo" width="100px" />
                <Typography sx={{ mb: 3, mt: 1 }} color="text.secondary" variant='h5'>SEC Clearance Portal</Typography>
                <Spin size='large' />
            </Box>
        </Box>
    )
}

export default MainAuth;