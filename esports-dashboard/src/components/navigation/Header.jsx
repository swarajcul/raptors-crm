import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { FiMenu, FiSun, FiMoon, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';

const Header = ({ toggleMobileSidebar }) => { // Changed prop name
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      // Router will handle redirecting to /login
    } catch (error) {
      console.error("Header: Logout failed", error);
    }
  };

  return (
    <header className="bg-purple-800 dark:bg-gray-800 text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: Hamburger menu (for mobile) and App Name/Logo */}
        <div className="flex items-center">
          <button
            onClick={toggleMobileSidebar} // Changed prop name
            className="text-white mr-4 p-2 rounded-md hover:bg-purple-700 dark:hover:bg-gray-700 lg:hidden" // Hidden on large screens
            aria-label="Toggle sidebar"
          >
            <FiMenu size={24} />
          </button>
          <div className="text-xl font-bold text-orange-500 dark:text-orange-500">
            EsportsPro
          </div>
        </div>

        {/* Right side: Theme toggle and User Profile */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-purple-700 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>

          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center p-2 rounded-full hover:bg-purple-700 dark:hover:bg-gray-700"
                aria-label="User menu"
              >
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="User" className="w-8 h-8 rounded-full dark-mode-image-filter" />
                ) : (
                  <FiUser size={24} className="w-8 h-8 rounded-full bg-gray-500 p-1" />
                )}
                <span className="hidden md:inline ml-2 mr-1">{currentUser.displayName || 'User'}</span>
                <FiChevronDown size={16} className={`transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 text-gray-800 dark:text-white"
                  onMouseLeave={() => setProfileDropdownOpen(false)} // Close on mouse leave
                >
                  <div className="px-4 py-2 text-sm">
                    Signed in as <br/>
                    <strong className="truncate">{currentUser.email}</strong>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600"></div>
                  {/* Add more links here e.g., Profile, Settings */}
                  <a
                    href="#" // Replace with actual profile link
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Your Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <FiLogOut className="inline mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
