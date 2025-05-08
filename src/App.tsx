import { BrowserRouter as Router, Routes, Route } from "react-router";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

import StudentAppLayout from "./Student/layout/StudentAppLayout";
import StudentHome from "./Student/pages/StudentHome";
import UserProfiles from "./Student/pages/UserProfiles";
import MessagingPage from "./Student/pages/MessagingPage";
import JobOffers from "./Student/pages/JobOffers";

import AdminAppLayout from "./Admin/layout/AdminAppLayout";
import AdminHome from "./Admin/pages/AdminHome";
import Students from "./Admin/pages/Students";
import Teachers from "./Admin/pages/Teachers";
import Companies from "./Admin/pages/Companies";
import Calendar from "./Admin/pages/Calendar";
import Stages from "./Admin/pages/Stages";

import NotFound from "./pages/OtherPage/NotFound";

import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import JobOffers from "./pages/JobOffers";
import MessagingPage from "./components/Messaging/MessagingPage";
import Students from "./pages/Admin/Students";
import Teachers from "./pages/Admin/Teachers";
import Companies from "./pages/Admin/Companies";
import AdminAppLayout from "./layout/Admin/AdminAppLayout";
import AdminHome from "./pages/Dashboard/Admin/AdminHome";
import Stages from "./pages/Admin/Stages";

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

                {/* Forms */}
                <Route path="/form-elements" element={<FormElements />} />

                {/* Tables */}
                <Route path="/basic-tables" element={<BasicTables />} />

                {/* Ui Elements */}
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/avatars" element={<Avatars />} />
                <Route path="/badge" element={<Badges />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/images" element={<Images />} />
                <Route path="/videos" element={<Videos />} />

                {/* Charts */}
                <Route path="/line-chart" element={<LineChart />} />
                <Route path="/bar-chart" element={<BarChart />} />

<<<<<<< HEAD
            {/* Job Offers */}
            <Route path="/job-offers" element={<JobOffers />} />
            
            {/* Company Management */}
            <Route path="/company-offers" element={<CompanyOffers />} />
            <Route path="/student-evaluation" element={<StudentEvaluation />} />
=======
                        {/* Job Offers */}
                        <Route path="/job-offers" element={<JobOffers />} />
>>>>>>> 008f7bb02233d828738e06045c578dbb9a39a54a

                    </Route>

                    {/* Admin */}
                    <Route path="/admin" element={<AdminAppLayout />}>

                        <Route path="/admin" element={<AdminHome />} />

                        <Route path="/admin/students" element={<Students />} />
                        <Route path="/admin/teachers" element={<Teachers />} />
                        <Route path="/admin/companies" element={<Companies />} />

                        <Route path="/admin/calendar" element={<Calendar />} />

                        <Route path="/admin/stages" element={<Stages />} />


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
