import React from 'react';
import {
  Container, Grid, Paper, Box, Card, CardMedia, CardContent, Typography, Chip, Stack
} from '@mui/material';
import CircularProgressWithLabel from '../components/atoms/CircularProgressWithLabel';
import CheckIcon from '@mui/icons-material/Check';
import ArchiveIcon from '@mui/icons-material/Archive';
import RolesCard from '../components/molecules/RolesCard';
import DeleteIcon from '@mui/icons-material/Delete';



const Dashboard = (props) => {
  const super_roles = ['Head of EEE', 'SEC Academic']
  const roles = ['ATTS Lab', 'Microprocessor Lab']
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={7}>
          {/* type 1 */}
          <Box sx={{mb: 4}}>
            <Box sx={{ display: 'flex', mb: 2 }} justifyContent="center">
              <img src="/static/images/cube.png" alt="" width="30px" height="30px" />
              <Typography
                variant='h5'
                align='center'
                sx={{ ml: 2 }}
                color="text.secondary"
              >
                Head of EEE
              </Typography>
            </Box>
            <Card sx={{ display: 'flex', mb: 1 }} alignItems="center" justifyContent="center">
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
                  <Box sx={{ mt: 2, display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
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
            <Card sx={{ display: 'flex', mb: 1 }} alignItems="center" justifyContent="center">
              <CardMedia
                component="img"
                sx={{ width: 150, height: 'auto' }}
                image="/static/images/admin_avatar.jpg"
                alt="avatar"
              />
              <CardContent sx={{ width: '100%' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                  <Box sx={{ display: 'flex' }} alignItems="center">
                    <Box component="div" flexGrow={1} >
                      <Typography component="div" variant="h5">
                        Tamim A Rahman
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        2018338548
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" component="div">
                        EEE 2018-19
                      </Typography>
                    </Box>
                    <Box>
                      <CircularProgressWithLabel value={60} />
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
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
          {/* Type 2 */}
          <Box sx={{mb: 2}}>
            <Box sx={{ display: 'flex', mb: 2 }} justifyContent="center">
              <img src="/static/images/cube-gray.png" alt="" width="30px" height="30px" />
              <Typography
                variant='h5'
                align='center'
                sx={{ ml: 2 }}
                color="text.secondary"
              >
                Microprocessor Lab
              </Typography>
            </Box>
            <Card sx={{ display: 'flex', mb: 1 }} alignItems="center" justifyContent="center">
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
                  <Box sx={{ mt: 2, display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
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
            <Card sx={{ display: 'flex', mb: 1 }} alignItems="center" justifyContent="center">
              <CardMedia
                component="img"
                sx={{ width: 150, height: 'auto' }}
                image="/static/images/admin_avatar.jpg"
                alt="avatar"
              />
              <CardContent sx={{ width: '100%' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                  <Box sx={{ display: 'flex' }} alignItems="center">
                    <Box component="div" flexGrow={1} >
                      <Typography component="div" variant="h5">
                        Tamim A Rahman
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        2018338548
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" component="div">
                        EEE 2018-19
                      </Typography>
                    </Box>
                    <Box>
                      <CircularProgressWithLabel value={60} />
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
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
          <Box sx={{ mb: 2 }}>
            <RolesCard roles={roles} super_roles={super_roles} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Paper sx={{ p: 2 }} >
              <Typography component="div" variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                Pending Accounts
              </Typography>
              <Paper sx={{ display: 'flex', mb: 1, px: 1, py: 1.2, backgroundColor: '#d5e3eb' }} alignItems="center" justifyContent="center">
                <Box sx={{ display: 'flex', width: '100%' }} alignItems="center">
                  <CardMedia
                    component="img"
                    sx={{ width: 80, borderRadius: '5px', m: 0, mr: 1, height: 'auto' }}
                    image="/static/images/admin_avatar.jpg"
                    alt="avatar"
                  />
                  <Box component="div" flexGrow={1} >
                    <Typography component="div" variant="h5" sx={{ fontSize: '1rem' }}>
                      Tamim A Rahman
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontSize: '0.8rem' }}>
                      2018338548
                      <Typography sx={{ ml: 1, fontSize: '0.8rem' }} variant="subtitle2" color="secondary" component="span" >
                        EEE 2018-19
                      </Typography>
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem' }} variant="subtitle2" color="text.secondary" component="span" >
                      IP: 172.123.22.122
                    </Typography>

                  </Box>
                  <Stack>
                    <Chip
                      label="Approve"
                      sx={{ px: 1, fontSize: '0.8rem' }}
                      color='info'
                      icon={<CheckIcon />}
                      // onClick={() => approve_reg(baseUrl + reg.approval_link)}
                      variant='contained'
                    >
                    </Chip>
                    <Chip
                      label="Delete"
                      sx={{ px: 1, mt: 0.5 }}
                      color='error'
                      icon={<DeleteIcon />}
                      // onClick={() => openDialog(reg.id)}
                      variant='contained'
                    >
                    </Chip>
                  </Stack>
                </Box>
              </Paper>
              <Paper sx={{ display: 'flex', mb: 1, px: 1, py: 1.2, backgroundColor: '#d5e3eb' }} alignItems="center" justifyContent="center">
                <Box sx={{ display: 'flex', width: '100%' }} alignItems="center">
                  <CardMedia
                    component="img"
                    sx={{ width: 80, borderRadius: '5px', m: 0, mr: 1, height: 'auto' }}
                    image="/static/images/avatar.png"
                    alt="avatar"
                  />
                  <Box component="div" flexGrow={1} >
                    <Typography component="div" variant="h5" sx={{ fontSize: '1rem' }}>
                      Tamim A Rahman
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontSize: '0.8rem' }}>
                      2018338548
                      <Typography sx={{ ml: 1, fontSize: '0.8rem' }} variant="subtitle2" color="secondary" component="span" >
                        EEE 2018-19
                      </Typography>
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem' }} variant="subtitle2" color="text.secondary" component="span" >
                      IP: 172.123.22.122
                    </Typography>

                  </Box>
                  <Stack>
                    <Chip
                      label="Approve"
                      sx={{ px: 1, fontSize: '0.8rem' }}
                      color='info'
                      icon={<CheckIcon />}
                      // onClick={() => approve_reg(baseUrl + reg.approval_link)}
                      variant='contained'
                    >
                    </Chip>
                    <Chip
                      label="Delete"
                      sx={{ px: 1, mt: 0.5 }}
                      color='error'
                      icon={<DeleteIcon />}
                      // onClick={() => openDialog(reg.id)}
                      variant='contained'
                    >
                    </Chip>
                  </Stack>
                </Box>
              </Paper>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard;