import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import {
  LayoutDashboard,
  Users,
  NotebookText,
  CalendarDays,
  ClipboardList,
  FileText,
  BarChart2,
  MessageSquare,
  ChevronDown,
  MoreHorizontal
} from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; badge?: number }[];
};

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={18} />,
    name: "Tableau de bord",
    path: "/teacher"
  },
  {
    icon: <Users size={18} />,
    name: "Mes Étudiants",
    subItems: [
      { name: "Liste des étudiants", path: "/teacher/students" },
      { name: "Fiches projets", path: "/teacher/ProjectsStudents", badge: 3 }
    ]
  },
  {
    icon: <NotebookText size={18} />,
    name: "Projets",
    subItems: [
      { name: "Tous les projets", path: "/teacher/all-projects" },
      { name: "À valider", path: "/teacher/pending-projects", badge: 2 },
      { name: "En cours", path: "/teacher/active-projects" }
    ]
  },
  {
    icon: <CalendarDays size={18} />,
    name: "Calendrier",
    path: "/teacher/calendar"
  },
  {
    icon: <ClipboardList size={18} />,
    name: "Soutenances",
    subItems: [
      { name: "Planifier", path: "/teacher/schedule-defense" },
      { name: "À venir", path: "/teacher/upcoming-defenses", badge: 4 }
    ]
  },
  {
    icon: <FileText size={18} />,
    name: "Évaluations",
    path: "/teacher/evaluations"
  },
  {
    icon: <BarChart2 size={18} />,
    name: "Statistiques",
    path: "/teacher/stats"
  },
  {
    icon: <MessageSquare size={18} />,
    name: "Messagerie",
    path: "/teacher/messages"
  }
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname.startsWith(path),
    [location.pathname]
  );

  useEffect(() => {
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        const hasActiveSubItem = nav.subItems.some(subItem => isActive(subItem.path));
        if (hasActiveSubItem) {
          setOpenSubmenu(index);
        }
      }
    });
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu(prev => prev === index ? null : index);
  };

  const renderMenuItems = () => (
    <ul className="flex flex-col gap-1">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <>
              <button
                onClick={() => handleSubmenuToggle(index)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  (openSubmenu === index || nav.subItems.some(item => isActive(item.path)))
                    ? "bg-blue-50 text-blue-600 dark:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                } ${
                  !isExpanded && !isHovered ? "justify-center" : "justify-between"
                }`}
              >
                <div className="flex items-center">
                  <span className={`${
                    (openSubmenu === index || nav.subItems.some(item => isActive(item.path)))
                      ? "text-blue-600 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="ml-3">{nav.name}</span>
                  )}
                </div>
                {(isExpanded || isHovered || isMobileOpen) && nav.subItems && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openSubmenu === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              <div
                ref={(el) => { subMenuRefs.current[`${index}`] = el; }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: openSubmenu === index 
                    ? `${subMenuHeight[index] || 0}px` 
                    : "0px",
                }}
              >
                <ul className="py-1 pl-4">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className={`flex items-center px-3 py-2 text-sm rounded-lg ${
                          isActive(subItem.path)
                            ? "bg-blue-100 text-blue-700 dark:bg-gray-600 dark:text-white"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-500"
                        }`}
                      >
                        <span>{subItem.name}</span>
                        {subItem.badge && (
                          <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                            {subItem.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive(nav.path)
                    ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                } ${
                  !isExpanded && !isHovered ? "justify-center" : "justify-start"
                }`}
              >
                <span className={`${
                  isActive(nav.path)
                    ? "text-blue-600 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}>
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="ml-3">{nav.name}</span>
                )}
              </Link>
            )
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 left-0 bg-white dark:bg-gray-900 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 dark:border-gray-800
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Link to="/teacher">
          {isExpanded || isHovered || isMobileOpen ? (
            <img
              className="dark:hidden"
              src="/images/logo/eclosia_dark.png"
              alt="Logo"
              width={150}
              height={40}
            />
          ) : (
            <img
              src="/images/Eclosia_favicon.png"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Navigation"
                ) : (
                  <MoreHorizontal className="size-6" />
                )}
              </h2>
              {renderMenuItems()}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;