import React from 'react';
import {
    Box, Stack, Typography, Grid, Chip
} from '@mui/material';
import MemberProfile from '../molecules/MemberProfile';
import NoData from '../atoms/NoData';

const MemberSection = ({ section }) => {
    if (section?.accounts === undefined || section.accounts.length == 0) {
        return null;
    }
    return (
        <Box sx={{ mb: 4 }}>
            <Stack sx={{ mb: 2 }} direction="row" justifyContent="left">
                <img src="/static/images/3d-cube.png" alt="" width="30px" height="30px" />
                <Typography
                    variant='h5'
                    align='center'
                    sx={{ ml: 2 }}
                    color="text.secondary"
                >
                    {section.title}
                </Typography>
            </Stack>
            <Grid container spacing={2}>
                {
                    section.accounts.map(profile => (
                        <Grid item xs={12} md={4}>
                            <MemberProfile profile={profile} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default MemberSection