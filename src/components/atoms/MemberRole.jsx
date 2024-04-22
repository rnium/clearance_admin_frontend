import React from 'react';
import { Chip, Tooltip } from '@mui/material';

const MemberRole = ({ role }) => {
    let variant = '';
    let roletext = role.title;
    let chiptext = role.title;
    switch (role.type) {
        case 'dept_head':
            variant = 'contained';
            break;
        case 'dept_clerk':
            variant = 'outlined';
            break;
        case 'lab_incharge':
            variant = 'outlined';
            break;
    }
    return (
        <Chip sx={{ ml: 1, px: 1 }}
            variant={variant}
            label={chiptext}
            size='small'
            color="primary"
        />
    )
}

export default MemberRole;