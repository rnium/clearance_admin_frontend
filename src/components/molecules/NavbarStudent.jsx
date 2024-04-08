import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {
    Stack
} from '@mui/material'

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Account', 'Logout'];

function NavbarStudent() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color='transparent'>
            <Container maxWidth="xl">
                <Toolbar color="light" sx={{ py: 1 }} disableGutters>
                    <Box flexGrow={1} sx={{ display: 'flex' }} alignItems="center">
                        <Box sx={{display: {xs: 'none', md: 'block'}}}>
                            <img src="/static/images/cube(1).png" width="70px" alt="" />
                        </Box>
                        <Box sx={{display: {xs: 'block', md: 'none'}}}>
                            <img src="/static/images/cube(1).png" width="50px" alt="" />
                        </Box>
                        <Stack sx={{ ml: 1 }}>
                            <Typography color="primary" variant='h5' sx={{fontSize: {xs: '1rem', md: '1.4rem'}}} component="span">SEC Clearance Portal</Typography>
                            <Typography color="text.secondary" variant='h6' sx={{fontSize: {xs: '0.8rem', md: '1rem'}}}>Student</Typography>
                        </Stack>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open options">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="UserName" src="/static/images/admin_avatar.jpg" />
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavbarStudent;