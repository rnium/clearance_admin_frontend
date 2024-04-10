import React from 'react';
import {Stack, Typography} from '@mui/material'

const Adminrole = ({role}) => {
    let logo_src = "/static/images/cube-gray.png";
    if (role.type === 'administrative' || role.type === 'dept_head') {
        logo_src = "/static/images/cube.png";
    } else if (role.type === 'lab_incharge') {
        logo_src = "/static/images/medical-lab.png";
    }
    return (
        <Stack direction="row" sx={{ mb: 1, ml: 2 }} alignItems="center">
            <img src={logo_src} alt="" width="25px" height="25px" />
            <Typography
                variant='h6'
                component='div'
                align='center'
                sx={{ ml: 2 }}
                color="text.secondary"
            >
                {role.title}
            </Typography>
        </Stack>
    )
}

export default Adminrole