import { useState } from 'react';
import {
  Box, Container, Grid, Typography, Paper, Avatar, Stack, Chip, Button, TextField,
  FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
import { Modal } from 'antd';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import SendIcon from '@mui/icons-material/Send';

const departments = [
  {
    codename: 'general',
    name: 'General',
    title: 'General Department'
  },
  {
    codename: 'eee',
    name: 'EEE',
    title: 'Department of EEE'
  },
  {
    codename: 'cse',
    name: 'CSE',
    title: 'Department of CSE'
  },
  {
    codename: 'ce',
    name: 'CE',
    title: 'Department of CE'
  },
  {
    codename: 'non-tech',
    name: 'Non Tech',
    title: 'Non Tech Department'
  },
]

const Members = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dept, setDept] = useState('general');

  return (
    <Container>
      <Box sx={{ display: 'flex' }} justifyContent="flex-end">
        <Button variant='contained' startIcon={<MarkAsUnreadIcon />} onClick={() => setIsModalOpen(true)}>Send Invitation</Button>
        <Modal title="" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
          <Stack alignItems="center" sx={{ pt: 5, pb:1 }} spacing={2}>
            <img src="/static/images/message.png" alt="" width="120px" />
            <Typography variant='body1' >Send signup invitation token via email</Typography>
            <TextField
              label="Recipient's Email"
              variant="outlined"
              type="email"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dept}
                label="Select Department"
                onChange={event => setDept(event.target.value)}
              >
                {
                  departments.map((d, i) => (
                    <MenuItem value={d.codename}>{d.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
              <Button variant='contained' startIcon={<SendIcon />} sx={{px: 2}}>Send</Button>
            </Box>
          </Stack>
        </Modal>
      </Box>
      <Box sx={{ mb: 4 }}>
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

    </Container>
  )
}

export default Members