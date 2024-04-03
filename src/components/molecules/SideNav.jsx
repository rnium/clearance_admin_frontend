import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ArchiveIcon from '@mui/icons-material/Archive';
import HistoryIcon from '@mui/icons-material/History';
import PeopleIcon from '@mui/icons-material/People';
import FaceIcon from '@mui/icons-material/Face';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom'


const tabs = [
    {
        title: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/'
    },
    {
        title: 'Applications',
        icon: <PendingActionsIcon />,
        path: '/applications'
    },
    {
        title: 'Archives',
        icon: <ArchiveIcon />,
        path: '/archives'
    },
    {
        title: 'History',
        icon: <HistoryIcon />,
        path: '/history'
    },
    {
        title: 'Members',
        icon: <PeopleIcon />,
        path: '/members'
    },
    {
        title: 'Students',
        icon: <FaceIcon />,
        path: '/students'
    },
    {
        title: 'Profile',
        icon: <AccountCircleIcon />,
        path: '/profile'
    },
]

const SideNav = ({ drawerWidth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            <Drawer
                sx={{
                    width: drawerWidth,
                    display: { xs: 'none', md: 'block' },
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Box sx={{ display: 'flex', my: 3 }} justifyContent="center">
                    <img src="/static/images/cube(1).png" alt="" width="120px" />
                </Box>
                <List>
                    {tabs.map((tab, index) => (
                        <ListItem key={tab.title} disablePadding>
                            <ListItemButton
                                onClick={() => navigate(tab.path)}
                                sx={{
                                    backgroundColor: location.pathname === tab.path ? '#f4f4f4' : '',
                                    py: 1.2
                                }}
                            >
                                <ListItemIcon>
                                    {tab.icon}
                                </ListItemIcon>
                                <ListItemText primary={tab.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default SideNav;
export let all_tabs = tabs;