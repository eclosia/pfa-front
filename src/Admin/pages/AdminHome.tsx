import PageMeta from "../../components/common/PageMeta";
import {
    FaUsers, FaBuilding, FaCalendarAlt, 
    FaTasks, FaUserGraduate, FaChalkboardTeacher,
    FaChartLine, FaCog
} from "react-icons/fa";

const quickActions = [
    { icon: <FaUsers className="h-6 w-6 text-blue-500" />, text: "Étudiants", link: "/admin/students", color: "blue" },
    { icon: <FaUsers className="h-6 w-6 text-blue-500" />, text: "Enseignants", link: "/admin/teachers", color: "blue" },
    { icon: <FaBuilding className="h-6 w-6 text-green-500" />, text: "Entreprises", link: "/admin/companies", color: "green" },
    { icon: <FaCalendarAlt className="h-6 w-6 text-purple-500" />, text: "Calendrier", link: "/admin/calendar", color: "purple" },
    { icon: <FaTasks className="h-6 w-6 text-orange-500" />, text: "Stages", link: "/admin/internships", color: "orange" },
    { icon: <FaCog className="h-6 w-6 text-red-500" />, text: "Affectations", link: "/admin/assignments", color: "red" },
];

const statsData = [
    {
        title: "Étudiants",
        value: "245",
        icon: <FaUserGraduate className="h-8 w-8 text-blue-500" />,
        change: "+15 ce mois",
        bgColor: "bg-blue-50 dark:bg-blue-900/30",
    },
    {
        title: "Enseignants",
        value: "32",
        icon: <FaChalkboardTeacher className="h-8 w-8 text-purple-500" />,
        change: "Actifs",
        bgColor: "bg-purple-50 dark:bg-purple-900/30",
    },
    {
        title: "Entreprises",
        value: "48",
        icon: <FaBuilding className="h-8 w-8 text-green-500" />,
        change: "+5 nouvelles",
        bgColor: "bg-green-50 dark:bg-green-900/30",
    },
    {
        title: "Stages Actifs",
        value: "87",
        icon: <FaTasks className="h-8 w-8 text-orange-500" />,
        change: "En cours",
        bgColor: "bg-orange-50 dark:bg-orange-900/30",
    },
];

export default function AdminHome() {
    return (
        <>
            <PageMeta title="Tableau de Bord Administrateur" description="Panneau de contrôle de la plateforme Eclosia" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de Bord Administrateur</h1>
            </div>

            {/* Section de bienvenue */}
            <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg dark:from-blue-700 dark:to-indigo-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Bienvenue, Administrateur</h1>
                        <p className="mt-2 text-blue-100 dark:text-blue-200">
                            Gestion centrale des utilisateurs, calendriers et affectations
                        </p>
                    </div>
                </div>
            </div>

            {/* Statistiques */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat, i) => (
                    <div
                        key={i}
                        className={`rounded-xl ${stat.bgColor} p-6 shadow-lg transition-transform hover:scale-105 dark:shadow-none`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                                <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                                <p className="mt-1 text-sm font-medium text-blue-500 dark:text-blue-400">{stat.change}</p>
                            </div>
                            <div className="rounded-full bg-white p-3 shadow-md dark:bg-gray-800">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions Rapides */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {quickActions.map((action, i) => (
                    <a
                        key={i}
                        href={action.link}
                        className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg dark:bg-gray-800"
                    >
                        <div className={`mb-2 rounded-full bg-${action.color}-100 p-3 dark:bg-${action.color}-900/30`}>
                            {action.icon}
                        </div>
                        <span className="text-center font-medium text-gray-700 dark:text-gray-300">{action.text}</span>
                    </a>
                ))}
            </div>

            {/* Section vide pour éventuelles extensions */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Aperçu des activités</h3>
                <div className="flex h-40 items-center justify-center text-gray-400 dark:text-gray-500">
                    [Espace réservé pour les statistiques ou notifications]
                </div>
            </div>
        </>
    );
}