import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import {
    Stack, Typography, TextField, Box, Button, Paper, Grid, Chip
} from '@mui/material';

const ClearanceDetailModalEntity = ({ entity }) => {
    return (
        <Paper elevation={5}>
            <Stack alignItems="center" sx={{ py: 2, px: 1 }} spacing={1}>
                <Typography variant='h6' textAlign="center">{entity.title}</Typography>
                {
                    entity.is_approved ?
                        <Chip size='small' label={entity.approved_by} color='success' icon={<CheckIcon />} sx={{ px: 2 }} />
                        : entity.is_seekable ?
                            <Chip size='small' label="Pending" color="secondary" icon={<HourglassBottomIcon />} sx={{ px: 2 }} />
                            : <Chip size='small' label="Not Activated" icon={<HourglassDisabledIcon />} sx={{ px: 2 }} />
                }
            </Stack>
        </Paper>
    )
}

export default ClearanceDetailModalEntity