import React from 'react';
import ClearanceEntity from '../atoms/ClearanceEntity';
import { Grid } from '@mui/material'

const StudentClearanceSection = (props) => {
    let entities = [];
    if (props.type === 'administrative') {
        entities = props.data;
    } else {
        entities = [...props.data.lab_approval, ...props.data.clerk_approval, props.data]
    }
    return (
        <Grid container spacing={2} sx={{ mt: 5 }}>
            {
                entities.map(e => (
                    <Grid item xs={12} s={6} md={4}>
                        <ClearanceEntity entity={e} />
                    </Grid>
                ))
            }

        </Grid>
    )
}

export default StudentClearanceSection