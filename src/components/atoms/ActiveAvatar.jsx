import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            borderRadius: '180px',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'translate(-50%, -50%) scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'translate(-50%, -50%) scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function ActiveAvatar({ src, width, height, alt = 'Active' }) {
    return (
        <Stack>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
            >
                <Avatar alt={alt} src={src} sx={{ width: width, height: height }} />
            </StyledBadge>
        </Stack>
    );
}