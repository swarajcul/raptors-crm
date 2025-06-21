import React from 'react';
import SummaryCard from '../../components/dashboard/SummaryCard';
import LiveMatchStatusBar from '../../components/dashboard/LiveMatchStatusBar'; // Import
import { FiCalendar, FiZap, FiBarChart2, FiBell, FiLink } from 'react-icons/fi'; // Example Icons

const PlayerDashboard = () => {
  const playerSummaryData = [
    { title: 'My Upcoming Matches', value: '2', icon: FiCalendar, details: 'Next: Tomorrow 5PM' },
    { title: 'My Win Rate', value: '68%', icon: FiZap, trend: 'up', details: 'Last 5 matches' },
    { title: 'Recent Performance', value: 'View', icon: FiBarChart2, details: 'K/D: 2.1, Avg. Survival: 18m' }, // 'View' could be a link or trigger modal
    { title: 'Notifications', value: '3', icon: FiBell, trend: 'neutral', details: 'New team announcement' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-900 dark:text-orange-500 mb-8">Player Dashboard</h1>

      {/* Live Match Status Bar */}
      <LiveMatchStatusBar />

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {playerSummaryData.map(data => (
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

      {/* Quick Actions / Links Section */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
            <FiBarChart2 className="mr-2" /> View My Detailed Stats
          </button>
          <button className="flex items-center bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
            <FiLink className="mr-2" /> Training Resources
          </button>
          {/* Add more player-specific actions here */}
        </div>
      </div>

      {/* Further sections for this role will be added later */}
    </div>
  );
};

export default PlayerDashboard;
