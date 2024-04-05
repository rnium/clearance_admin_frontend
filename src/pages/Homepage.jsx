import { Component } from 'react';
import Navbar from '../components/molecules/Navbar';
import SideNav from '../components/molecules/SideNav';
import {
    Box
} from '@mui/material';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Applications from './Applications';
import Archives from './Archives';
import Members from './Members';
import Departments from './Departments';
import Students from './Students';
import History from './History';
import Profile from './Profile';


const drawerWidth = 240;

class Homepage extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div className='root'>
                <Box sx={{display:'flex'}}>
                    <SideNav drawerWidth={drawerWidth} />
                    <Box component='main'
                        className='main'
                        sx={{ mt: 12, width: {xs: '100%', md: `calc(100% - ${drawerWidth}px)`} }}
                    >
                        <Navbar drawerWidth={drawerWidth}  />
                        <Routes>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/applications' element={<Applications />} />
                            <Route path='/archives' element={<Archives />} />
                            <Route path='/history' element={<History />} />
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
}

export default Homepage