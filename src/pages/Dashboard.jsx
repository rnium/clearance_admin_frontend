import React from 'react';
import {
  Container, Grid, Paper, Box, Card, CardMedia, CardContent, Typography, Chip
} from '@mui/material';
import CircularProgressWithLabel from '../components/atoms/CircularProgressWithLabel';
import CheckIcon from '@mui/icons-material/Check';
import ArchiveIcon from '@mui/icons-material/Archive';



const Dashboard = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={7}>
          <Box>
            {/* <Paper sx={{px: 2, py: 2}} elevation={0}>
              
            </Paper> */}
            <Typography
              variant='h5'
              align='center'
              sx={{ mb: 1 }}
              color="secondary"
            >
              DLD Lab Assistant
            </Typography>
            <Card sx={{ display: 'flex', mb: 1 }}>
              <CardMedia
                component="img"
                sx={{ width: 150, height: 'auto' }}
                image="/static/images/avatar.png"
                alt="avatar"
              />
              <CardContent sx={{ width: '100%' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                  <Box sx={{ display: 'flex' }} alignItems="center">
                    <Box component="div" flexGrow={1} >
                      <Typography component="div" variant="h5">
                        Md. Saiful Islam Roni
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        2018338514
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" component="div">
                        EEE 2018-19
                      </Typography>
                    </Box>
                    <Box>
                      <CircularProgressWithLabel value={90} />
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', alignItems:"center", justifyContent: 'space-between' }}>
                    <Box>
                      <Chip
                        label="Clear"
                        sx={{ px: 1 }}
                        color='primary'
                        icon={<CheckIcon />}
                        // onClick={() => approve_reg(baseUrl + reg.approval_link)}
                        variant='contained'
                      >
                        Approve
                      </Chip>
                      <Chip
                        label="Archive"
                        sx={{ px: 1, ml: { xs: 0, md: 1 }, mt: { xs: 1, md: 0 } }}
                        color='error'
                        icon={<ArchiveIcon />}
                        // onClick={() => openDialog(reg.id)}
                        variant='outlined'
                      >
                        Approve
                      </Chip>
                    </Box>
                    <Typography container="span" color="text.secondary">
                      8:13PM, 14 March 2024
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

            </Card>
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