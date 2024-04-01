import React from 'react';
import {
  Container, Grid, Paper, Box
} from '@mui/material';



const Dashboard = () => {
  return (
    <Container sx={{mt:5}}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={7}>
          <Box>
            LEFT
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            RIGHT
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard;