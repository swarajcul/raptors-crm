import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Sidebar from '../components/navigation/Sidebar';
import BottomNavigation from '../components/navigation/BottomNavigation';
import Breadcrumbs from '../components/navigation/Breadcrumbs'; // Import Breadcrumbs

const DashboardLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header toggleMobileSidebar={toggleMobileSidebar} /> {/* Changed prop name */}

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-gray-900">
          <div className="p-6"> {/* Added padding wrapper for content */}
            <Breadcrumbs />
            {/*
              The Outlet component from react-router-dom will render the matched child route component here.
              If children are passed directly, it will render those (useful if not using nested routes for content).
            */}
            {children || <Outlet />}
          </div>
        </main>

        {/* Bottom Navigation for Mobile */}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default DashboardLayout;
