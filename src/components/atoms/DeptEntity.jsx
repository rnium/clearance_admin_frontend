import React from 'react';
import {
    Box, Typography, Paper, Avatar, Stack, Chip
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import * as urls from '../../utils/api_urls'

const DeptEntity = ({ entity, sectionTitle, handleAssignClick }) => {
    let logo_src = '/static/images/cube.png';
    if (entity.type === 'administrative' || entity.type === 'dept_head') {
        logo_src = '/static/images/3d-cube.png';
    }
    return (
        <Paper style={{ overflow: 'hidden' }} className="deptRole" elevation={2}>
            <img className='role-logo' src={logo_src} alt="" />
            <Box>
                <Stack alignItems="center" sx={{ px: 2, py: 3 }} spacing={3}>
                    <Typography align='center' variant='h6' color="primary" sx={{ fontSize: { xs: '1rem', md: '1.4rem' } }}>
                        {entity.title}
                    </Typography>
                    {
                        entity.incharge_user ?
                            <Stack direction="row" alignItems="center">
                                <Avatar
                                    alt="User Name"
                                    src={urls.baseUrl + entity.incharge_user.avatar_url}
                                    sx={{ width: 56, height: 56, mr: 1 }}
                                />
                                <Stack >
                                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                                        {entity.incharge_user.name}
                                    </Typography>
                                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                                        {entity.incharge_user.email}
                                    </Typography>
                                </Stack>
                            </Stack> :
                            <Stack direction="row" alignItems="center" sx={{ py: 0.8 }}>
                                <PersonOffIcon fontSize='large' sx={{ mr: 1 }} />
                                <Typography variant='h6' color="text.secondary">Nobody In-Charge</Typography>
                            </Stack>
                    }
                    {
                        entity.incharge_user ?
                            <Stack direction="row" spacing={1}>
                                <Chip
                                    label="Change"
                                    size='small'
                                    icon={<PeopleAltIcon />}
                                    onClick = {() => handleAssignClick(entity.title, sectionTitle, entity.type, entity.code)}
                                    sx={{ px: 1 }}
                                />
                                <Chip
                                    label="Remove"
                                    size='small'
                                    sx={{ px: 1 }}
                                    icon={<PersonRemoveIcon />}
                                    variant='outlined'
                                />
                            </Stack> :
                            <Chip
                                label="Assign"
                                color='primary'
                                icon={<PersonAddIcon />}
                                onClick = {() => handleAssignClick(entity.title, sectionTitle, entity.type, entity.code)}
                                sx={{ px: 2 }}
                            />
                    }

                </Stack>
            </Box>
        </Paper>
    )
}

export default DeptEntity