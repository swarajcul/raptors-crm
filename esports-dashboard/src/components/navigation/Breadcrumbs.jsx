import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Helper to capitalize first letter
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // If on the base dashboard, don't show breadcrumbs beyond home, or show just "Dashboard"
  if (location.pathname === '/dashboard' && pathnames.length <= 1) {
     return (
      <nav aria-label="breadcrumb" className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        <ol className="flex items-center space-x-1.5">
          <li>
            <Link to="/dashboard" className="flex items-center hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              <FiHome className="mr-1.5" size={16}/> Dashboard
            </Link>
          </li>
        </ol>
      </nav>
    );
  }

  // Hide breadcrumbs on the root /login or other non-dashboard root paths
  if (!pathnames.includes('dashboard') && pathnames.length > 0) {
      return null;
  }


  return (
    <nav aria-label="breadcrumb" className="mb-6 text-sm text-gray-600 dark:text-gray-400">
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li>
          <Link to="/dashboard" className="flex items-center hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            <FiHome className="mr-1.5" size={16}/> Dashboard
          </Link>
        </li>
        {pathnames.map((name, index) => {
          // We only care about paths after 'dashboard' for breadcrumbs
          if (name === 'dashboard' && index === 0 && pathnames.length > 1) {
            return null; // Skip "Dashboard" if it's not the last item (already handled by Home)
          }
          if (name === 'dashboard' && index === 0 && pathnames.length === 1) {
             // This case is handled above, but as a safeguard
            return null;
          }


          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          // Skip 'dashboard' segment if it's not the only segment
          if (name.toLowerCase() === 'dashboard') return null;

          return (
            <React.Fragment key={name}>
              <li>
                <FiChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
              </li>
              <li>
                {isLast ? (
                  <span className="font-medium text-orange-600 dark:text-orange-500">{capitalize(name)}</span>
                ) : (
                  <Link to={routeTo} className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    {capitalize(name)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
