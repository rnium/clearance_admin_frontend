import React from 'react';
import {
  Box, Container, Grid, Typography, Paper, Avatar, Stack, Chip
} from '@mui/material'

const Members = () => {
  return (
    <Container>
      <Box sx={{mb:4}}>
        <Stack sx={{ mb: 2 }} direction="row" justifyContent="left">
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
            <Paper style={{ overflow: 'hidden' }}>
              <Box>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Avatar
                    alt="User Name"
                    src="/static/images/admin_avatar.jpg"
                    sx={{ width: 72, height: 72, mr: 1 }}
                  />
                  <Stack >
                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                      Admin Name
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                      email@gmail.com
                    </Typography>
                    <Stack direction="row">
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                        Last Seen:
                      </Typography>
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                        8:12AM, 3 April 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                  <Chip sx={{ ml: 1, px: 1 }} label="EEE" size='small' color="primary" />
                  <Chip sx={{ ml: 1, px: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" />
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" /> */}
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }}>
              <Box>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Avatar
                    alt="User Name"
                    src="/static/images/admin_avatar.jpg"
                    sx={{ width: 72, height: 72, mr: 1 }}
                  />
                  <Stack >
                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                      Admin Name
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                      email@gmail.com
                    </Typography>
                    <Stack direction="row">
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                        Last Seen:
                      </Typography>
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                        8:12AM, 3 April 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                  <Chip sx={{ ml: 1, px: 1 }} label="EEE" size='small' color="primary" />
                  <Chip sx={{ ml: 1, px: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" />
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" /> */}
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }}>
              <Box>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Avatar
                    alt="User Name"
                    src="/static/images/admin_avatar.jpg"
                    sx={{ width: 72, height: 72, mr: 1 }}
                  />
                  <Stack >
                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                      Admin Name
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                      email@gmail.com
                    </Typography>
                    <Stack direction="row">
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                        Last Seen:
                      </Typography>
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                        8:12AM, 3 April 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                  <Chip sx={{ ml: 1, px: 1 }} label="EEE" size='small' color="primary" />
                  <Chip sx={{ ml: 1, px: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" />
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" /> */}
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }}>
              <Box>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Avatar
                    alt="User Name"
                    src="/static/images/admin_avatar.jpg"
                    sx={{ width: 72, height: 72, mr: 1 }}
                  />
                  <Stack >
                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                      Admin Name
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                      email@gmail.com
                    </Typography>
                    <Stack direction="row">
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                        Last Seen:
                      </Typography>
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                        8:12AM, 3 April 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                  <Chip sx={{ ml: 1, px: 1 }} label="EEE" size='small' color="primary" />
                  <Chip sx={{ ml: 1, px: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" />
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" /> */}
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }}>
              <Box>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Avatar
                    alt="User Name"
                    src="/static/images/admin_avatar.jpg"
                    sx={{ width: 72, height: 72, mr: 1 }}
                  />
                  <Stack >
                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                      Admin Name
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                      email@gmail.com
                    </Typography>
                    <Stack direction="row">
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                        Last Seen:
                      </Typography>
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                        8:12AM, 3 April 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                  <Chip sx={{ ml: 1, px: 1 }} label="EEE" size='small' color="primary" />
                  <Chip sx={{ ml: 1, px: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" />
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" /> */}
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Microprocessor Lab" size='small' color="primary" /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{mb:4}}>
        <Stack sx={{ mb: 2 }} direction="row" justifyContent="left">
          <img src="/static/images/3d-cube.png" alt="" width="30px" height="30px" />
          <Typography
            variant='h5'
            align='center'
            sx={{ ml: 2 }}
            color="text.secondary"
          >
            Department of CSE
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }}>
              <Box>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Avatar
                    alt="User Name"
                    src="/static/images/admin_avatar.jpg"
                    sx={{ width: 72, height: 72, mr: 1 }}
                  />
                  <Stack >
                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                      Admin Name
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                      email@gmail.com
                    </Typography>
                    <Stack direction="row">
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                        Last Seen:
                      </Typography>
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                        8:12AM, 3 April 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                  <Chip sx={{ ml: 1, px: 1 }} label="CSE" size='small' color="primary" />
                  <Chip sx={{ ml: 1, px: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" />
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" /> */}
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }}>
              <Box>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Avatar
                    alt="User Name"
                    src="/static/images/admin_avatar.jpg"
                    sx={{ width: 72, height: 72, mr: 1 }}
                  />
                  <Stack >
                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                      Admin Name
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                      email@gmail.com
                    </Typography>
                    <Stack direction="row">
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                        Last Seen:
                      </Typography>
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                        8:12AM, 3 April 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                  <Chip sx={{ ml: 1, px: 1 }} label="CSE" size='small' color="primary" />
                  <Chip sx={{ ml: 1, px: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" />
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" /> */}
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }}>
              <Box>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Avatar
                    alt="User Name"
                    src="/static/images/admin_avatar.jpg"
                    sx={{ width: 72, height: 72, mr: 1 }}
                  />
                  <Stack >
                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                      Admin Name
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                      email@gmail.com
                    </Typography>
                    <Stack direction="row">
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                        Last Seen:
                      </Typography>
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                        8:12AM, 3 April 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                  <Chip sx={{ ml: 1, px: 1 }} label="CSE" size='small' color="primary" />
                  <Chip sx={{ ml: 1, px: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" />
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" /> */}
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }}>
              <Box>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Avatar
                    alt="User Name"
                    src="/static/images/admin_avatar.jpg"
                    sx={{ width: 72, height: 72, mr: 1 }}
                  />
                  <Stack >
                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                      Admin Name
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                      email@gmail.com
                    </Typography>
                    <Stack direction="row">
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                        Last Seen:
                      </Typography>
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                        8:12AM, 3 April 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                  <Chip sx={{ ml: 1, px: 1 }} label="CSE" size='small' color="primary" />
                  <Chip sx={{ ml: 1, px: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" />
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" /> */}
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ overflow: 'hidden' }}>
              <Box>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Avatar
                    alt="User Name"
                    src="/static/images/admin_avatar.jpg"
                    sx={{ width: 72, height: 72, mr: 1 }}
                  />
                  <Stack >
                    <Typography variant='h6' sx={{ fontSize: '1rem' }}>
                      Admin Name
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontSize: '0.8rem' }}>
                      email@gmail.com
                    </Typography>
                    <Stack direction="row">
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem' }}>
                        Last Seen:
                      </Typography>
                      <Typography color="text.secondary" variant='subtitle2' sx={{ fontSize: '0.8rem', ml: 1 }}>
                        8:12AM, 3 April 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box sx={{ py: 0.5, px: 1, backgroundColor: 'aliceblue' }}>
                  <Chip sx={{ ml: 1, px: 1 }} label="CSE" size='small' color="primary" />
                  <Chip sx={{ ml: 1, px: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" />
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" /> */}
                  {/* <Chip sx={{ ml: 1 }} variant="outlined" label="Software Lab" size='small' color="primary" /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Members