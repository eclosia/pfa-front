import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaCalendar, FaTable, FaChartLine, FaBriefcase, FaMousePointer, FaSearch, FaBuilding } from "react-icons/fa";
import { MdOutlineImage, MdOutlineVideoLibrary, MdWorkOutline } from "react-icons/md";
import { BsBell, BsPersonBadge } from "react-icons/bs";

const menuItems = [
  {
    title: "Accueil",
    icon: <FaHome className="h-5 w-5" />,
    path: "/",
  },
  {
    title: "Profile",
    icon: <FaUser className="h-5 w-5" />,
    path: "/profile",
  },
  {
    title: "Messagerie",
    icon: <BsBell className="h-5 w-5" />,
    path: "/messages",
  },
  {
    title: "Offres d'Emploi",
    icon: <FaBuilding className="h-5 w-5" />,
    path: "/job-offers",
  },
  {
    title: "Offres de Stages",
    icon: <MdWorkOutline className="h-5 w-5" />,
    path: "/internships",
  },
  {
    title: "Calendar",
    icon: <FaCalendar className="h-5 w-5" />,
    path: "/calendar",
  },
  {
    title: "Statistiques",
    icon: <FaChartLine className="h-5 w-5" />,
    path: "/statistics",
  },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0">
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link to="/">
          <img src="/images/logo/logo.svg" alt="Logo" />
        </Link>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      location.pathname === item.path && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
} 