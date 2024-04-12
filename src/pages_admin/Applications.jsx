import { useState, useEffect } from 'react';
import {
  Container, Grid, Box, Button, Stack
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import WidgetsIcon from '@mui/icons-material/Widgets';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import * as urls from '../utils/api_urls';
import axios from 'axios';
import { message, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPendingClearances, setPendingClearancesLoaded, setAdminRoles, setAdminRolesLoaded,
} from '../redux/dashboardReducer';
import Unselected from '../components/atoms/Unselected';
import ClearanceSection from '../components/organisms/ClearanceSection';


const Applications = () => {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.dashboard.adminRoles?.roles);
  const adminRolesLoaded = useSelector(state => state.dashboard.adminRoles.isLoaded)
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [clearances, setClearances] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [type, setType] = useState(null);
  const [code, setCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
      dispatch(setPendingClearancesLoaded(true))
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      console.log(error_msg);
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

  const fetchPageSilent = async () => {
    let params = { code, type, page: page + 1, pagesize: rowsPerPage };
    try {
      let res = await axios.get(urls.clearanceSectionUrl, { params });
      setCount(res.data.count);
      setClearances(res.data.results);
    } catch (error) {
      message.error(error.message)
    }
  }

  const fetchPage = async () => {
    setIsLoading(true);
    await fetchPageSilent();
    setIsLoading(false);
  }

  const clearanceAction = async url => {
    try {
      let res = await axios.get(urls.baseUrl + url);
      message.success(res.data.info);
      fetchPageSilent();
      loadClearances();
    } catch (error) {
      let error_msg = error?.response?.data?.details;
      if (error_msg === undefined) {
        error_msg = error.message;
      }
      message.error(error_msg);
    }
  }

  useEffect(() => {
    if (type && code) {
      fetchPage();
    }
  }, [page, rowsPerPage, type, code])

  useEffect(() => {
    if (!adminRolesLoaded) {
      loadRoles();
    }
  })



  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Grid container spacing={2} justifyContent="center">
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
          {
            type ?
              isLoading ?
                <Stack sx={{ mt: 7 }}>
                  <Spin size='large' />
                </Stack> :
                <div>
                  <TablePagination
                    component="div"
                    count={count}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  <ClearanceSection
                    titleAlign='left'
                    onAction={clearanceAction}
                    section_data={
                      {
                        title: sectionTitle,
                        approvals: clearances
                      }
                    }
                  />

                </div>
              : <Unselected />
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default Applications