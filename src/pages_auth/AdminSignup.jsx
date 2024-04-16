import { useState, useEffect } from 'react';
import {
    Box, Typography, Stack, Button, TextField, Grid
} from '@mui/material';
import { message, Spin } from 'antd';
import axios from 'axios';
import * as urls from '../utils/api_urls';


const AdminSignup = () => {
    const [tokenValidated, setTokenValidated] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const handleSubmit = event => {
        event.preventDefault()
        console.log("submitted");
    }

    async function validateToken(tokenid) {
        let params = {tokenid: tokenid}
        try {
            await axios.get(urls.validateTokenUrl, {params});
            setIsTokenValid(true);
        } catch (error) {
            setIsTokenValid(false);
        }
        setTokenValidated(true);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let tokenid = urlParams.get('tokenid');
        if (!tokenValidated) {
            validateToken(tokenid);
        }
    })
    document.title = "Member Signup"

    return (
        <Box sx={{ display: 'flex' }} flexDirection="column" justifyContent="center" alignItems="center">
            <Box width={{ xs: "90%", md: '40%' }} sx={{ mt: '15vh', mb: 5 }}>
                {
                    !tokenValidated ?
                        <Stack alignItems="center">
                            <Spin size='large' />
                        </Stack> :
                        !isTokenValid ?
                            <Stack alignItems="center">
                                <Typography variant='h4' color='error'>INVALID TOKEN</Typography>
                            </Stack> :
                            <div>
                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" >
                                    <img src="/static/images/cube(1).png" alt="Technoventure Logo" width="100px" />
                                    <Stack sx={{ ml: 1 }}>
                                        <Typography color="text.secondary" variant='h5' component="span">SEC Clearance Portal</Typography>
                                        <Typography color="text.secondary" variant='h6'>Member Signup</Typography>
                                    </Stack>
                                </Box>
                                <form action="" onSubmit={handleSubmit} >
                                    <Grid container spacing={3} sx={{ mt: 4 }}>
                                        <Grid item xs={12} md={6}>
                                            <TextField label="First Name" variant='outlined' required fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField label="Last Name" variant='outlined' fullWidth />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField label="Passoword" type="password" variant='outlined' required fullWidth />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField label="Retype Passoword" type="password" variant='outlined' required fullWidth />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Button sx={{ px: 5 }} variant='contained'>Signup</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                </form>
                            </div>
                }
            </Box>
        </Box>
    )
}

export default AdminSignup