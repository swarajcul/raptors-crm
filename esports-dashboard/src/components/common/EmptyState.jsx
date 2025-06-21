import React from 'react';
import { FiInbox, FiAlertTriangle, FiSearch } from 'react-icons/fi'; // Default icons

const EmptyState = ({
  icon, // React-icon component
  title = "No Data Available",
  message = "There's nothing to show here right now. Try adjusting your filters or creating new items.",
  actionButtonText,
  onActionButtonClick,
  illustration, // Path to an SVG or an SVG component
}) => {
  const IconComponent = icon || FiInbox;

  return (
    <div className="text-center p-8 md:p-12 my-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-lg mx-auto">
      {illustration ? (
        <div className="mb-6 text-gray-400 dark:text-gray-500 w-32 h-32 mx-auto">
          {/* If illustration is a component: <illustration /> */}
          {/* If illustration is a path: <img src={illustration} alt="" className="w-full h-full object-contain"/> */}
          {/* For now, using icon as fallback if illustration is complex */}
          <IconComponent size={80} className="mx-auto opacity-50" />
        </div>
      ) : (
        <IconComponent size={56} className="mx-auto text-purple-400 dark:text-orange-600 opacity-70 mb-5" />
      )}

      <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 px-4">
        {message}
      </p>

      {actionButtonText && onActionButtonClick && (
        <button
          onClick={onActionButtonClick}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        >
          {actionButtonText}
        </button>
      )}
    </div>
  );
};

// Specific instances of EmptyState (can be defined here or imported where needed)

export const NoTeamsEmptyState = ({ onCreateTeamClick }) => (
  <EmptyState
    icon={FiUsers} // Placeholder, ideally a custom SVG illustration
    title="No Teams Created Yet"
    message="It looks like your esports empire is just beginning! Create your first team to start managing rosters, schedules, and performance."
    actionButtonText="Create First Team"
    onActionButtonClick={onCreateTeamClick}
    // illustration={<YourCustomTeamIllustrationSVG />}
  />
);

export const NoMatchesEmptyState = ({ onScheduleMatchClick }) => (
  <EmptyState
    icon={FiCalendar} // Placeholder
    title="No Matches Scheduled"
    message="The arena is quiet... for now. Schedule your first match to get the action started!"
    actionButtonText="Schedule a Match"
    onActionButtonClick={onScheduleMatchClick}
    // illustration={<YourCustomCalendarIllustrationSVG />}
  />
);

export const SearchNoResultsEmptyState = ({ onClearFiltersClick, searchTerm }) => (
  <EmptyState
    icon={FiSearch}
    title={`No Results for "${searchTerm || 'your search'}"`}
    message="We couldn't find anything matching your criteria. Try adjusting your search terms or filters."
    actionButtonText="Clear Filters & Search"
    onActionButtonClick={onClearFiltersClick}
    // illustration={<YourCustomSearchIllustrationSVG />}
  />
);

export const GenericErrorEmptyState = ({ onRetryClick, message }) => (
  <EmptyState
    icon={FiAlertTriangle}
    title="Oops! Something Went Wrong"
    message={message || "We encountered an unexpected issue. Please try again, or if the problem persists, contact support."}
    actionButtonText={onRetryClick ? "Try Again" : undefined}
    onActionButtonClick={onRetryClick}
    // illustration={<YourCustomErrorIllustrationSVG />}
  />
);

// Example for Export History (if it were a feature)
export const ExportHistoryEmptyState = ({ onExportClick }) => (
  <EmptyState
    icon={FiFileText}
    title="No Export History"
    message="You haven't exported any reports yet. Generate a report from the statistics or team sections to see it here."
    actionButtonText={onExportClick ? "Go to Statistics" : undefined} // Example CTA
    onActionButtonClick={onExportClick}
    // illustration={<YourCustomDocumentStackSVG />}
  />
);


export default EmptyState;
