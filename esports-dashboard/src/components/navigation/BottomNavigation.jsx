import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiBarChart2, FiSettings } from 'react-icons/fi';

const navItems = [
  { path: '/dashboard', icon: FiHome, label: 'Home', exact: true },
  { path: '/dashboard/teams', icon: FiUsers, label: 'Teams' },
  { path: '/dashboard/matches', icon: FiCalendar, label: 'Matches' },
  { path: '/dashboard/stats', icon: FiBarChart2, label: 'Stats' },
  // { path: '/dashboard/settings', icon: FiSettings, label: 'Settings' }, // Can add a 5th item if needed
];

const BottomNavigation = () => {
  const location = useLocation();

  // Determine if any NavLink is active. This is a bit simplistic and might need refinement
  // for nested routes. For example, /dashboard/teams/player-1 should still light up 'Teams'.
  // NavLink's isActive prop handles this better if paths are structured well.

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-purple-900 dark:bg-gray-800 border-t border-purple-700 dark:border-gray-700 lg:hidden">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.exact} // For exact matching on parent route like /dashboard
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full px-2 py-1 rounded-t-sm transition-colors duration-200
               ${isActive
                 ? 'text-orange-500 dark:text-orange-400 border-t-2 border-orange-500 dark:border-orange-400'
                 : 'text-gray-400 dark:text-gray-500 hover:text-orange-400 dark:hover:text-orange-300'
               }`
            }
            aria-label={item.label}
          >
            <item.icon size={22} />
            <span className="text-xs mt-0.5">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
