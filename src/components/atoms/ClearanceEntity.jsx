import React from 'react';
import {
    Box, Typography, Paper, Avatar, Stack, Chip
} from '@mui/material';


const DeptEntity = ({ entity }) => {
    return (
        <Paper style={{ overflow: 'hidden' }} className="deptRole" elevation={2}>
            <Box>
                <Stack alignItems="center" sx={{ px: 2, py: 3 }} spacing={3}>
                    <Typography align='center' variant='h6' color="primary" sx={{ fontSize: { xs: '1rem', md: '1.4rem' } }}>
                        {entity.title}
                    </Typography>
                    <Chip label="Chip Filled" />
                </Stack>
            </Box>
        </Paper>
    )
}

export default DeptEntity