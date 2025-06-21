import React from 'react';
import SummaryCard from '../../components/dashboard/SummaryCard';
import LiveMatchStatusBar from '../../components/dashboard/LiveMatchStatusBar'; // Import LiveMatchStatusBar
import { FiUsers, FiUserCheck, FiPlayCircle, FiShield, FiPlusSquare, FiCalendar, FiFileText } from 'react-icons/fi'; // Example Icons

const AdminDashboard = () => {
  const adminSummaryData = [
    { title: 'Total Teams', value: '32', icon: FiUsers, trend: 'up', details: '+2 this month' },
    { title: 'Active Players', value: '128', icon: FiUserCheck, trend: 'up', details: '+10 this month' },
    { title: 'Ongoing Matches', value: '5', icon: FiPlayCircle, trend: 'neutral', details: 'Live now' },
    { title: 'System Health', value: 'Good', icon: FiShield, valueColor: 'text-green-500 dark:text-green-400', details: 'All systems operational' }
  ];

  return (
    <div className="p-6"> {/* Removed bg and shadow, letting DashboardLayout handle it if needed or set here */}
      <h1 className="text-3xl font-bold text-purple-900 dark:text-orange-500 mb-8">Admin Dashboard</h1>

      {/* Live Match Status Bar */}
      <LiveMatchStatusBar />
      {/* Later, pass actual matchInfo: <LiveMatchStatusBar matchInfo={...} /> */}

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminSummaryData.map(data => (
          <SummaryCard
            key={data.title}
            title={data.title}
            value={data.value}
            icon={data.icon}
            trend={data.trend}
            details={data.details}
            valueColor={data.valueColor} // Pass custom value color if specified
          />
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
            <FiPlusSquare className="mr-2" /> Add New Team
          </button>
          <button className="flex items-center bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
            <FiCalendar className="mr-2" /> Schedule Match
          </button>
          <button className="flex items-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
            <FiFileText className="mr-2" /> Generate System Report
          </button>
        </div>
      </div>

      {/* Placeholder for Live Match Status Bar - to be implemented next */}
      {/* Placeholder for Recent Performance Graph - to be implemented later */}

    </div>
  );
};

export default AdminDashboard;
