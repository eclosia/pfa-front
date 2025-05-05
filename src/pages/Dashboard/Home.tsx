import PageMeta from "../../components/common/PageMeta";
import { FaGraduationCap, FaBook, FaCalendarCheck, FaChartLine, FaUserGraduate, FaTasks, FaAward } from "react-icons/fa";
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

export default function Home() {
  const statsData = [
    {
      title: "Cours Suivis",
      value: "12",
      icon: <FaBook className="h-8 w-8 text-blue-500" />,
      change: "+2 ce mois",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
    },
    {
      title: "Projets Réalisés",
      value: "8",
      icon: <FaTasks className="h-8 w-8 text-green-500" />,
      change: "+3 ce mois",
      bgColor: "bg-green-50 dark:bg-green-900/30",
    },
    {
      title: "Stages Trouvés",
      value: "3",
      icon: <FaCalendarCheck className="h-8 w-8 text-purple-500" />,
      change: "2 en cours",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
    },
    {
      title: "Progression",
      value: "85%",
      icon: <FaChartLine className="h-8 w-8 text-orange-500" />,
      change: "+5% ce mois",
      bgColor: "bg-orange-50 dark:bg-orange-900/30",
    },
  ];

  const progressData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Progression des cours',
        data: [65, 70, 75, 80, 82, 85],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const skillsData = {
    labels: ['Développement', 'Design', 'Gestion de Projet', 'Communication'],
    datasets: [
      {
        data: [85, 65, 75, 90],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const upcomingEvents = [
    {
      title: "Examen Final",
      date: "15 Juin 2024",
      time: "09:00",
      status: "À venir",
      statusColor: "bg-yellow-100 text-yellow-800",
      icon: <FaGraduationCap className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Présentation de Stage",
      date: "20 Juin 2024",
      time: "14:30",
      status: "Confirmé",
      statusColor: "bg-green-100 text-green-800",
      icon: <FaAward className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Soutenance de Projet",
      date: "25 Juin 2024",
      time: "10:00",
      status: "En préparation",
      statusColor: "bg-blue-100 text-blue-800",
      icon: <FaUserGraduate className="h-5 w-5 text-blue-500" />,
    },
  ];

  return (
    <>
      <PageMeta
        title="Tableau de Bord Étudiant"
        description="Vue d'ensemble de votre progression académique"
      />
      
      {/* Welcome Section */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Bienvenue, Étudiant!</h1>
        <p className="mt-2 text-blue-100">Suivez votre progression et restez à jour avec vos activités académiques.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <div key={index} className={`rounded-xl ${stat.bgColor} p-6 shadow-lg transition-transform hover:scale-105`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                <p className="mt-1 text-sm font-medium text-green-500">{stat.change}</p>
              </div>
              <div className="rounded-full bg-white p-3 shadow-md dark:bg-gray-800">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Events Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Progress Chart */}
        <div className="rounded-xl bg-transparent p-6 shadow-lg dark:bg-transparent">
          <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Progression des Cours</h3>
          <div className="h-80">
            <Line 
              data={progressData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                    ticks: {
                      color: '#6B7280',
                    },
                  },
                  x: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                    ticks: {
                      color: '#6B7280',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Skills Chart */}
        <div className="rounded-xl bg-transparent p-6 shadow-lg dark:bg-transparent">
          <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Compétences</h3>
          <div className="h-80">
            <Doughnut 
              data={skillsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: '#6B7280',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-xl bg-transparent p-6 shadow-lg dark:bg-transparent lg:col-span-2">
          <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Prochains Événements</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50/50 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100/50 p-2 dark:bg-gray-700/50">
                    {event.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                    <p className="text-sm text-gray-500">
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
