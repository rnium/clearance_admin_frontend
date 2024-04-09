import { useState } from 'react';
import {
    Box, Typography, Button
} from '@mui/material';
import axios from 'axios';
import * as urls from '../../utils/api_urls';
import { message } from 'antd';
import { loadInfo, setLoaded } from '../../redux/studentStoreReducer';
import { useDispatch } from 'react-redux';


const PendingCard = () => {
    const dispatch = useDispatch();
    const [isApplying, setIsApplying] = useState(false);
    const apply = async () => {
        setIsApplying(true);
        try {
            await axios.get(urls.applyClearanceUrl);
            message.success('Applied For Clearance');
            let res = await axios.get(urls.studentinfoUrl);
            dispatch(loadInfo(res.data.info));
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
            dispatch(setLoaded(true));
        }
        setIsApplying(false);
    }
    return (
        <Box sx={{ display: 'flex', mt: 5, flexDirection: 'column' }} alignItems="center" justifyContent="center">
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <img src="./static/images/apply.svg" width="300px" alt="" />
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <img src="./static/images/apply.svg" width="150px" alt="" />
            </Box>
            <Typography variant="h5" fontSize={{ xs: '1rem', md: '1.7rem' }} textAlign="center">Great!!! Now You Can Apply For Clearance</Typography>
            {
                isApplying ?
                    <Button variant='contained' disabled sx={{ mt: 3, px: 5, py: 1, borderRadius: '180px' }}>Apply Now</Button>
                    : <Button variant='contained' onClick={apply} sx={{ mt: 3, px: 5, py: 1, borderRadius: '180px' }}>Apply Now</Button>
            }
        </Box>
    )
}

export default PendingCard