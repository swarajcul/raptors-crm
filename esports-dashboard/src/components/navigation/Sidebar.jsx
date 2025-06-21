import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome, FiUsers, FiCalendar, FiBarChart2, FiSettings, FiFileText,
  FiChevronLeft, FiChevronRight, FiMenu // For collapse/expand and mobile close
} from 'react-icons/fi';
// import { useAuth } from '../../contexts/AuthContext';

const commonNavLinks = [
  { name: 'Dashboard', to: '/dashboard', icon: FiHome, exact: true }, // `exact` prop is for older react-router, use `end` for v6
  { name: 'Teams', to: '/dashboard/teams', icon: FiUsers },
  { name: 'Matches', to: '/dashboard/matches', icon: FiCalendar },
  { name: 'Statistics', to: '/dashboard/stats', icon: FiBarChart2 },
  { name: 'Reports', to: '/dashboard/reports', icon: FiFileText },
  { name: 'Settings', to: '/dashboard/settings', icon: FiSettings },
];

// Example: Role-specific links could be defined here
// const adminNavLinks = [ ... ];
// const managerNavLinks = [ ... ];
// const playerNavLinks = [ ... ];


const Sidebar = ({ isMobileSidebarOpen, toggleMobileSidebar }) => {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setIsDesktopCollapsed(savedState === 'true');
    }
  }, []);

  // Save collapsed state to localStorage
  useEffect(() => {
    if (window.innerWidth >= 1024) { // Only persist for desktop view
        localStorage.setItem('sidebarCollapsed', isDesktopCollapsed);
    }
  }, [isDesktopCollapsed]);

  const toggleDesktopCollapse = () => {
    setIsDesktopCollapsed(!isDesktopCollapsed);
  };

  // const { currentUser } = useAuth();
  // let navLinks = commonNavLinks;
  // if (currentUser) { ... }
  const navLinks = commonNavLinks;

  const baseLinkClass = "flex items-center space-x-3 p-3 rounded-md hover:bg-purple-700 dark:hover:bg-gray-700 transition-colors duration-200";
  const activeLinkClass = "bg-orange-600 dark:bg-orange-500 text-white font-semibold shadow-md";
  const inactiveLinkClass = "text-gray-300 dark:text-gray-400 hover:text-white";

  return (
    <>
      {/* Overlay for mobile, shown when mobile sidebar is open */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-purple-900 dark:bg-gray-800 text-white flex flex-col shadow-xl transition-all duration-300 ease-in-out
                   lg:static lg:inset-y-0
                   ${isMobileSidebarOpen ? 'translate-x-0 w-64 p-5' : '-translate-x-full w-64 p-5 lg:translate-x-0'}
                   ${isDesktopCollapsed ? 'lg:w-20 lg:p-3' : 'lg:w-64 lg:p-5'}`}
        aria-label="Sidebar"
      >
        {/* Header section of Sidebar (Logo, App Name, Toggle Buttons) */}
        <div className={`flex items-center mb-8 ${isDesktopCollapsed ? 'lg:justify-center' : 'lg:justify-between'}`}>
          {/* Logo and App Name - visible when not collapsed or on mobile */}
          <div className={`flex items-center ${isDesktopCollapsed ? 'lg:hidden' : ''}`}>
            <img src="/vite.svg" alt="Logo" className="h-10 w-10 mr-3 bg-white rounded-full p-1"/>
            <span className="text-2xl font-semibold text-orange-500 dark:text-orange-500">EsportsPro</span>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={toggleMobileSidebar}
            className={`p-2 rounded-md hover:bg-purple-700 dark:hover:bg-gray-700 lg:hidden ${isDesktopCollapsed ? 'hidden' : ''} ${!isMobileSidebarOpen ? 'hidden' : ''}`}
            aria-label="Close sidebar"
          >
            <FiMenu size={24} /> {/* Using FiMenu, could be FiX */}
          </button>
          {/* Desktop Collapse/Expand Button */}
          <button
            onClick={toggleDesktopCollapse}
            className={`hidden lg:block p-2 rounded-md hover:bg-purple-700 dark:hover:bg-gray-700`}
            aria-label={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isDesktopCollapsed ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name} title={isDesktopCollapsed ? link.name : ''}>
                <NavLink
                  to={link.to}
                  end={link.name === 'Dashboard'} // `end` prop for NavLink to match exact paths for parent routes
                  className={({ isActive }) =>
                    `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass} ${isDesktopCollapsed ? 'lg:justify-center' : ''}`
                  }
                  onClick={() => { if (isMobileSidebarOpen && window.innerWidth < 1024) toggleMobileSidebar(); }}
                >
                  <link.icon size={isDesktopCollapsed ? 24 : 20} />
                  <span className={`${isDesktopCollapsed ? 'lg:hidden' : 'lg:inline'}`}>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t border-purple-700 dark:border-gray-700">
          <p className="text-xs text-center text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} EsportsPro
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
