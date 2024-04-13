import React from 'react';
import { Chip, Tooltip } from '@mui/material';

const MemberRole = ({ role }) => {
    let roletext = '';
    let chiptext = '';
    let variant = '';
    switch (role.type) {
        case 'dept_head':
            roletext = `Head of ${role.title}`;
            variant = 'contained';
            chiptext = role.code;
            break;
        case 'dept_clerk':
            roletext = `Clerk of ${role.title}`;
            variant = 'outlined';
            chiptext = role.code;
            break;
        case 'lab_incharge':
            roletext = `In Charge of ${role.title}`;
            variant = 'outlined';
            chiptext = role.code;
            break;
        default:
            roletext = role.title;
            chiptext = role.title;
    }
    return (
        <Tooltip title={roletext} arrow>
            <Chip sx={{ ml: 1, px: 1 }}
                variant={variant}
                label={chiptext}
                size='small'
                color="primary"
            />
        </Tooltip>
    )
}

export default MemberRole;