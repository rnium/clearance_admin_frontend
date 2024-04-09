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
import {
    Stack
} from '@mui/material';
import { useSelector } from 'react-redux';
import * as urls from '../../utils/api_urls';
import { NavLink, Link } from 'react-router-dom';


const settings = ['Account', 'Logout'];

function NavbarStudent() {
    const avatar_url = urls.baseUrl + useSelector(state => state.studentStore.info?.avatar_url);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                                    <img src="/static/images/cube(1).png" width="50px" alt="" />
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

                    <Box sx={{ flexGrow: 0 }}>
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
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavbarStudent;