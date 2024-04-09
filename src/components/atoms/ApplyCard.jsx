import React from 'react';
import {
    Box, Typography, Button
} from '@mui/material';

const PendingCard = ({onApply}) => {
    return (
        <Box sx={{ display: 'flex', mt: 5, flexDirection: 'column' }} alignItems="center" justifyContent="center">
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <img src="./static/images/apply.svg" width="300px" alt="" />
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <img src="./static/images/apply.svg" width="150px" alt="" />
            </Box>
            <Typography variant="h5" fontSize={{ xs: '1rem', md: '1.7rem' }} textAlign="center">Great!!! Now You Can Apply For Clearance</Typography>
            <Button variant='contained' sx={{ mt: 3, px: 5, py: 1, borderRadius: '180px' }}>Apply Now</Button>
        </Box>
    )
}

export default PendingCard