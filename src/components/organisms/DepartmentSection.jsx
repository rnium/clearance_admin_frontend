import React from 'react';
import {
    Box, Grid, Typography, Stack
} from '@mui/material';
import DeptEntity from '../atoms/DeptEntity';

const DepartmentSection = (props) => {
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
                    {props.section.title}
                </Typography>
            </Stack>
            <Grid container spacing={2}>
                {
                    props.section.entities.map(entity => (
                        <Grid item xs={12} md={4}>
                            <DeptEntity
                                entity={entity}
                                sectionTitle={props.section.title}
                                handleAssignClick={props.handleAssignClick}
                                handleUnAssignClick={props.handleUnAssignClick}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default DepartmentSection