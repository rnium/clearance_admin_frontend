import React from 'react';
import { Timeline, Empty } from 'antd';
import { Paper, Stack, Typography } from '@mui/material';

const RemarksTimeline = ({ remarks }) => {
    let remarks_items = remarks.map(r => (
        {
            children: (
                <Paper sx={{ p: 1, backgroundColor: 'aliceblue' }}>
                    <Typography color="primary" variant='h6' sx={{ fontSize: '1rem' }}>{r.title}</Typography>
                    <Typography variant='body2' color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                        {r.remarks}
                    </Typography>
                </Paper>
            )
        }
    ))
    return (
        <div>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.3rem' }, mb: 2 }}>Remarks</Typography>
            {
                remarks.length == 0 ?
                    <Paper sx={{py: 10}}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description = {
                                <Typography variant='body2'>No remarks yet</Typography>
                            }
                        />
                    </Paper> :
                    <Timeline
                        items={remarks_items}
                    />
            }
        </div>
    )
}

export default RemarksTimeline