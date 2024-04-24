import React from 'react';
import {
    Box, Typography, Paper, Avatar, Stack, Chip, Fade, IconButton
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import * as urls from '../../utils/api_urls';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useSelector } from 'react-redux';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


const StudentProfile = ({ student, onProgressClick, onEditClick }) => {
    const usertype = useSelector(state => state.account.userinfo.user_type);
    return (
        <Fade in={true}>
            <Paper style={{ overflow: 'hidden' }}>
                <Box sx={{ position: 'relative' }}>
                    {
                        usertype === 'principal' || usertype === 'academic' || usertype === 'cashier' ?
                            <Box sx={{ position: 'absolute', p: 1, right: 0, bottom: 0 }}>
                                <IconButton onClick={() => onEditClick(student)}>
                                    <ManageAccountsIcon />
                                </IconButton>
                            </Box> : null
                    }
                    <Stack direction="row" sx={{ px: 2, py: 3 }} justifyContent="center" >
                        <Avatar
                            alt="User Name"
                            src={urls.baseUrl + student.avatar_url}
                            sx={{ width: { xs: 56, md: 88 }, height: { xs: 56, md: 88 }, mr: 1 }}
                        />
                        <Stack justifyContent="center" alignItems="center">
                            <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                                {student.name}
                            </Typography>
                            <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                                {student.registration}
                            </Typography>
                            {
                                student.hall ?
                                    <Typography variant='h6' color="primary" sx={{ fontSize: '0.8rem', mb: 0.5 }}>{student.hall}</Typography> :
                                    <Typography variant='h6' color="text.secondary" sx={{ fontSize: '0.8rem', mb: 0.5 }}>Non-Resident</Typography>

                            }
                            {
                                student.is_approved ?
                                    student.progress < 100 ?
                                        <Chip
                                            icon={<HourglassBottomIcon />}
                                            sx={{ px: 1 }}
                                            variant="outlined"
                                            label={`${student.progress}% Cleared`}
                                            onClick={() => onProgressClick(student.registration)}
                                            size='small'
                                            color="secondary"
                                        /> :
                                        <Chip
                                            icon={<VerifiedIcon />}
                                            sx={{ px: 1 }}
                                            variant="contained"
                                            label={`${student.progress}% Cleared`}
                                            onClick={() => onProgressClick(student.registration)}
                                            size='small'
                                            color="success"
                                        /> :
                                    <Chip
                                        icon={<NoAccountsIcon />}
                                        sx={{ px: 1 }}
                                        variant="outlined"
                                        label="Not Approved"
                                        size='small'
                                        color="error"
                                    />
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Paper>
        </Fade>
    )
}

export default StudentProfile