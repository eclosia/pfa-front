import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserMetaCard from "../components/profile/UserMetaCard";
import UserInfoCard from "../components/profile/UserInfoCard";
import UserAddressCard from "../components/profile/UserAddressCard";
import UserSkillsCard from "../components/profile/UserSkillsCard";
import UserAcademicPathCard from "../components/profile/UserAcademicPathCard";
import UserExperienceCard from "../components/profile/UserExperienceCard";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";

interface UserMetaCardProps {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        apogeeNumber: string;
        location: string;
    };
}

export default function UserProfiles() {

    const [data, setData] = useState<UserMetaCardProps>({
        user: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            apogeeNumber: "",
            location: ""
        }
    });

    // useEffect(() => {
    //     fetch("http://localhost:8080/student/profile/1").then
    //         (response => {
    //             if (response.ok) {
    //                 console.log("Response is ok");
    //                 return response.json();
    //             }
    //             throw new Error("Network response was not ok.");
    //         })
    //         .then(data => {
    //             console.log(data);
    //             setData(data);
    //         })
    //         .catch(error => {
    //             console.error("There was a problem with the fetch operation:", error);
    //         });
    // }, []);


    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Profile" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Profile
                </h3>
                <div className="space-y-6">
                    <UserMetaCard data={data} />
                    <UserInfoCard data={data} />
                    <UserAddressCard />
                    <UserSkillsCard /> 
                    <UserAcademicPathCard />
                    <UserExperienceCard  />
                </div>
            </div>
        </>
    );
}
