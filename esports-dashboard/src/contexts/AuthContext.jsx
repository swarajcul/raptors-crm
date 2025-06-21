import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockSignInWithGoogle, mockSignOut, mockOnAuthStateChanged } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start true to mimic auth state being checked

  const login = async () => {
    setLoading(true);
    try {
      const user = await mockSignInWithGoogle();
      setCurrentUser(user);
      // In a real app, you might store the user/token in localStorage here
    } catch (error) {
      console.error("Login failed", error);
      // Handle login error (e.g., show a message to the user)
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await mockSignOut();
      setCurrentUser(null);
      // In a real app, clear stored user/token from localStorage here
    } catch (error) {
      console.error("Logout failed", error);
      // Handle logout error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Subscribe to auth state changes
    // This simulates checking if a user is already logged in (e.g., from a previous session)
    setLoading(true);
    const unsubscribe = mockOnAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
