import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./auth/authContext";
import { RoleProtectedRoute } from "./auth/RoleProtectedRoute";

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

import NotFound from "./pages/OtherPage/NotFound";

import { ScrollToTop } from "./components/common/ScrollToTop";

export default function App() {
    return (

        <AuthProvider>
            <Router>
                <ScrollToTop />
                <Routes>

                    {/* Student Routes */}
                    <Route path="/" element={
                        <RoleProtectedRoute requiredRole='student' >
                            <StudentAppLayout />
                        </RoleProtectedRoute>
                    }>
                        <Route path="/student" element={<StudentHome />} />
                        <Route path="/profile" element={<UserProfiles />} />
                        <Route path="/messaging" element={<MessagingPage />} />
                        <Route path="/job-offers" element={<JobOffers />} />
                        <Route path="/company-offers" element={<CompanyOffers />} />
                        <Route path="/student-evaluation" element={<StudentEvaluation />} />
                        
                    </Route>

                    {/* Admin Routes */}
                    <Route path="/admin" element={
                        <RoleProtectedRoute requiredRole='Admin' >
                            <AdminAppLayout />
                        </RoleProtectedRoute>
                    }>
                        <Route path="/admin" element={<AdminHome />} />
                        <Route path="/admin/students" element={<Students />} />
                        <Route path="/admin/teachers" element={<Teachers />} />
                        <Route path="/admin/companies" element={<Companies />} />
                        <Route path="/admin/calendar" element={<Calendar />} />
                        <Route path="/admin/stages" element={<Stages />} />
                    </Route>

                    {/* Auth Routes */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>


    );
}
