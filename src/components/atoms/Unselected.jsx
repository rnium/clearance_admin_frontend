import React from 'react';
import {
    Paper, Stack, Typography
} from '@mui/material'

const Unselected = () => {
    return (
        <Paper sx={{ py: 10 }}>
            <Stack alignItems="center" spacing={2}>
                <img src='/static/images/decide.svg' width="80%" />
                <Typography variant='h5'>Select a role to view Requests</Typography>
            </Stack>
        </Paper>
    )
}

export default Unselected