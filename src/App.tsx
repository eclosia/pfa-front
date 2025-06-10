import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

// Student Components
import StudentAppLayout from "./Student/layout/StudentAppLayout";
import StudentHome from "./Student/pages/StudentHome";
import UserProfiles from "./Student/pages/UserProfiles";
import MessagingPage from "./Student/pages/MessagingPage";
import JobOffers from "./Student/pages/JobOffers";
import CompanyOffers from "./Student/pages/CompanyOffers";
import StudentEvaluation from "./Student/pages/StudentEvaluation";

// Admin Components
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
import AffectationForm from "./Admin/pages/AffectationForm";

// Teacher Components
import TeacherAppLayout from "./Teacher/layout/TeacherAppLayout";
import TeacherHome from "./Teacher/pages/TeacherHome";
import MyStudents from "./Teacher/pages/MyStudents";
import MyCalendar from "./Teacher/pages/MyCalendar";
import ProjectsStudents from "./Teacher/pages/ProjectsStudents";
import Soutenances from "./Teacher/pages/Soutenances";
import Evaluations from "./Teacher/pages/Evaluations";
import ProfileTeacher from "./Teacher/pages/ProfileTeacher";
import MessagingPageTeacher from "./Teacher/pages/MessagingPageTeacher";


// Entreprise Components
import EntrepriseAppLayout from "./Entreprises/layout/EntrepriseAppLayout";
import AddOffreStage from "./Entreprises/pages/AddOffreStage";

// Other Components
import NotFound from "./pages/OtherPage/NotFound";
import { ScrollToTop } from "./components/common/ScrollToTop";

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Redirection from root to /signin */}
                <Route path="/" element={<Navigate to="/signin" replace />} />

                {/* Auth Routes */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Student Routes */}
                <Route path="/student" element={<StudentAppLayout />}>
                    <Route index element={<StudentHome />} />
                    <Route path="profile" element={<UserProfiles />} />
                    <Route path="messaging" element={<MessagingPage />} />
                    <Route path="job-offers" element={<JobOffers />} />
                    <Route path="company-offers" element={<CompanyOffers />} />
                    <Route path="student-evaluation" element={<StudentEvaluation />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminAppLayout />}>
                    <Route index element={<AdminHome />} />
                    <Route path="students" element={<Students />} />
                    <Route path="teachers" element={<Teachers />} />
                    <Route path="companies" element={<Companies />} />
                    <Route path="AdminProfile" element={<AdminProfile />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="stages" element={<Stages />} />
                    <Route path="AddTeacher" element={<AddTeacher />} />
                    <Route path="AddEntreprise" element={<AddEntreprise />} />
                    <Route path="AffectationForm" element={<AffectationForm />} />
                </Route>

                {/* Teacher Routes */}
                <Route path="/teacher" element={<TeacherAppLayout />}>
                    <Route index element={<TeacherHome />} />
                    <Route path="calendar" element={<MyCalendar />} />
                    <Route path="students" element={<MyStudents />} />
                    <Route path="projects-students" element={<ProjectsStudents />} />
                    <Route path="soutenances" element={<Soutenances />} />
                    <Route path="evaluations" element={<Evaluations />} />
                    <Route path="profile" element={<ProfileTeacher />} />
                    <Route path="messages" element={<MessagingPageTeacher />} />
                    {/* Ajoute cette route si tu veux une page stats */}
                    <Route path="stats" element={<div>Statistiques (à implémenter)</div>} />
                </Route>


                {/* Entreprise Routes */}
                <Route path="/entreprise" element={<EntrepriseAppLayout />}>
                    <Route index element={<AddOffreStage />} />
                    <Route path="AddOffreStage" element={<AddOffreStage />} />
                </Route>

                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}