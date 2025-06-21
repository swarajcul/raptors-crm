import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Optional: Show a loading spinner or a blank page while auth state is being determined
    // This prevents a flash of the login page if the user is already authenticated.
    return (
      <div className="min-h-screen bg-purple-950 flex items-center justify-center text-white">
        Loading authentication status...
      </div>
    );
  }

  if (!currentUser) {
    // User not authenticated, redirect to login page
    // Pass the current location to redirect back after login (optional)
    // For simplicity, just redirecting to /login for now.
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the child components (or Outlet for nested routes)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
