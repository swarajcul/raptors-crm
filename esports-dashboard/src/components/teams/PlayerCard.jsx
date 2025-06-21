import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiShield, FiCrosshair, FiHeart, FiUser } from 'react-icons/fi'; // Example role icons

// Helper to get K/D color
const getKDRatioColor = (kd) => {
  if (kd >= 2.5) return 'text-green-500 dark:text-green-400';
  if (kd >= 1.5) return 'text-yellow-500 dark:text-yellow-400';
  return 'text-red-500 dark:text-red-400';
};

// Helper to get role icon
const getRoleIcon = (role) => {
  switch (role?.toLowerCase()) {
    case 'assaulter': return <FiZap title="Assaulter" className="text-red-500" />;
    case 'sniper': return <FiCrosshair title="Sniper" className="text-blue-500" />;
    case 'support': return <FiHeart title="Support" className="text-green-500" />;
    default: return <FiUser title="Player" className="text-gray-500" />;
  }
};

const PlayerCard = ({ player }) => {
  const { name, avatar, rank, role, specialization, kdRatio, id } = player;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      layout // Enables layout animations when items are added/removed
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-[200px] h-[200px] flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
    >
      {/* Top section: Avatar and Rank */}
      <div className="flex items-start justify-between">
        <div className="relative">
          <img
            src={avatar || 'https://via.placeholder.com/60'}
            alt={name}
            className="w-16 h-16 rounded-full border-2 border-orange-500 dark:border-orange-400 object-cover dark-mode-image-filter"
          />
          {rank && (
            <div className="absolute -bottom-1 -right-1 bg-purple-600 dark:bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center shadow-md">
              <FiStar className="mr-1 text-yellow-400" /> {rank}
            </div>
          )}
        </div>
      </div>

      {/* Middle section: Name, Role, Specialization */}
      <div>
        <h3 className="text-md font-semibold text-gray-800 dark:text-white truncate" title={name}>
          {name || 'Player Name'}
        </h3>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span className="mr-1">{getRoleIcon(role)}</span>
          <span>{role || 'N/A'} - {specialization || 'N/A'}</span>
        </div>
      </div>

      {/* Bottom section: K/D Ratio */}
      <div className="text-right">
        <span className="text-xs text-gray-500 dark:text-gray-400">K/D: </span>
        <span className={`text-lg font-bold ${getKDRatioColor(kdRatio)}`}>
          {kdRatio?.toFixed(1) || 'N/A'}
        </span>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
