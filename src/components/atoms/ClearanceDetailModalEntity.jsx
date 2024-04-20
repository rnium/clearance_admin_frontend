import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import {
    Stack, Typography, TextField, Box, Button, Paper, Grid, Chip
} from '@mui/material';

const ClearanceDetailModalEntity = () => {
    return (
        <Paper>
            <Stack alignItems="center" sx={{ py: 2 }} spacing={1}>
                <Typography variant='h6' textAlign="center">Electronics Lab</Typography>
                <Chip size="small" label="Pending" color="secondary" icon={<HourglassBottomIcon />} sx={{ px: 2 }} />
            </Stack>
        </Paper>
    )
}

export default ClearanceDetailModalEntity