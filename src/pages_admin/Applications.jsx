import React from 'react';
import Clearance from '../components/molecules/Clearance';
import {
  Container, Grid, Box, Typography, Button
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { useSelector } from 'react-redux';
import WidgetsIcon from '@mui/icons-material/Widgets';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';


// Sample Data
import { students_data } from '../utils/sample_data'





const Applications = () => {
  const roles = useSelector(state => state.dashboard.adminRoles.roles);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [type, setType] = React.useState(roles[0].type);
  const [code, setCode] = React.useState(roles[0].code);

  const handleRoleChange = (newType, newCode) => {
    setType(newType);
    setCode(newCode);
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
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item xs={12} md={9}>
          <Box>
            {
              roles.map(r => (
                type === r.type && code === r.code ?
                  <Button
                    sx={{ mb: 1, mr: 1 }}
                    variant='contained'
                    color={r.type === 'administrative' || r.type === 'dept_head' ? 'primary': 'info'}
                    startIcon={r.type === 'administrative' || r.type === 'dept_head' ? <WidgetsIcon />: <WidgetsOutlinedIcon />}
                  >
                    {r.title}
                  </Button> :
                  <Button
                    sx={{ mb: 1, mr: 1 }}
                    variant='outlined'
                    color={r.type === 'administrative' || r.type === 'dept_head' ? 'primary': 'info'}
                    startIcon={r.type === 'administrative' || r.type === 'dept_head' ? <WidgetsIcon />: <WidgetsOutlinedIcon />}
                    onClick={() => handleRoleChange(r.type, r.code)}
                  >
                    {r.title}
                  </Button>
              ))
            }
          </Box>
        </Grid>
      </Grid>
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
              students_data.map(student => (<Clearance key={student.registration} student_data={student} type="pending" />))
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

export default Applications