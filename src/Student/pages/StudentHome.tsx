import PageMeta from "../../components/common/PageMeta";
import {
    FaTasks, FaBriefcase, FaChalkboardTeacher, 
    FaUserGraduate, FaChartLine, FaFileAlt, 
    FaUserTie, FaGraduationCap, FaBook, 
    FaCalendarCheck, FaAward, FaBell, 
    FaEnvelope, FaSearch 
} from "react-icons/fa";
import { Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const statsData = [
    {
        title: "Projets PFA",
        value: "1",
        icon: <FaTasks className="h-8 w-8 text-green-500" />,
        change: "En cours",
        bgColor: "bg-green-50 dark:bg-green-900/30",
    },
    {
        title: "Candidatures Stages",
        value: "5",
        icon: <FaBriefcase className="h-8 w-8 text-purple-500" />,
        change: "2 réponses",
        bgColor: "bg-purple-50 dark:bg-purple-900/30",
    },
    {
        title: "Progression PFA",
        value: "65%",
        icon: <FaChartLine className="h-8 w-8 text-orange-500" />,
        change: "+15% ce mois",
        bgColor: "bg-orange-50 dark:bg-orange-900/30",
    },
];

const progressData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [{
        label: 'Progression du PFA',
        data: [20, 30, 45, 50, 60, 65],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
    }],
};

const skillsData = {
    labels: ['Développement', 'Conception', 'Recherche', 'Rédaction'],
    datasets: [{
        data: [80, 70, 85, 75],
        backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 0,
    }],
};

const upcomingEvents = [
    {
        title: "Réunion avec Encadrant",
        date: "15 Juin 2024",
        time: "14:00",
        status: "Confirmé",
        statusColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
        icon: <FaChalkboardTeacher className="h-5 w-5 text-green-500" />,
    },
    {
        title: "Dépôt Rapport PFA",
        date: "25 Juin 2024",
        time: "23:59",
        status: "À finaliser",
        statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
        icon: <FaFileAlt className="h-5 w-5 text-yellow-500" />,
    },
    {
        title: "Entretien Stage",
        date: "30 Juin 2024",
        time: "10:30",
        status: "En attente",
        statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
        icon: <FaUserTie className="h-5 w-5 text-blue-500" />,
    },
];

const pfaProgress = [
    {
        title: "Phase de Recherche",
        progress: 100,
        status: "Terminé",
        color: "bg-emerald-500",
    },
    {
        title: "Conception Solution",
        progress: 80,
        status: "En cours",
        color: "bg-blue-500",
    },
    {
        title: "Implémentation",
        progress: 50,
        status: "En cours",
        color: "bg-indigo-500",
    },
    {
        title: "Rédaction Rapport",
        progress: 30,
        status: "À commencer",
        color: "bg-purple-500",
    },
];

const quickActions = [
    { icon: <FaTasks className="h-6 w-6 text-blue-500" />, text: "Projet PFA", subtext: "Voir progression", link: "/pfa", color: "blue" },
    { icon: <FaBriefcase className="h-6 w-6 text-green-500" />, text: "Stages", subtext: "Candidatures", link: "/stages", color: "green" },
    { icon: <FaChalkboardTeacher className="h-6 w-6 text-purple-500" />, text: "Encadrant", subtext: "Contact", link: "/encadrant", color: "purple" },
    { icon: <FaUserGraduate className="h-6 w-6 text-orange-500" />, text: "Profil", subtext: "Compléter", link: "/profil", color: "orange" },
];

export default function StudentHome() {
    return (
        <>
            <PageMeta title="Tableau de Bord Étudiant" description="Vue d'ensemble de votre progression académique" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de Bord</h1>
            </div>

            {/* Section de bienvenue */}
            <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white shadow-lg dark:from-blue-600 dark:to-purple-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Bienvenue, Rida Mihi !</h1>
                        <p className="mt-2 text-blue-100 dark:text-blue-200">
                            Suivez votre progression et restez à jour avec vos activités académiques.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <img src="/images/user/owner.jpg" alt="Étudiant" className="h-24 w-24 rounded-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Actions Rapides */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {quickActions.map((action, i) => (
                    <a key={i} href={action.link} className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg dark:bg-gray-800">
                        <div className={`mb-2 rounded-full bg-${action.color}-100 p-3 dark:bg-${action.color}-900/30`}>
                            {action.icon}
                        </div>
                        <span className="text-center font-medium text-gray-700 dark:text-gray-300">{action.text}</span>
                        <span className={`text-xs text-${action.color}-500`}>{action.subtext}</span>
                    </a>
                ))}
            </div>

            {/* Statistiques */}
            <div className="flex justify-center w-full">
                <div className="grid w-full max-w-screen-lg grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {statsData.map((stat, i) => (
                        <div key={i} className={`rounded-xl ${stat.bgColor} p-6 shadow-lg transition-transform hover:scale-105 dark:shadow-none`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                                    <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                                    <p className="mt-1 text-sm font-medium text-green-500 dark:text-green-400">{stat.change}</p>
                                </div>
                                <div className="rounded-full bg-white p-3 shadow-md dark:bg-gray-800">
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Graphiques & Événements */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Détails Progression PFA */}
                <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                    <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Détails Progression PFA</h3>
                    <div className="space-y-4">
                        {pfaProgress.map((item, i) => (
                            <div key={i} className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Statut: {item.status}</p>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {item.progress}%
                                    </span>
                                </div>
                                <div className="mt-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.progress}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prochains événements */}
                <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                    <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Prochains Événements</h3>
                    <div className="space-y-4">
                        {upcomingEvents.map((event, i) => (
                            <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50">
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                                        {event.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {event.date} à {event.time}
                                        </p>
                                    </div>
                                </div>
                                <span className={`rounded-full px-3 py-1 text-sm font-medium ${event.statusColor}`}>
                                    {event.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}