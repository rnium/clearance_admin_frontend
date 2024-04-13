import React from 'react';
import {
    Box, Stack, Typography, Paper, Avatar, Chip
} from '@mui/material';
import * as urls from '../../utils/api_urls'
import { dateMask } from '../../utils/config';
import dateFormat from 'dateformat';



const AdminProfile = ({ profile }) => {
    return (
        <div>
            <Paper style={{ overflow: 'hidden' }}>
                <Box>
                    <Stack direction="row" sx={{ p: 2 }}>
                        <Avatar
                            alt="User Name"
                            src={urls.baseUrl + profile.avatar_url}
                            sx={{ width: 72, height: 72, mr: 1 }}
                        />
                        <Stack >
                            <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                                {profile.name}
                            </Typography>
                            <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                                {profile.email}
                            </Typography>
                            <Stack direction="row">
                                <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                                    Last Seen:
                                </Typography>
                                <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                                    {profile.last_seen ? dateFormat(profile.last_seen, dateMask) : 'Never'}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                        {
                            profile.roles.map(role => (
                                role.type === 'administrative' || role.type === 'dept_head' ?
                                <Chip sx={{ ml: 1, px: 1 }} label={role.code} size='small' color="primary" /> :
                                <Chip sx={{ ml: 1, px: 1 }}
                                    variant="outlined"
                                    label={role.title}
                                    size='small'
                                    color="primary"
                                />
                            ))
                        }
                    </Box>
                </Box>
            </Paper>
        </div>
    )
}

export default AdminProfile