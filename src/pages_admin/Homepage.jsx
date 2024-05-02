import { useEffect } from 'react';
import Navbar from '../components/molecules/Navbar';
import SideNav from '../components/molecules/SideNav';
import {
    Box
} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Applications from './Applications';
import Members from './Members';
import Departments from './Departments';
import Students from './Students';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { setPendingStats } from '../redux/notificationReducer';
import {
    setDeptSelected, setPendingStudentDept
} from '../redux/dashboardReducer';
import axios from 'axios';
import * as urls from '../utils/api_urls';


const drawerWidth = 240;

const Homepage = () => {
    const deptSelected = useSelector(state => state.dashboard.deptSelected)
    const pendingStudentDept = useSelector(state => state.dashboard.pendingStudentDept)
    const userinfo = useSelector(state => state.account.userinfo);
    const dispatch = useDispatch();

    const dispatchAdminStats = data => {
        for (let dept of Object.keys(data)) {
            if (data[dept].pending > 0) {
                if (deptSelected !== dept.toUpperCase() && data[deptSelected.toLowerCase()].pending === 0) {
                    dispatch(setDeptSelected(dept.toUpperCase()));
                }
                break;
            }
        }
        for (let dept of Object.keys(data)) {
            if (data[dept].pending_students > 0) {
                if (pendingStudentDept !== dept.toUpperCase() && data[pendingStudentDept.toLowerCase()].pending_students === 0) {
                    dispatch(setPendingStudentDept(dept.toUpperCase()));
                }
                break;
            }
        }
        let stats = {
            clearances: 0,
            archived: 0,
            students: 0,
        }
        for (let dept of Object.keys(data)) {
            stats.clearances += data[dept].pending;
            stats.archived += data[dept].archived;
            if (userinfo.user_type === 'academic') {
                stats.students += data[dept].pending_students;
            }
        }
        dispatch(setPendingStats(stats));

    }

    async function loadAdminStats() {
        try {
            let res = await axios.get(urls.adminDashboardStatsUrl);
            dispatchAdminStats(res.data);
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            console.log(error_msg);
        }
    }

    useEffect(() => {
        loadAdminStats();
    }, [])

    return (
        <div className='root'>
            <Box sx={{ display: 'flex' }}>
                <SideNav drawerWidth={drawerWidth} />
                <Box component='main'
                    className='main'
                    sx={{ width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Navbar drawerWidth={drawerWidth} />
                    <Routes>
                        <Route path='/' element={<Dashboard loadAdminStats={loadAdminStats} />} />
                        <Route path='/applications' element={<Applications pagetype="pending" loadAdminStats={loadAdminStats}  />} />
                        <Route path='/archives' element={<Applications pagetype="archived" loadAdminStats={loadAdminStats}  />} />
                        <Route path='/history' element={<Applications pagetype="approved" />} />
                        <Route path='/members' element={<Members />} />
                        <Route path='/departments' element={<Departments />} />
                        <Route path='/students' element={<Students />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                </Box>
            </Box>
        </div>
    )
}

export default Homepage