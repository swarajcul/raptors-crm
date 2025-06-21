import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-purple-950 dark:bg-purple-950 text-white">
      {/*
        AuthLayout: Currently a simple wrapper.
        It ensures a consistent background for auth pages like Login/Register.
        Could include a shared minimal header or footer for these pages if needed in the future.
      */}
      {children}
    </div>
  );
};

export default AuthLayout;
