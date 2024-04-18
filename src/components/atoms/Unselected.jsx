import React from 'react';
import {
    Box, Stack, Typography
} from '@mui/material'

const Unselected = ({ image='decide.svg', message = 'Select a role to view applications', mt = '12vh' }) => {
    return (
        <Stack alignItems="center" spacing={3} sx={{ mt: mt }}>
            <Box sx={{width: {xs: '70%', md: '450px'}}}>
                <img src={`/static/images/${image}`} width="100%" />
            </Box>
            <Typography sx={{fontSize: {xs: '1rem', md: '1.4rem'}}} variant='h5' color="text.secondary" textAlign="center">{message}</Typography>
        </Stack>
    )
}

export default Unselected;