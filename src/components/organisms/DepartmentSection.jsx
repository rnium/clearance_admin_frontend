import React from 'react';
import {
    Box, Grid, Typography, Paper, Avatar, Stack, Chip
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeptEntity from '../atoms/DeptEntity';

const DepartmentSection = ({ section }) => {
    return (
        <Box sx={{ mb: 4, px: 2, py: 3 }} className="dept">
            <Stack sx={{ mb: 3 }} direction="row" justifyContent="center">
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
                    section.entities.map(entity => (
                        <Grid item xs={12} md={4}>
                            <DeptEntity entity={entity} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default DepartmentSection