import React from 'react';
import {
    Box, Typography, Stack, Button, TextField, Grid
} from '@mui/material';

const StudentSignup = () => {
    const handleSubmit = event => {
        event.preventDefault()
        console.log("submitted");
    }
    return (
        <Box sx={{ display: 'flex' }} flexDirection="column" justifyContent="center" alignItems="center">
            <Box width={{ xs: "90%", md: '40%' }} sx={{ mt: '8vh', mb: 5 }}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" >
                    <img src="/static/images/cube(1).png" alt="Technoventure Logo" width="100px" />
                    <Stack sx={{ ml: 1 }}>
                        <Typography color="text.secondary" variant='h5' component="span">SEC Clearance Portal</Typography>
                        <Typography color="text.secondary" variant='h6'>Student Signup</Typography>
                    </Stack>
                </Box>
                <form action="" onSubmit={handleSubmit} >
                    <Grid container spacing={1} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={6}>
                            <TextField label="First Name" variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Last Name" variant='outlined' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Registration No." variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Department (e.g., EEE)" variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Session (e.g., 2018-19)" variant='outlined' fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Email Address" type="email" variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Passoword" type="password" variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Retype Passoword" type="password" variant='outlined' required fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="flex-end">
                                {/* <FormGroup>
                                    <FormControlLabel required control={<Checkbox defaultChecked />} label="Agree to terms of service" />
                                </FormGroup> */}
                                <Button sx={{ px: 5 }} variant='contained'>Signup</Button>
                            </Box>
                        </Grid>
                    </Grid>

                </form>
            </Box>
        </Box>
    )
}

export default StudentSignup