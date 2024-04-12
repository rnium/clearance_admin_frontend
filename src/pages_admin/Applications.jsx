import { useState, useEffect } from 'react';
import Clearance from '../components/molecules/Clearance';
import {
  Container, Grid, Box, Typography, Button
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import WidgetsIcon from '@mui/icons-material/Widgets';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import * as urls from '../utils/api_urls';
import axios from 'axios';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPendingClearances, setPendingClearancesLoaded, setAdminRoles, setAdminRolesLoaded,
} from '../redux/dashboardReducer';
import ClearanceSection from '../components/organisms/ClearanceSection';


// Sample Data
import { students_data } from '../utils/sample_data'






const Applications = () => {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.dashboard.adminRoles?.roles);
  const adminRoles = useSelector(state => state.dashboard.adminRoles.roles)
  const adminRolesLoaded = useSelector(state => state.dashboard.adminRoles.isLoaded)
  const [page, setPage] = useState(0);
  const [clearances, setClearances] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [type, setType] = useState(null);
  const [code, setCode] = useState(null);
  const [sectionTitle, setSectionTitle] = useState('');

  const handleRoleChange = (newType, newCode) => {
    setType(newType);
    setCode(newCode);
    let selected_role = roles.filter(r => (r.type === newType && r.code === newCode));
    if (selected_role.length) {
      setSectionTitle(selected_role[0].title);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function loadClearances() {
    try {
      let res = await axios.get(urls.dashboardClearancesUrl);
      dispatch(setPendingClearances(res.data))
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  async function loadRoles() {
    try {
      let res = await axios.get(urls.adminRolesUrl);
      dispatch(setAdminRoles(res.data.info))
      dispatch(setAdminRolesLoaded(true))
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  const fetchPage = async () => {
    let params = { code, type, page: page+1 };
    try {
      let res = await axios.get(urls.clearanceSectionUrl, { params });
      setClearances(res.data.results);
    } catch (error) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    if(type && code) {
      fetchPage();
    }
  }, [page, type, code])

  useEffect(() => {
    if (!adminRolesLoaded) {
      loadRoles();
    }
  })

  

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
                    color={r.type === 'administrative' || r.type === 'dept_head' ? 'primary' : 'info'}
                    startIcon={r.type === 'administrative' || r.type === 'dept_head' ? <WidgetsIcon /> : <WidgetsOutlinedIcon />}
                  >
                    {r.title}
                  </Button> :
                  <Button
                    sx={{ mb: 1, mr: 1 }}
                    variant='outlined'
                    color={r.type === 'administrative' || r.type === 'dept_head' ? 'primary' : 'info'}
                    startIcon={r.type === 'administrative' || r.type === 'dept_head' ? <WidgetsIcon /> : <WidgetsOutlinedIcon />}
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
          <ClearanceSection
            section_data={
              {
                title: sectionTitle,
                approvals: clearances
              }
            }
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Applications