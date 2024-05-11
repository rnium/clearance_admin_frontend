import NavbarStudent from '../components/molecules/NavbarStudent';
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import ProfileEdit from "./ProfileEdit";
import { Box, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';


const StudentHome = () => {
  return (
    <div>
      <NavbarStudent />
      <Box sx={{ my: 0, py: 1 }} style={{zIndex: '-1'}} >
        <Marquee speed={40} gradient={true}>
          <Typography variant='body1' color="primary" sx={{ px: 2, fontSize: {xs: '0.7rem', md: '1rem'} }}>
            নোটিশঃ যেসকল ছাত্রছাত্রীরা ফাইনাল সেমিস্টারে পাশ করেছে এবং যাদেরকে স্ব স্ব ডিপার্টমেন্ট কতৃক ক্লিয়ারেন্স এর জন্য অনুমতি প্রদান করা হয়েছে শুধুমাত্র তারা পোর্টালে একাউন্ট খুলতে পারবে।
          </Typography>
        </Marquee>
      </Box>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/profile" element={<ProfileEdit />} />
      </Routes>
    </div>
  )
}

export default StudentHome