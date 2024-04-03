import React from 'react';
import {
    AppBar, Toolbar, Typography, Button, Box
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import UserInfo from '../atoms/UserInfo';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import {all_tabs} from './SideNav'


const Navbar = ({ drawerWidth }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        <div>
            <AppBar
                elevation={1}
                sx={
                    {
                        width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
                        ml: `${drawerWidth}px`,
                    }
                }
            >
                <Toolbar sx={{ backgroundColor: '#ffffff', color: 'gray' }}>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {
                                all_tabs.map((item, index) => {
                                    return (
                                        <NavLink to={item.path} key={item.title}>
                                            <MenuItem onClick={handleCloseNavMenu}>
                                                {item.title}
                                            </MenuItem>
                                        </NavLink>
                                    )
                                })
                            }
                        </Menu>
                    </Box>
                    <Typography variant="h6" noWrap component="div" flexGrow={1}>
                        SEC Clearances
                    </Typography>
                    <UserInfo username='User Name' avatarSrc='' />
                    <Button
                        variant="outlined"
                        color='error'
                        endIcon={<LogoutIcon />}
                        href='/logout'
                        sx={{
                            borderRadius: "180px",
                            margin: "0 15px",
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar