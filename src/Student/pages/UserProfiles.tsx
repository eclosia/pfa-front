import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserMetaCard from "../components/profile/UserMetaCard";
import UserInfoCard from "../components/profile/UserInfoCard";
import UserAddressCard from "../components/profile/UserAddressCard";
import UserSkillsCard from "../components/profile/UserSkillsCard";
import UserAcademicPathCard from "../components/profile/UserAcademicPathCard";
import UserExperienceCard from "../components/profile/UserExperienceCard";
import PageMeta from "../../components/common/PageMeta";

export default function UserProfiles() {
  return (
    <>
      <PageMeta
        title="Tableau de bord Profil React.js | TailAdmin - Template de tableau de bord Next.js"
        description="Ceci est la page du tableau de bord Profil React.js pour TailAdmin - Template de tableau de bord React.js avec Tailwind CSS"
      />
      <PageBreadcrumb pageTitle="Profil" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profil
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
          <UserSkillsCard />
          <UserAcademicPathCard />
          <UserExperienceCard />
        </div>
      </div>
    </>
  );
}
