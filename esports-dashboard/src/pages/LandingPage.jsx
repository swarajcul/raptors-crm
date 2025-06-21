import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiLogIn, FiUsers } from 'react-icons/fi'; // Using FiUsers for Discord as an example

const LandingPage = () => {
  const { login, loading, currentUser } = useAuth();

  const handleLogin = async () => {
    if (!loading) {
      try {
        await login();
        // Navigation to dashboard will be handled by a router listening to currentUser state
        console.log("Login successful, currentUser:", currentUser);
      } catch (error) {
        console.error("LandingPage: Login failed", error);
        // Display error to user if needed
      }
    }
  };

  // If user is already logged in, this page might redirect or show a different state.
  // For now, it will always show the login options. Routing will handle redirection.
  // if (currentUser) {
  //   // Optionally, redirect or show a "logged in" message
  //   // For now, router will handle taking user away from landing if logged in
  // }

  return (
    <div className="min-h-screen bg-purple-950 text-white flex flex-col items-center justify-center p-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-orange-500 mb-4">Esports Pro Suite</h1>
        <p className="text-xl text-slate-300">Your all-in-one platform for team management and performance tracking.</p>
      </header>

      <main className="flex flex-col items-center gap-6 w-full max-w-xs">
        <button
          onClick={handleLogin}
          disabled={loading || currentUser}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiLogIn size={20} />
          <span>{loading ? 'Signing in...' : currentUser ? 'Signed In' : 'Sign in with Google'}</span>
        </button>

        <a
          href="https://discord.gg/yourserverlink" // Replace with actual Discord link
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          <FiUsers size={20} /> {/* Using FiUsers, consider a Discord specific icon if available */}
          <span>Join our Discord</span>
        </a>
      </main>

      <footer className="absolute bottom-8 text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Esports Pro Suite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
