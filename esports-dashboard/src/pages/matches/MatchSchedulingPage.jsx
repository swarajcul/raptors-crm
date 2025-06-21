import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FiPlus, FiSave, FiSend, FiAlertTriangle } from 'react-icons/fi';
import { NoMatchesEmptyState } from '../../components/common/EmptyState'; // Import

// Setup the localizer by providing the moment Object
const localizer = momentLocalizer(moment);

// Mock data - replace with API calls and state management
const mockTournaments = [
  { id: 't1', name: 'Summer Skirmish Series' },
  { id: 't2', name: 'Winter Warfare League' },
  { id: 't3', name: 'Pro Invitational Cup' },
];

const mockTeams = Array.from({ length: 10 }, (_, i) => ({ id: `team${i+1}`, name: `Team Alpha ${i+1}` }));
const mockMaps = ['Erangel', 'Miramar', 'Sanhok', 'Vikendi', 'Karakin'];

// Helper to generate match ID
const generateMatchId = (date, time, mapAbbr) => {
  const dateStr = moment(date).format('YYYYMMDD');
  const timeStr = time.replace(':', '');
  return `BGMI-${dateStr}-${timeStr}-${mapAbbr.toUpperCase()}`;
};

const MatchSchedulingPage = () => {
  const [events, setEvents] = useState([
    // Example event
    {
      id: 'evt1',
      title: 'Team A vs Team B (Erangel)',
      start: moment().add(1, 'day').set({ hour: 14, minute: 0 }).toDate(),
      end: moment().add(1, 'day').set({ hour: 16, minute: 0 }).toDate(),
      tournament: 'Summer Skirmish Series',
      teams: ['Team Alpha 1', 'Team Alpha 2'],
      map: 'Erangel',
      status: 'Published' // 'Draft' or 'Published'
    }
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [tournament, setTournament] = useState('');
  const [matchDate, setMatchDate] = useState(moment().format('YYYY-MM-DD'));
  const [matchTime, setMatchTime] = useState('14:00');
  const [selectedTeams, setSelectedTeams] = useState([]); // Array of team names/IDs
  const [selectedMap, setSelectedMap] = useState('');
  const [isConflict, setIsConflict] = useState(false); // Placeholder for conflict detection

  // Derived state for form: combine date and time for start/end
  const matchStartDateTime = useMemo(() => {
    if (!matchDate || !matchTime) return null;
    return moment(`${matchDate} ${matchTime}`).toDate();
  }, [matchDate, matchTime]);

  // Assume matches are 2 hours long for simplicity
  const matchEndDateTime = useMemo(() => {
    if (!matchStartDateTime) return null;
    return moment(matchStartDateTime).add(2, 'hours').toDate();
  }, [matchStartDateTime]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedEvent(null); // Clear any selected event
    setMatchDate(moment(slotInfo.start).format('YYYY-MM-DD'));
    setMatchTime(moment(slotInfo.start).format('HH:mm'));
    setTournament('');
    setSelectedTeams([]);
    setSelectedMap('');
    setIsConflict(false);
    setShowForm(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setMatchDate(moment(event.start).format('YYYY-MM-DD'));
    setMatchTime(moment(event.start).format('HH:mm'));
    setTournament(event.tournament || '');
    setSelectedTeams(event.teams || []);
    setSelectedMap(event.map || '');
    setIsConflict(false); // Reset conflict on selecting existing event
    setShowForm(true);
  };

  const resetForm = () => {
    setSelectedEvent(null);
    setMatchDate(moment().format('YYYY-MM-DD'));
    setMatchTime('14:00');
    setTournament('');
    setSelectedTeams([]);
    setSelectedMap('');
    setIsConflict(false);
    setShowForm(false);
  }

  const handleSubmit = (status) => { // status: 'Draft' or 'Published'
    if (!matchStartDateTime || !matchEndDateTime || !selectedMap || selectedTeams.length < 2 || !tournament) {
      alert('Please fill all required fields: Tournament, Date, Time, at least 2 Teams, and Map.');
      return;
    }

    // Basic conflict detection placeholder
    const newEventTiming = { start: matchStartDateTime, end: matchEndDateTime };
    const hasConflict = events.some(existingEvent =>
      existingEvent.id !== selectedEvent?.id && // don't check against itself if editing
      moment(newEventTiming.start).isBefore(existingEvent.end) &&
      moment(newEventTiming.end).isAfter(existingEvent.start)
    );

    if (hasConflict) {
      setIsConflict(true);
      alert('Conflict detected! This match overlaps with an existing match.');
      // In a real app, you might highlight conflicting events on the calendar.
      return;
    }
    setIsConflict(false);

    const mapAbbr = selectedMap.substring(0, 3);
    const matchId = selectedEvent?.id || generateMatchId(matchDate, matchTime, mapAbbr);

    const newEvent = {
      id: matchId,
      title: `${selectedTeams.join(' vs ')} (${selectedMap}) - ${tournament}`,
      start: matchStartDateTime,
      end: matchEndDateTime,
      tournament,
      teams: selectedTeams,
      map: selectedMap,
      status,
    };

    if (selectedEvent) { // Editing existing event
      setEvents(events.map(ev => ev.id === selectedEvent.id ? newEvent : ev));
    } else { // Creating new event
      setEvents([...events, newEvent]);
    }
    resetForm();
  };

  // Custom event styling
  const eventStyleGetter = (event) => {
    // Colors from our theme (approximations, or use actual hex if theme is finalized)
    const publishedColor = '#ff6600'; // orange-600
    const draftColor = '#3c005a'; // purple-800 (using a darker purple for drafts)

    let newStyle = {
      backgroundColor: event.status === 'Published' ? publishedColor : draftColor,
      color: 'white',
      borderRadius: '5px',
      border: 'none',
      opacity: 0.9,
    };
    if (isConflict && selectedEvent && event.id === selectedEvent.id) {
       newStyle.backgroundColor = 'red'; // Highlight if this is the event causing conflict in form
    }
    return { style: newStyle };
  };


  return (
    <div className="p-6 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-900 dark:text-orange-500">Match Scheduler</h1>
        <button
          onClick={() => { setSelectedEvent(null); resetForm(); setShowForm(true); }}
          className="flex items-center bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
        >
          <FiPlus className="mr-2"/> Schedule New Match
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar View (Left Panel on Desktop, Top on Mobile) */}
        <div className={`lg:flex-1 ${showForm && 'hidden lg:block'}`}>
          {events.length === 0 && !showForm ? ( // Show empty state if no events and form is not taking over mobile view
            <NoMatchesEmptyState
              onScheduleMatchClick={() => { setSelectedEvent(null); resetForm(); setShowForm(true); }}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl h-[600px]">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                className="rbc-calendar text-sm text-gray-700 dark:text-gray-200"
              />
            </div>
          )}
        </div>

        {/* Form (Right Panel on Desktop, Bottom on Mobile or shown exclusively) */}
        {showForm && (
          <div className="lg:w-[400px] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-purple-800 dark:text-orange-400 border-b pb-3">
              {selectedEvent ? 'Edit Match' : 'Schedule New Match'}
            </h2>
            {isConflict && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 rounded-md text-red-700 dark:text-red-300 flex items-center">
                <FiAlertTriangle className="mr-2" /> Conflict detected with an existing match!
              </div>
            )}
            <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
              <div className="mb-4">
                <label htmlFor="tournament" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Tournament</label>
                <select id="tournament" value={tournament} onChange={e => setTournament(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none">
                  <option value="">Select Tournament</option>
                  {mockTournaments.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="matchDate" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Date</label>
                  <input type="date" id="matchDate" value={matchDate} onChange={e => setMatchDate(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"/>
                </div>
                <div>
                  <label htmlFor="matchTime" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Time</label>
                  <input type="time" id="matchTime" value={matchTime} onChange={e => setMatchTime(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"/>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Teams (Select 2 or more)</label>
                {/* Basic multi-select, ideally a searchable multi-select component */}
                <select
                  multiple
                  value={selectedTeams}
                  onChange={e => setSelectedTeams(Array.from(e.target.selectedOptions, option => option.value))}
                  className="w-full h-32 p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  {mockTeams.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple.</p>
              </div>
              <div className="mb-6">
                <label htmlFor="map" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Map</label>
                <select id="map" value={selectedMap} onChange={e => setSelectedMap(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none">
                  <option value="">Select Map</option>
                  {mockMaps.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                {/* Map thumbnails could be added here later */}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleSubmit('Draft')}
                  className="flex-1 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow hover:shadow-md transition duration-200"
                >
                  <FiSave className="mr-2"/> Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit('Published')}
                  className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow hover:shadow-md transition duration-200"
                >
                  <FiSend className="mr-2"/> Publish Match
                </button>
              </div>
               <button
                type="button"
                onClick={resetForm}
                className="w-full mt-4 text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Cancel / Close Form
              </button>
            </form>
          </div>
        )}
      </div>
       {/* Add Tailwind JIT style for rbc calendar */}
      <style jsx global>{`
        .rbc-calendar {
          --rbc-accent-color: theme('colors.orange.600');
          --rbc-background-color: theme('colors.white');
          --rbc-accent-color: theme('colors.orange.600'); /* Accent for things like "more" links, current time indicator line */
          --rbc-background-color: theme('colors.white');
          --rbc-text-color: theme('colors.gray.700');
          --rbc-off-range-bg: theme('colors.slate.50'); /* Lighter off-range */
          --rbc-today-highlight-bg: theme('colors.orange.100');
          --rbc-border-color: theme('colors.gray.300');
        }
        .dark .rbc-calendar {
          --rbc-accent-color: theme('colors.orange.500');
          --rbc-background-color: theme('colors.gray.800');
          --rbc-text-color: theme('colors.gray.200');
          --rbc-off-range-bg: theme('colors.gray.850'); /* Slightly different from main bg */
          --rbc-today-highlight-bg: rgba(255, 102, 0, 0.15); /* orange-600 at 15% opacity */
          --rbc-border-color: theme('colors.gray.700');
        }
        .rbc-event {
          padding: 2px 5px;
          font-size: 0.8em;
        }
        .rbc-toolbar button {
          background-color: transparent;
          color: theme('colors.purple.700');
          border: 1px solid theme('colors.purple.700');
          padding: 0.3rem 0.7rem;
          border-radius: 0.375rem; /* rounded-md */
          transition: background-color 0.2s;
        }
        .rbc-toolbar button:hover:not(:disabled) {
          background-color: theme('colors.purple.100');
        }
        .dark .rbc-toolbar button {
          color: theme('colors.orange.500');
          border-color: theme('colors.orange.500');
        }
        .dark .rbc-toolbar button:hover:not(:disabled) {
          background-color: theme('colors.gray.700');
        }
        .rbc-toolbar button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .rbc-toolbar .rbc-toolbar-label {
          font-size: 1.25em;
          font-weight: 600;
          color: theme('colors.purple.800');
        }
        .dark .rbc-toolbar .rbc-toolbar-label {
          color: theme('colors.orange.400');
        }
        .rbc-active { /* For selected view button e.g. Month/Week/Day */
            background-color: theme('colors.purple.700') !important;
            color: white !important;
            border-color: theme('colors.purple.700') !important;
        }
        .dark .rbc-active {
            background-color: theme('colors.orange.600') !important;
            color: white !important;
            border-color: theme('colors.orange.600') !important;
        }

        /* Ensure calendar height is respected */
        .rbc-calendar .rbc-month-view, .rbc-calendar .rbc-time-grid-container {
            height: calc(100% - 3em); /* Adjust based on toolbar height */
        }
      `}</style>
    </div>
  );
};

export default MatchSchedulingPage;
