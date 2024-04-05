import { useState } from 'react';
import '../styles/department.css'
import {
  Box, Container, Grid, Typography, Paper, Avatar, Stack, Chip
} from '@mui/material';
import { Modal } from 'antd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Departments = () => {
  return (
    <Container>
      <Box sx={{ mb: 4, px: 2, py: 3 }} className="dept">
        <Stack sx={{ mb: 3 }} direction="row" justifyContent="center">
          <img src="/static/images/3d-cube.png" alt="" width="30px" height="30px" />
          <Typography
            variant='h5'
            align='center'
            sx={{ ml: 2 }}
            color="text.secondary"
          >
            Department of EEE
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }} className="deptRole" elevation={2}>
              <img className='role-logo' src="/static/images/3d-cube.png" alt="" />
              <Box>
                <Stack alignItems="center" sx={{ px: 2, py: 3 }} spacing={3}>
                  <Typography variant='h6' color="primary" sx={{ fontSize: { xs: '1rem', md: '1.4rem' } }}>
                    Head of EEE
                  </Typography>
                  <Stack direction="row" alignItems="center">
                    <Avatar
                      alt="User Name"
                      src="/static/images/admin_avatar.jpg"
                      sx={{ width: 56, height: 56, mr: 1 }}
                    />
                    <Stack >
                      <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                        Admin Name
                      </Typography>
                      <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                        emaisdsdadl@gmail.com
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label="Change"
                      size='small'
                      icon={<PeopleAltIcon />}
                      sx={{ px: 1 }}
                    />
                    <Chip
                      label="Remove"
                      size='small'
                      sx={{ px: 1 }}
                      icon={<PersonRemoveIcon />}
                      variant='outlined'
                    />
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }} className="deptRole" elevation={2}>
              <img className='role-logo' src="/static/images/cube.png" alt="" />
              <Box>
                <Stack alignItems="center" sx={{ px: 2, py: 3 }} spacing={3}>
                  <Typography variant='h6' color="primary" sx={{ fontSize: { xs: '1rem', md: '1.4rem' } }}>
                    Microprocessor Lab
                  </Typography>
                  <Stack direction="row" alignItems="center">
                    <Avatar
                      alt="User Name"
                      src="/static/images/admin_avatar.jpg"
                      sx={{ width: 56, height: 56, mr: 1 }}
                    />
                    <Stack >
                      <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                        Admin Name
                      </Typography>
                      <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                        emaisdsdadl@gmail.com
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label="Change"
                      size='small'
                      icon={<PeopleAltIcon />}
                      sx={{ px: 1 }}
                    />
                    <Chip
                      label="Remove"
                      size='small'
                      sx={{ px: 1 }}
                      icon={<PersonRemoveIcon />}
                      variant='outlined'
                    />
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }} className="deptRole" elevation={2}>
              <img className='role-logo' src="/static/images/cube.png" alt="" />
              <Box>
                <Stack alignItems="center" sx={{ px: 2, py: 3 }} spacing={3}>
                  <Typography variant='h6' color="primary" sx={{ fontSize: { xs: '1rem', md: '1.4rem' } }}>
                    VLSI Lab
                  </Typography>
                  <Stack direction="row" alignItems="center" sx={{py:0.8}}>
                    <PersonOffIcon fontSize='large' sx={{mr: 1}} />
                    <Typography variant='h6' color="text.secondary">Nobody In-Charge</Typography>
                  </Stack>
                  <Chip
                    label="Assign"
                    color='primary'
                    icon={<PersonAddIcon />}
                    sx={{ px: 2 }}
                  />
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Departments