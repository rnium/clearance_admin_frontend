import NavbarStudent from '../components/molecules/NavbarStudent';
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import Profile from "./Profile";


const StudentHome = () => {
  return (
    <div>
      <NavbarStudent />
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default StudentHome