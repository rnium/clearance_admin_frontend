import React from 'react';
import {
    AppBar, Toolbar, Typography, Button, Box, Tooltip, Avatar
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import UserInfo from '../atoms/UserInfo';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import { all_tabs } from './SideNav';
import { useSelector, useDispatch } from 'react-redux';
import { resetUserInfo } from '../../redux/accountReducer';
import axios from 'axios';
import * as urls from '../../utils/api_urls';
import { message } from 'antd';
import { getCookie } from '../../utils/cookies';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ drawerWidth }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const userinfo = useSelector(state => state.account.userinfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            let res = await axios.post(urls.logoutUrl, {}, config);
            dispatch(resetUserInfo());

            navigate('/');
            window.location.reload();
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
    }
    return (
        <div>
            <AppBar
                elevation={1}
                position='relative'

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
                    <Typography variant="h6" noWrap component="div" flexGrow={1} sx={{fontSize: {xs: '1rem', md: '1.2rem'}}}>
                        SEC Clearance Portal
                    </Typography>
                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <Tooltip title={userinfo.user_fullname}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="UserName" src={urls.baseUrl + userinfo.avatar_url} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={logoutUser}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <UserInfo username={userinfo.user_fullname} avatarSrc={urls.baseUrl + userinfo.avatar_url} />
                        <Button
                            variant="outlined"
                            color='error'
                            endIcon={<LogoutIcon />}
                            onClick={logoutUser}
                            sx={{
                                borderRadius: "180px",
                                margin: "0 15px",
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar