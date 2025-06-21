import React from 'react';
import { FiArrowUpRight, FiArrowDownRight, FiMinus } from 'react-icons/fi'; // Example icons for trends

// Helper to determine trend icon and color
const TrendIndicator = ({ trend }) => {
  if (trend === 'up') {
    return <FiArrowUpRight className="text-green-500" />;
  }
  if (trend === 'down') {
    return <FiArrowDownRight className="text-red-500" />;
  }
  return <FiMinus className="text-gray-400" />; // Neutral or no trend
};

const SummaryCard = ({ title, value, icon, trend, details, cardColor = 'bg-white dark:bg-gray-700', valueColor = 'text-purple-700 dark:text-orange-400' }) => {
  const IconComponent = icon; // If 'icon' is a component type

  return (
    <div className={`${cardColor} p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
        {IconComponent && <IconComponent className="text-orange-500 dark:text-orange-400" size={28} />}
      </div>
      <p className={`text-4xl font-bold ${valueColor} mb-1`}>{value}</p>
      {details && (
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          {trend && <TrendIndicator trend={trend} />}
          <span className="ml-1">{details}</span>
        </div>
      )}
      {/* Subtle glow effect on hover - handled by Tailwind's shadow and transform utilities */}
    </div>
  );
};

export default SummaryCard;
