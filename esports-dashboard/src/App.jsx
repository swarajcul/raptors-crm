import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider
import AppRouter from './router/AppRouter';
import './index.css'; // Ensure Tailwind is loaded

function App() {
  return (
    <ThemeProvider> {/* ThemeProvider wraps everything */}
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
