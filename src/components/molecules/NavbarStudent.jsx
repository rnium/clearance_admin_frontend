import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import UserInfo from '../atoms/UserInfo';
import {
    Stack, Button
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { resetUserInfo } from '../../redux/accountReducer';
import * as urls from '../../utils/api_urls';
import axios from 'axios';
import { message } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import { getCookie } from '../../utils/cookies';


const settings = ['Account', 'Logout'];

function NavbarStudent() {
    const avatar_url = urls.baseUrl + useSelector(state => state.account.userinfo?.avatar_url);
    const fullname = urls.baseUrl + useSelector(state => state.account.userinfo?.user_fullname);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const dispatch = useDispatch();

    const logoutUser = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
        };
        try {
            let res = await axios.post(urls.logoutUrl, {}, config);
            message.info(res.data.info);
            dispatch(resetUserInfo());
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
        <AppBar position="static" color='transparent'>
            <Container maxWidth="xl">
                <Toolbar color="light" sx={{ py: 1 }} disableGutters>
                    <Box flexGrow={1} >

                        <Box sx={{ display: 'flex' }} alignItems="center">
                            <Link to="/">
                                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                    <img src="/static/images/cube(1).png" width="70px" alt="" />
                                </Box>
                            </Link>
                            <Link to="/">
                                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                                    <img src="/static/images/cube(1).png" width="40px" alt="" />
                                </Box>
                            </Link>
                            <Link to="/">
                                <Stack sx={{ ml: 1 }}>
                                    <Typography color="primary" variant='h5' sx={{ fontSize: { xs: '1rem', md: '1.4rem' } }} component="span">SEC Clearance Portal</Typography>
                                    <Typography color="text.secondary" variant='h6' sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>Student</Typography>
                                </Stack>
                            </Link>
                        </Box>
                    </Box>

                    <Stack direction="row" alignItems="center" sx={{ flexGrow: 0 }}>
                        <Typography variant="body1" style={{ marginRight: '10px' }} sx={{ display: { xs: 'none', md: 'block' } }}>
                            {fullname}
                        </Typography>
                        <Box>
                            <Tooltip title="Open options">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="UserName" src={avatar_url} />
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
                                <NavLink to='profile/'>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        Profile
                                    </MenuItem>
                                </NavLink>
                                <MenuItem onClick={logoutUser}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavbarStudent;