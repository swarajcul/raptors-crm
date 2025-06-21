import React from 'react';

const LiveMatchStatusBar = ({ matchInfo }) => {
  // Default match info if none is provided
  const currentMatch = matchInfo || {
    title: 'No live matches currently.',
    status: 'Standby',
    score: null,
    isLive: false,
  };

  return (
    <div className={`w-full p-3 rounded-lg shadow-md mb-8
      ${currentMatch.isLive
        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white animate-pulse-live'
        : 'bg-purple-800 dark:bg-gray-700 text-gray-200 dark:text-gray-300'}
    `}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          {currentMatch.isLive && (
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
            </span>
          )}
          <span className="font-semibold">{currentMatch.title}</span>
        </div>
        <div className="flex items-center space-x-4">
          {currentMatch.score && <span className="font-mono">{currentMatch.score}</span>}
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium
              ${currentMatch.isLive ? 'bg-red-100 text-red-700' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100'}`}
          >
            {currentMatch.status}
          </span>
        </div>
      </div>
      <style jsx global>{`
        .animate-pulse-live {
          animation: pulse-live-animation 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-live-animation {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .85;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveMatchStatusBar;
