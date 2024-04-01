import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ArchiveIcon from '@mui/icons-material/Archive';
import PeopleIcon from '@mui/icons-material/People';
import FaceIcon from '@mui/icons-material/Face';
import {useNavigate, useLocation} from 'react-router-dom'


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
        title: 'Members',
        icon: <PeopleIcon />,
        path: '/members'
    },
    {
        title: 'Students',
        icon: <FaceIcon />,
        path: '/students'
    },
]

const SideNav = ({drawerWidth}) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            <Drawer
                sx={{
                    width: drawerWidth,
                    display: {xs: 'none', md: 'block'},
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List sx={{mt:-1}}>
                    {tabs.map((tab, index) => (
                        <ListItem key={tab.title} disablePadding>
                            <ListItemButton
                                onClick={() => navigate(tab.path)}
                                sx={{
                                    backgroundColor: location.pathname == tab.path ? '#f4f4f4' : '',
                                    py: 3
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