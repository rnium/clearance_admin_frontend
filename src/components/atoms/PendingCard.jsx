import React from 'react';
import {
    Box, Typography
} from '@mui/material';

const PendingCard = () => {
    return (
        <Box sx={{ display: 'flex', mt: 5, flexDirection: 'column' }} alignItems="center" justifyContent="center">
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <img src="./static/images/verification.svg" width="300px" alt="" />
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <img src="./static/images/verification.svg" width="150px" alt="" />
            </Box>
            <Typography variant="h5" fontSize={{ xs: '1rem', md: '1.7rem' }} textAlign="center">Your Student Account is being verified by SEC Academic</Typography>
            <Typography variant="subtitle1" color="text.secondary" fontSize={{ xs: '0.7rem', md: '1rem' }} textAlign="center">Please ensure that your information is accurate and includes a valid profile picture</Typography>
        </Box>
    )
}

export default PendingCard