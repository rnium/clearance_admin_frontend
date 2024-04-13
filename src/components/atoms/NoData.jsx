import React from 'react';
import {
    Paper, Stack
} from '@mui/material'
import { Empty } from 'antd';
const NoData = () => {
  return (
    <Paper sx={{py: 7}}>
        <Stack alignItems="center">
            <Empty />
        </Stack>
    </Paper>
  )
}

export default NoData