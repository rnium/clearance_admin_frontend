import React from 'react';
import {
  Box, Container, Grid, Typography, Paper, Avatar, Stack, Chip
} from '@mui/material'

const Members = () => {
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" >
        <Grid item xs={12} md={4}>
          <Paper sx={{ px: 2, py: 1 }}>
            <Stack direction="row">
              <Avatar
                alt="User Name"
                src="/static/images/admin_avatar.jpg"
                sx={{ width: 72, height: 72, mr: 1 }}
              />
              <Stack >
                <Stack direction="row">
                  <Typography variant='h6' sx={{fontSize: '1rem'}}>
                    Admin Name 
                  </Typography>
                  <Chip sx={{ml:1}} label="EEE" size='small' color="primary" />
                </Stack>
                <Typography variant='subtitle1' sx={{fontSize: '0.8rem'}}>
                  email@gmail.com
                </Typography>
                <Stack direction="row">
                  <Typography color="text.secondary" variant='subtitle2' sx={{fontSize: '0.8rem'}}>
                    Last Seen:
                  </Typography>
                  <Typography color="text.secondary" variant='subtitle2' sx={{fontSize: '0.8rem', ml:1}}>
                    8:12AM, 3 April 2024
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ px: 2, py: 1 }}>
            <Stack direction="row">
              <Avatar
                alt="User Name"
                src="/static/images/admin_avatar.jpg"
                sx={{ width: 72, height: 72, mr: 1 }}
              />
              <Stack >
                <Stack direction="row">
                  <Typography variant='h6' sx={{fontSize: '1rem'}}>
                    Admin Name 
                  </Typography>
                  <Chip sx={{ml:1}} label="CSE" size='small' color="primary" />
                </Stack>
                <Typography variant='subtitle1' sx={{fontSize: '0.8rem'}}>
                  email@gmail.com
                </Typography>
                <Stack direction="row">
                  <Typography color="text.secondary" variant='subtitle2' sx={{fontSize: '0.8rem'}}>
                    Last Seen:
                  </Typography>
                  <Typography color="text.secondary" variant='subtitle2' sx={{fontSize: '0.8rem', ml:1}}>
                    8:12AM, 3 April 2024
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ px: 2, py: 1 }}>
            <Stack direction="row">
              <Avatar
                alt="User Name"
                src="/static/images/admin_avatar.jpg"
                sx={{ width: 72, height: 72, mr: 1 }}
              />
              <Stack >
                <Stack direction="row">
                  <Typography variant='h6' sx={{fontSize: '1rem'}}>
                    Admin Name 
                  </Typography>
                  <Chip sx={{ml:1}} variant="outlined" label="ATTS Lab" size='small' color="primary" />
                </Stack>
                <Typography variant='subtitle1' sx={{fontSize: '0.8rem'}}>
                  email@gmail.com
                </Typography>
                <Stack direction="row">
                  <Typography color="text.secondary" variant='subtitle2' sx={{fontSize: '0.8rem'}}>
                    Last Seen:
                  </Typography>
                  <Typography color="text.secondary" variant='subtitle2' sx={{fontSize: '0.8rem', ml:1}}>
                    8:12AM, 3 April 2024
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Members