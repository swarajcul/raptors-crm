import React, { useState, useMemo, useEffect } from 'react';
import PlayerCard from '../../components/teams/PlayerCard';
import { AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiUploadCloud, FiUserPlus, FiMessageSquare } from 'react-icons/fi';
import { NoTeamsEmptyState, SearchNoResultsEmptyState } from '../../components/common/EmptyState'; // Import EmptyState components

// Mock Data - Replace with API call later
// To test NoTeamsEmptyState, set this to an empty array:
// const mockPlayersData = [];
const mockPlayersData = Array.from({ length: 25 }, (_, i) => ({
  id: `player-${i + 1}`,
  name: `Player ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) || ''} Name ${i + 1}`,
  avatar: `https://i.pravatar.cc/80?u=player${i + 1}`, // Unique placeholder avatars
  rank: (i % 5) + 1, // 1-5 stars
  role: ['Assaulter', 'Sniper', 'Support'][i % 3],
  specialization: ['Entry Fragger', 'IGL', 'AWPer', 'Healer', 'Scout'][i % 5],
  kdRatio: parseFloat((Math.random() * 3.5 + 0.5).toFixed(1)), // Random K/D between 0.5 and 4.0
}));

const ITEMS_PER_PAGE = 10;

const TeamManagementPage = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  // K/D Ratio slider state would go here - simplified for now
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlayers, setSelectedPlayers] = useState(new Set());

  // Simulate fetching data
  useEffect(() => {
    setPlayers(mockPlayersData);
  }, []);

  const filteredPlayers = useMemo(() => {
    return players
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => roleFilter === 'All' || p.role === roleFilter);
    // Add K/D filter logic here later
  }, [players, searchTerm, roleFilter]);

  const paginatedPlayers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredPlayers.slice(start, end);
  }, [filteredPlayers, currentPage]);

  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayers(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(playerId)) {
        newSelected.delete(playerId);
      } else {
        newSelected.add(playerId);
      }
      return newSelected;
    });
  };

  const handleSelectAllOnPage = () => {
    const newSelected = new Set(selectedPlayers);
    // Check if all players currently visible on the page are already selected
    const allCurrentlyOnPageSelected = paginatedPlayers.length > 0 && paginatedPlayers.every(p => newSelected.has(p.id));

    paginatedPlayers.forEach(p => {
      if (allCurrentlyOnPageSelected) {
        // If all are selected, deselect them
        newSelected.delete(p.id);
      } else {
        // Otherwise, select them
        newSelected.add(p.id);
      }
    });
    setSelectedPlayers(newSelected);
  };


  return (
    <div className="p-6 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-purple-900 dark:text-orange-500 mb-8">Team Management</h1>

      {/* Search and Filter Bar */}
      <div className="sticky top-[60px] z-20 bg-slate-50 dark:bg-gray-900 py-4 mb-6 rounded-lg shadow"> {/* Adjust top based on header height */}
        <div className="flex flex-wrap items-center gap-4 px-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search players..."
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20}/>
          </div>
          <div className="relative">
            <select
              className="p-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 outline-none appearance-none transition-shadow"
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1);}}
            >
              <option value="All">All Roles</option>
              <option value="Assaulter">Assaulter</option>
              <option value="Sniper">Sniper</option>
              <option value="Support">Support</option>
            </select>
            <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={18}/>
          </div>
          {/* K/D Ratio Slider would go here */}
        </div>
      </div>

      {/* Bulk Actions Toolbar - Visible if players are selected */}
      {selectedPlayers.size > 0 && (
        <div className="mb-6 p-4 bg-purple-100 dark:bg-purple-900/50 rounded-lg shadow-md flex flex-wrap items-center gap-3">
          <span className="font-semibold text-purple-800 dark:text-purple-200">{selectedPlayers.size} player(s) selected</span>
          <button className="flex items-center text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-md shadow transition-colors">
            <FiUploadCloud className="mr-1.5" /> Export Selected
          </button>
          <button className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md shadow transition-colors">
            <FiUserPlus className="mr-1.5" /> Assign to Match
          </button>
          <button className="flex items-center text-sm bg-teal-500 hover:bg-teal-600 text-white py-2 px-3 rounded-md shadow transition-colors">
            <FiMessageSquare className="mr-1.5" /> Send Notification
          </button>
          <button
            onClick={() => setSelectedPlayers(new Set())}
            className="ml-auto text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Clear Selection
          </button>
        </div>
      )}
       <div className="mb-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-orange-600 dark:text-orange-500 border-gray-300 dark:border-gray-600 rounded focus:ring-orange-500 bg-white dark:bg-gray-700"
              onChange={handleSelectAllOnPage}
              checked={paginatedPlayers.length > 0 && paginatedPlayers.every(p => selectedPlayers.has(p.id))}
              disabled={paginatedPlayers.length === 0}
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Select all on page ({paginatedPlayers.length})</span>
          </label>
        </div>


      {/* Player Cards Grid */}
      {players.length === 0 ? ( // Check if there are any players in the source data at all
        <NoTeamsEmptyState onCreateTeamClick={() => alert('Redirect to create team page (not implemented)')} />
      ) : paginatedPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          <AnimatePresence>
            {paginatedPlayers.map(player => (
              <div key={player.id} onClick={() => handlePlayerSelect(player.id)} className={`rounded-xl transition-all duration-200 ${selectedPlayers.has(player.id) ? 'ring-2 ring-orange-500 dark:ring-orange-400 scale-105 shadow-2xl' : 'ring-0'}`}>
                <PlayerCard player={player} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        // This is the "no results from filter/search" state
        <SearchNoResultsEmptyState
          searchTerm={searchTerm}
          onClearFiltersClick={() => { setSearchTerm(''); setRoleFilter('All'); setCurrentPage(1); }}
        />
      )}

      {/* Pagination Controls - only show if there are players and more than one page */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-3">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-purple-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <FiChevronLeft size={24} />
          </button>
          <span className="text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-purple-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamManagementPage;
