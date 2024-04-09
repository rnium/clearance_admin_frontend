import NavbarStudent from '../components/molecules/NavbarStudent';
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import ProfileEdit from "./ProfileEdit";


const StudentHome = () => {
  return (
    <div>
      <NavbarStudent />
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/profile" element={<ProfileEdit />} />
      </Routes>
    </div>
  )
}

export default StudentHome