import React from 'react';
import Clearance from '../components/molecules/Clearance';
import StyledBadge from '../components/atoms/StyledBadge';
import {
  Container, Grid, Box, Typography
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


// Sample Data
import { students_data } from '../utils/sample_data'

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



const Archives = () => {
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
      <Box sx={{ display: 'flex', mb: 4 }} justifyContent="center">
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
              <ToggleButton key={index} sx={{ px: 2, pr: 4 }} value={r.title} aria-label={r.title}>
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
            {
              students_data.map(student => (<Clearance key={student.registration} student_data={student} type="archived" />))
            }
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

export default Archives