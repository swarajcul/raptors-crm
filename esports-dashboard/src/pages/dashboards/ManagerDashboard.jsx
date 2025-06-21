import React from 'react';
import SummaryCard from '../../components/dashboard/SummaryCard';
import LiveMatchStatusBar from '../../components/dashboard/LiveMatchStatusBar'; // Import
import { FiUsers, FiCalendar, FiTrendingUp, FiClipboard, FiEye, FiClock } from 'react-icons/fi'; // Example Icons

const ManagerDashboard = () => {
  const managerSummaryData = [
    { title: "My Team's Players", value: '12', icon: FiUsers, trend: 'up', details: '+1 new recruit' },
    { title: 'Upcoming Matches', value: '3', icon: FiCalendar, trend: 'neutral', details: 'Next: Sat 2PM' },
    { title: 'Team Win Rate', value: '72%', icon: FiTrendingUp, trend: 'up', details: 'Last 10 matches' },
    { title: 'Pending Tasks', value: '4', icon: FiClipboard, trend: 'down', details: '2 overdue' } // 'down' might mean tasks are decreasing or attention needed
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-900 dark:text-orange-500 mb-8">Manager Dashboard</h1>

      {/* Live Match Status Bar */}
      <LiveMatchStatusBar />

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {managerSummaryData.map(data => (
          <SummaryCard
            key={data.title}
            title={data.title}
            value={data.value}
            icon={data.icon}
            trend={data.trend}
            details={data.details}
          />
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
            <FiEye className="mr-2" /> View Team Roster
          </button>
          <button className="flex items-center bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
            <FiClock className="mr-2" /> Schedule Practice
          </button>
          {/* Add more manager-specific actions here */}
        </div>
      </div>

      {/* Further sections for this role will be added later */}
    </div>
  );
};

export default ManagerDashboard;
