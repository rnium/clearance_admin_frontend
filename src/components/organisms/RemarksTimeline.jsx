import React from 'react';
import { Timeline } from 'antd';
import { Paper, Typography } from '@mui/material';

const RemarksTimeline = () => {
    return (
        <div>
            <Typography sx={{fontSize: {xs: '1rem', md: '1.3rem'}, mb: 2}}>Remarks</Typography>
            <Timeline
                items={[
                    {
                        children: (
                            <Paper sx={{p: 1, backgroundColor: 'aliceblue'}}>
                                <Typography color="primary" variant='h6' sx={{fontSize: '1rem'}}>Electronics Lab</Typography>
                                <Typography variant='body2' color="text.secondary" sx={{fontSize: '0.9rem'}}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, iste?
                                </Typography>
                            </Paper>
                        )
                    },
                    {
                        children: (
                            <Paper sx={{p: 1, backgroundColor: 'aliceblue'}}>
                                <Typography color="primary" variant='h6' sx={{fontSize: '1rem'}}>Electronics Lab</Typography>
                                <Typography variant='body2' color="text.secondary" sx={{fontSize: '0.9rem'}}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, iste?
                                </Typography>
                            </Paper>
                        )
                    },
                    {
                        children: (
                            <Paper sx={{p: 1, backgroundColor: 'aliceblue'}}>
                                <Typography color="primary" variant='h6' sx={{fontSize: '1rem'}}>Electronics Lab</Typography>
                                <Typography variant='body2' color="text.secondary" sx={{fontSize: '0.9rem'}}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, iste?
                                </Typography>
                            </Paper>
                        )
                    },
                ]}
            />
        </div>
    )
}

export default RemarksTimeline