import React from 'react';
import NavbarStudent from '../components/molecules/NavbarStudent';
import {
  Container, Box, Grid, Paper, Stack, Typography, Button
} from '@mui/material';
import { Steps } from 'antd';

const StudentHome = () => {
  return (
    <div >
      <NavbarStudent />
      <Container sx={{ mt: 7, mb: 10 }} >
        <Box>
          <Steps
            current={2}
            items={[
              {
                title: 'Signup',
              },
              {
                title: 'Verification'
              },
              {
                title: 'Apply'
              },
              {
                title: 'Wait For approvals',
              },
              {
                title: 'Get clearance',
              },
            ]}
          />
        </Box>
        <Box sx={{display: 'none', mt: 5, flexDirection: 'column'}} alignItems="center" justifyContent="center">
            <Box sx={{display: {xs: 'none', md: 'block'}}}>
              <img src="./static/images/verification.svg" width="300px" alt="" />
            </Box>
            <Box sx={{display: {xs: 'block', md: 'none'}}}>
              <img src="./static/images/verification.svg" width="150px" alt="" />
            </Box>
            <Typography variant="h5" fontSize={{xs: '1rem', md: '1.7rem'}} textAlign="center">Your Student Account is being verified by SEC Academic</Typography>
            <Typography variant="subtitle1" color="text.secondary" fontSize={{xs: '0.7rem', md: '1rem'}} textAlign="center">Please ensure that your information is accurate and includes a valid profile picture</Typography>
        </Box>
        <Box sx={{display: 'flex', mt: 5, flexDirection: 'column'}} alignItems="center" justifyContent="center">
            <Box sx={{display: {xs: 'none', md: 'block'}}}>
              <img src="./static/images/apply.svg" width="300px" alt="" />
            </Box>
            <Box sx={{display: {xs: 'block', md: 'none'}}}>
              <img src="./static/images/apply.svg" width="150px" alt="" />
            </Box>
            <Typography variant="h5" fontSize={{xs: '1rem', md: '1.7rem'}} textAlign="center">Great!!! Now You Can Apply For Clearance</Typography>
            <Button variant='contained' sx={{mt: 3, px: 5, py: 1, borderRadius: '180px'}}>Apply Now</Button>
        </Box>
        {/* <Grid container spacing={2} sx={{mt: 5}}>
          <Grid item xs={12} md={7}>
            <Paper sx={{py:20}}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, temporibus.
            </Paper>
          </Grid>
        </Grid> */}
      </Container>
    </div>
  )
}

export default StudentHome