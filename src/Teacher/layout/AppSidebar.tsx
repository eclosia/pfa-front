import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

import { useAuth } from "../../auth/authContext";

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
    // {
    //   icon: <Users size={18} />,
    //   name: "Mes Étudiants",
    //   subItems: [
    //     { name: "Liste des étudiants", path: "/teacher/students" },
    //     { name: "Fiches projets", path: "/teacher/projects-students", badge: 3 }
    //   ]
    // },
    {
        icon: <Users size={18} />,
        name: "Mes Étudiants",
        path: "/teacher/students"
    },
    // {
    //   icon: <NotebookText size={18} />,
    //   name: "Projets",
    //   subItems: [
    //     { name: "Tous les projets", path: "/teacher/projects-students" },
    //     { name: "À valider", path: "/teacher/projects-students", badge: 2 },
    //     { name: "En cours", path: "/teacher/projects-students" }
    //   ]
    // },
    {
        icon: <NotebookText size={18} />,
        name: "Projets",
        path: "/teacher/projects-students"
    },
    {
        icon: <CalendarDays size={18} />,
        name: "Calendrier",
        path: "/teacher/calendar"
    },
    {
        icon: <ClipboardList size={18} />,
        name: "Soutenances",
        path: "/teacher/soutenances"
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

    const { logout } = useAuth();

    const location = useLocation();

    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(true);

    const [isMobileOpen, setIsMobileOpen] = useState(true);

    const [isHovered, setIsHovered] = useState(false);

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: "main" | "";
        index: number;
    } | null>(null);

    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const isActive = useCallback(
        (path: string) => location.pathname.startsWith(path),
        [location.pathname]
    );

    useEffect(() => {
        let submenuMatched = false;
        navItems.forEach((nav, index) => {
            if (nav.subItems) {
                nav.subItems.forEach((subItem) => {
                    if (isActive(subItem.path)) {
                        setOpenSubmenu({ type: "main", index });
                        submenuMatched = true;
                    }
                });
            }
        });

        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [location, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `main-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (prevOpenSubmenu?.index === index) {
                return null;
            }
            return { type: "main", index };
        });
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate("/teacher");
    };

    const renderMenuItems = () => (
        <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index)}
                            className={`flex items-center w-full p-3 rounded-lg transition-colors ${openSubmenu?.index === index
                                ? "bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                } ${!isExpanded && !isHovered ? "justify-center" : "justify-start"
                                }`}
                        >
                            <span className="flex-shrink-0">
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className="ml-3">{nav.name}</span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDown
                                    className={`ml-auto w-5 h-5 transition-transform ${openSubmenu?.index === index ? "rotate-180" : ""
                                        }`}
                                />
                            )}
                        </button>
                    ) : (
                        <Link
                            to={nav.path || "#"}
                            className={`flex items-center w-full p-3 rounded-lg transition-colors ${isActive(nav.path || "")
                                ? "bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                } ${!isExpanded && !isHovered ? "justify-center" : "justify-start"
                                }`}
                        >
                            <span className="flex-shrink-0">
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className="ml-3">{nav.name}</span>
                            )}
                        </Link>
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`main-${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height:
                                    openSubmenu?.index === index
                                        ? `${subMenuHeight[`main-${index}`] || 0}px`
                                        : "0px",
                            }}
                        >
                            <ul className="mt-2 space-y-1 ml-12">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            to={subItem.path}
                                            className={`block px-3 py-2 rounded-md text-sm ${isActive(subItem.path)
                                                ? "bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{subItem.name}</span>
                                                {subItem.badge && (
                                                    <span className="ml-2 bg-blue-300 text-blue-900 text-xs px-2 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                                        {subItem.badge}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
                    ? "w-[290px]"
                    : isHovered
                        ? "w-[290px]"
                        : "w-[90px]"
                }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                    }`}
            >
                <a href="#" onClick={handleLogoClick} className="cursor-pointer">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
                            <img
                                className="dark:hidden"
                                src="/images/logo/eclosia_dark.png"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                            <img
                                className="hidden dark:block"
                                src="/images/eclosia_light.png"
                                alt="Logo"
                                width={150}
                                height={40}
                            />
                        </>
                    ) : (
                        <img
                            src="/images/Eclosia_favicon.png"
                            alt="Logo"
                            width={32}
                            height={32}
                        />
                    )}
                </a>
            </div>
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
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
            <div className="mt-auto mb-6 px-3">
                <button
                    onClick={() => {
                       logout();
                        console.log("Déconnexion...");
                    }}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors duration-200 border border-transparent"
                >
                    Déconnexion
                </button>
            </div>

        </aside>
    );
};

export default AppSidebar;