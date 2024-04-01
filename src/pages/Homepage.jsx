import { Component } from 'react';
import Navbar from '../components/Navbar';
import SideNav from '../components/SideNav';
import {
    Box
} from '@mui/material';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Applications from './Applications';
import Archives from './Archives';
import Members from './Members';
import Students from './Students';


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
                        sx={{ mt: 12, width: {xs: '100%', md: `calc(100% - ${drawerWidth}px)`} }}
                    >
                        <Navbar drawerWidth={drawerWidth}  />
                        <Routes>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/applications' element={<Applications />} />
                            <Route path='/archives' element={<Archives />} />
                            <Route path='/members' element={<Members />} />
                            <Route path='/students' element={<Students />} />
                        </Routes>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default Homepage