import { BrowserRouter as Router, Routes, Route } from "react-router";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

import StudentAppLayout from "./Student/layout/StudentAppLayout";
import StudentHome from "./Student/pages/StudentHome";
import UserProfiles from "./Student/pages/UserProfiles";
import MessagingPage from "./Student/pages/MessagingPage";
import JobOffers from "./Student/pages/JobOffers";
import CompanyOffers from "./Student/pages/CompanyOffers";
import StudentEvaluation from "./Student/pages/StudentEvaluation";

import AdminAppLayout from "./Admin/layout/AdminAppLayout";
import AdminHome from "./Admin/pages/AdminHome";
import Students from "./Admin/pages/Students";
import Teachers from "./Admin/pages/Teachers";
import Companies from "./Admin/pages/Companies";
import Calendar from "./Admin/pages/Calendar";
import Stages from "./Admin/pages/Stages";
import AddTeacher from "./Admin/pages/AddTeacher";
import AddEntreprise from "./Admin/pages/AddEntreprise";
import AdminProfile from "./Admin/pages/AdminProfile";

import TeacherAppLayout from "./Teacher/layout/TeacherAppLayout";
import TeacherHome from "./Teacher/pages/TeacherHome"; 
import MyStudents from "./Teacher/pages/MyStudents"; 
import MyCalendar from "./Teacher/pages/MyCalendar";
import ProjectsStudents from "./Teacher/pages/ProjectsStudents";
import Soutenances from "./Teacher/pages/Soutenances";
import Evaluations from "./Teacher/pages/Evaluations";
import ProfileTeacher from "./Teacher/pages/ProfileTeacher";
import MessagingPageTeacher from "./Teacher/pages/MessagingPageTeacher";



import AddOffreStage from "./Entreprise/pages/AddOffreStage";
import EntrepriseHome from "./Entreprise/pages/EntrepriseHome";


import NotFound from "./pages/OtherPage/NotFound";

import { ScrollToTop } from "./components/common/ScrollToTop";

export default function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Student */}
                    <Route path="/" element={<StudentAppLayout />}>

                        <Route path="/student" element={<StudentHome />} />

                        <Route path="/profile" element={<UserProfiles />} />

                        <Route path="/messaging" element={<MessagingPage />} />

                
                        {/* Job Offers */}
                        <Route path="/job-offers" element={<JobOffers />} />
                        
                        {/* Company Management */}
                        <Route path="/company-offers" element={<CompanyOffers />} />
                        <Route path="/student-evaluation" element={<StudentEvaluation />} />
                        
                    </Route>

                    {/* Admin */}
                    <Route path="/admin" element={<AdminAppLayout />}>

                        <Route path="/admin" element={<AdminHome />} />

                        <Route path="/admin/students" element={<Students />} />
                        <Route path="/admin/teachers" element={<Teachers />} />
                        <Route path="/admin/companies" element={<Companies />} />
                        <Route path="/admin/AdminProfile" element={<AdminProfile />} />

                        <Route path="/admin/calendar" element={<Calendar />} />

                        <Route path="/admin/stages" element={<Stages />} />

                        <Route path="/admin/AddTeacher" element={<AddTeacher />} />
                        <Route path="/admin/AddEntreprise" element={<AddEntreprise />} />


                    </Route>


                    <Route path="/teacher" element={<TeacherAppLayout />}>
                        <Route path="/teacher" element={<TeacherHome />} /> 
                        <Route path="/teacher/calendar" element={<MyCalendar />} />
                        <Route path="/teacher/students" element={<MyStudents />} />
                        <Route path="/teacher/ProjectsStudents" element={<ProjectsStudents />} />
                        <Route path="/teacher/Soutenances" element={<Soutenances />} />
                        <Route path="/teacher/Evaluations" element={<Evaluations />} />
                        <Route path="/teacher/ProfileTeacher" element={<ProfileTeacher />} />
                        <Route path="/teacher/MessagingPageTeacher" element={<MessagingPageTeacher />} />  
                    </Route>


                    <Route path="/entreprise" element={<EntrepriseHome />}>
                    <Route path="/entreprise" element={<EntrepriseHome />} />  
                        <Route path="/entreprise/AddOffreStage" element={<AddOffreStage />} />   
                    </Route>


                    {/* Auth Layout */}
                    <Route index path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}
