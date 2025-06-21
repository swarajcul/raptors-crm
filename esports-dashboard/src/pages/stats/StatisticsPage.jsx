import React, { useState, useEffect } from 'react';
import { FiDownload, FiRotateCw } from 'react-icons/fi';
import ExportModal from '../../components/modals/ExportModal';
import { useAuth } from '../../contexts/AuthContext';
import { GenericErrorEmptyState } from '../../components/common/EmptyState'; // Import

// Placeholder components for different chart types
const PlaceholderChart = ({ title, type }) => (
  <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg h-64 flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">({type} placeholder)</p>
    </div>
    <div className="flex-grow flex items-center justify-center">
      <div className="w-full h-3/4 bg-slate-100 dark:bg-gray-600 rounded-md animate-pulse"></div>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 3 }).map((_, idx) => (
      <div key={idx} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg h-64 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
        <div className="h-40 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
      </div>
    ))}
  </div>
);


const StatisticsPage = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const { currentUser } = useAuth();

  const fetchData = () => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      // Simulate API call
      if (Math.random() < 0.1) { // 10% chance of error for demonstration
        setError("Failed to fetch statistics data. Please try again.");
      } else {
        // Fetch data based on activeTab and currentUser.role here
        // For now, just simulate success
      }
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const renderTabContent = () => {
    if (loading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return <GenericErrorEmptyState message={error} onRetryClick={fetchData} />;
    }

    switch (activeTab) {
      case 'overall':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceholderChart title="Overall Win Rate" type="Donut Chart" />
            <PlaceholderChart title="Overall Headshot %" type="Bar Chart" />
            <PlaceholderChart title="Average Survival Time" type="Heatmap" />
            {/* Add more overall stats charts here */}
          </div>
        );
      case 'team':
        return (
          <div>
            {/* Team selection dropdown would go here */}
            <p className="mb-4 text-gray-600 dark:text-gray-300">Select a team to view detailed statistics.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PlaceholderChart title="Team X Win Rate" type="Donut Chart" />
              <PlaceholderChart title="Team X K/D Ratio" type="Radar Chart (vs Avg)" />
              <PlaceholderChart title="Team X Player Performance Trends" type="Line Chart" />
            </div>
          </div>
        );
      case 'player':
        return (
          <div>
            {/* Player selection dropdown/search would go here */}
            <p className="mb-4 text-gray-600 dark:text-gray-300">Select a player to view detailed statistics.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PlaceholderChart title="Player Y Headshot %" type="Bar Chart" />
              <PlaceholderChart title="Player Y Performance Trend" type="Line Chart" />
              <PlaceholderChart title="Player Y Map Proficiency" type="Heatmap" />
            </div>
          </div>
        );
      default:
        return <p>Select a tab to view statistics.</p>;
    }
  };

  const tabs = [
    { id: 'overall', label: 'Overall Stats' },
    { id: 'team', label: 'Team Stats' }, // Admins/Managers might see all teams, Players their own
    { id: 'player', label: 'Player Stats' }, // Admins/Managers see all players, Players their own
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-purple-900 dark:text-orange-500">Statistics Module</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setLoading(true)} // Simulate refresh
            className="flex items-center text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-md shadow transition-colors"
            disabled={loading}
            aria-label="Refresh data"
          >
            <FiRotateCw className={`mr-1.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          {currentUser && (currentUser.role === 'admin' || currentUser.role === 'manager') && (
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-md shadow transition-colors"
            >
              <FiDownload className="mr-1.5" /> Export Data
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-300 dark:border-gray-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>

      {/* Comparative Analysis Section (Placeholder) */}
      {activeTab !== 'overall' && !loading && (
        <div className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Comparative Analysis</h2>
          <PlaceholderChart title={activeTab === 'team' ? "Team vs Team Radar Chart" : "Player Performance vs Average"} type="Radar/Line Chart" />
        </div>
      )}

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        dataTypeToExport="Statistics Data"
      />
    </div>
  );
};

export default StatisticsPage;
