import React from 'react'
import {
  Container, Grid, Box, Card, CardMedia, CardContent, Typography, Chip, Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CircularProgressWithLabel from '../components/atoms/CircularProgressWithLabel';
import CheckIcon from '@mui/icons-material/Check';
import ArchiveIcon from '@mui/icons-material/Archive';
import TablePagination from '@mui/material/TablePagination';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -13,
    top: 3,
    border: `0px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const roles = [
  {
    code: 'eee-head',
    title: 'Head of EEE'
  },
  {
    code: 'atts-lab',
    title: 'ATTS Lab'
  },
  {
    code: 'microprocessor-lab',
    title: 'Microprocessor Lab'
  },
]

const Applications = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [role, setRole] = React.useState(roles[0].title);

  const handleRoleChange = (event, newRole) => {
    if (newRole) {
      setRole(newRole);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Container sx={{ mt: 2 }}>
      <Box sx={{display: 'flex', mb: 4}} justifyContent="center">
        <ToggleButtonGroup
          sx={{ pt: 2 }}
          value={role}
          exclusive
          onChange={handleRoleChange}
          aria-label="Role Selection"
          color='primary'
        >
          {
            roles.map((r, index) => (
              <ToggleButton key={index} sx={{px:2, pr: 4}} value={r.title} aria-label={r.title}>
                <StyledBadge badgeContent={4} color="info" >
                  <div>{r.title}</div>
                </StyledBadge>
              </ToggleButton>
            ))
          }
        </ToggleButtonGroup>
      </Box>
      <Grid container spacing={2} justifyContent="center" >
        <Grid item xs={12} md={9}>
          {/* type 1 */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', mb: 2 }} justifyContent="left">
              <img src="/static/images/cube.png" alt="" width="30px" height="30px" />
              <Typography
                variant='h5'
                align='center'
                sx={{ ml: 2 }}
                color="text.secondary"
              >
                Sign as Head of EEE
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
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Applications