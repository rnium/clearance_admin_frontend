import React from 'react';
import {
    Box, Stack, Typography
} from '@mui/material'

const Unselected = ({ image='decide.svg', message = 'Select a role to view applications' }) => {
    return (
        <Stack alignItems="center" spacing={3} sx={{ mt: '12vh' }}>
            <Box sx={{width: {xs: '70%', md: '450px'}}}>
                <img src={`/static/images/${image}`} width="100%" />
            </Box>
            <Typography variant='h5' color="text.secondary">{message}</Typography>
        </Stack>
    )
}

export default Unselected;