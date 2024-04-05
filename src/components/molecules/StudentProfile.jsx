import React from 'react';
import {
    Box, Typography, Paper, Avatar, Stack, Chip
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


const StudentProfile = ({ student }) => {
    return (
        <Paper style={{ overflow: 'hidden' }}>
            <Box>
                <Stack direction="row" sx={{ p: 2 }} justifyContent="center">
                    <Avatar
                        alt="User Name"
                        src={student.avatar_url}
                        sx={{ width: { xs: 56, md: 88 }, height: { xs: 56, md: 88 }, mr: 1 }}
                    />
                    <Stack justifyContent="center">
                        <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                            {student.name}
                        </Typography>
                        <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                            {student.registration}
                        </Typography>
                        {
                            student.progress < 100 ?
                                <Chip
                                    icon={<HourglassBottomIcon />}
                                    sx={{ px: 1 }}
                                    variant="outlined"
                                    label={`${student.progress}% Cleared`}
                                    size='small'
                                    color="secondary"
                                /> :
                                <Chip
                                    icon={<VerifiedIcon />}
                                    sx={{ px: 1 }}
                                    variant="outlined"
                                    label={`${student.progress}% Cleared`}
                                    size='small'
                                    color="primary"
                                />
                        }
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    )
}

export default StudentProfile