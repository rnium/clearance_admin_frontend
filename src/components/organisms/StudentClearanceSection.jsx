import React from 'react';
import ClearanceEntity from '../atoms/ClearanceEntity';
import { Grid, Typography } from '@mui/material';

const StudentClearanceSection = (props) => {
    let entities = [];
    let title = "";
    if (props.type === 'administrative') {
        entities = props.data;
        title = "Administration"
    } else {
        if (props.data?.section_title) {
            title = props.data.section_title
        } else {
            title = props.data.title
        }
        entities = [...props.data.lab_approval, ...props.data.clerk_approval, props.data]
    }
    return (
        <div>
            <Typography
                variant='h5'
                textAlign="center"
                color="text.secondary"
                sx={{ mb: 1, fontSize: { xs: '1.1rem', md: '1.4rem' } }}
            >
                {title}
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {
                    entities.map(e => (
                        <Grid item xs={12} md={6}>
                            <ClearanceEntity entity={e} />
                        </Grid>
                    ))
                }

            </Grid>
        </div>
    )
}

export default StudentClearanceSection