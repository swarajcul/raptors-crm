// Mock Authentication Service

export const mockSignInWithGoogle = async () => {
  console.log("Attempting mock Google Sign-In from auth.js...");
  return new Promise(resolve => {
    setTimeout(() => {
      const mockUser = {
        uid: 'mockUid123',
        email: 'mockuser@example.com',
        displayName: 'Mock User',
        photoURL: 'https://via.placeholder.com/150', // A generic placeholder image
        role: 'player', // Default role: 'admin', 'manager', 'player'
      };
      console.log("Mock Google Sign-In successful from auth.js:", mockUser);
      // In a real Firebase app, you'd get a user object from signInWithPopup(auth, provider)
      // You might then fetch/assign a role from your backend based on the user.uid
      resolve(mockUser);
    }, 1000);
  });
};

export const mockSignOut = async () => {
  console.log("Attempting mock Sign-Out from auth.js...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Mock Sign-Out successful from auth.js.");
      // In Firebase, this would be signOut(auth)
      resolve();
    }, 500);
  });
};

// Mock onAuthStateChanged - simulates a subscription to auth state changes
export const mockOnAuthStateChanged = (callback) => {
  console.log("mockOnAuthStateChanged subscribed from auth.js");
  // Simulate initial check (e.g., no user logged in when app loads)
  // To persist login across sessions, you might check localStorage here for a token/user
  // and then call callback(userFromStorage) if valid.
  let currentUser = null;

  // Immediately notify the listener about the current (initial) state
  callback(currentUser);

  // This function would be returned by Firebase's onAuthStateChanged
  // to allow unsubscribing from the listener.
  const unsubscribe = () => {
    console.log("Mock onAuthStateChanged unsubscribed from auth.js.");
  };

  return unsubscribe;
};

// Example of how a real Firebase setup might start (for context, not used directly by mocks yet):
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
// import { firebaseApp } from "../config/firebase"; // Assuming firebaseApp is initialized in a config file

// export const auth = getAuth(firebaseApp);
// const googleProvider = new GoogleAuthProvider();

// export const signInWithGoogleService = () => signInWithPopup(auth, googleProvider);
// export const signOutService = () => signOut(auth);
// export const onAuthStateChangedService = (callback) => onAuthStateChanged(auth, callback);
