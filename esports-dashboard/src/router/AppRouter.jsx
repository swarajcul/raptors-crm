import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import LandingPage from '../pages/LandingPage';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout'; // Import DashboardLayout
import ProtectedRoute from './ProtectedRoute';

// Import Role-Specific Dashboard Pages
import AdminDashboardPage from '../pages/dashboards/AdminDashboard';
import ManagerDashboardPage from '../pages/dashboards/ManagerDashboard';
import PlayerDashboardPage from '../pages/dashboards/PlayerDashboard';
import TeamManagementPage from '../pages/teams/TeamManagementPage';
import MatchSchedulingPage from '../pages/matches/MatchSchedulingPage';
import StatisticsPage from '../pages/stats/StatisticsPage'; // Import StatisticsPage

// Placeholder for a generic dashboard or a loading/error state if role is unknown
const GenericDashboard = () => <div className="p-6 text-gray-700 dark:text-white">Generic Dashboard - Your role is not specifically assigned a unique dashboard view.</div>;


// A simple component to decide which dashboard to show
const DashboardDispatcher = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // This should ideally not be reached if ProtectedRoute is working correctly,
    // but as a fallback:
    return <Navigate to="/login" replace />;
  }

  // Basic role-based routing for dashboard content
  // This will be expanded in Step 5 of the plan.
  switch (currentUser.role) {
    case 'admin':
      return <AdminDashboardPage />;
    case 'manager':
      return <ManagerDashboardPage />;
    case 'player':
      return <PlayerDashboardPage />;
    default:
      // Fallback for unknown roles or if role is not set
      console.warn(`Unknown or missing role: ${currentUser.role || 'Not specified'}`);
      return <GenericDashboard />;
  }
};

const AppRouter = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-950 flex items-center justify-center text-white">
        Initializing Application...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Route: Landing/Login Page */}
        {/* If user is logged in and tries to access /login, redirect to dashboard */}
        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <LandingPage />
              </AuthLayout>
            )
          }
        />

        {/* Protected Routes: Wrap with DashboardLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Child routes of /dashboard will be rendered into DashboardLayout's <Outlet /> */}
          <Route index element={<DashboardDispatcher />} />
          <Route path="teams" element={<TeamManagementPage />} />
          <Route path="matches" element={<MatchSchedulingPage />} />
          <Route path="stats" element={<StatisticsPage />} />
          {/* Example of other nested routes (placeholders for now) */}
          {/* <Route path="reports" element={<div>Reports Page (Placeholder)</div>} /> */}
          {/* <Route path="settings" element={<div>Settings Page (Placeholder)</div>} /> */}
        </Route>

        {/* Default route: Redirect to login or dashboard based on auth state */}
        <Route
          path="*"
          element={currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
