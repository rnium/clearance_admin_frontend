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


const StudentProfile = ({ student }) => {
    return (
        <Fade in={true}>
            <Paper style={{ overflow: 'hidden', backgroundColor: '' }} sx={{py: 6, px: 1}}>
                <Typography textAlign="center" variant='h6' color="primary">{student.registration}</Typography>
                <Typography textAlign="center" variant='body2' color="text.secondary">Student Placeholder</Typography>
            </Paper>
        </Fade>
    )
}

export default StudentProfile