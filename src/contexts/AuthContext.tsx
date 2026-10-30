import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isLoggingIn: boolean;
  authError: string | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}

const ADMIN_EMAILS = [
  'beingyoupath@gmail.com',
  'isimran662@gmail.com',
];

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  isLoggingIn: false,
  authError: null,
  loginWithGoogle: async () => {},
  logout: async () => {},
  clearAuthError: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const clearAuthError = () => setAuthError(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setAuthError(null);
        // Sync user profile to Firestore defensively
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userRef);
          const now = new Date().toISOString();
          const cleanEmail = currentUser.email || '';
          const cleanName = currentUser.displayName || 'Client';
          // Truncate photoURL if excessively long
          const cleanPhoto = (currentUser.photoURL || '').slice(0, 500);

          if (!userDoc.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: cleanEmail,
              displayName: cleanName,
              photoURL: cleanPhoto,
              createdAt: now,
              updatedAt: now,
            });
          } else {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: cleanEmail,
              displayName: cleanName,
              photoURL: cleanPhoto,
              updatedAt: now,
            }, { merge: true });
          }
        } catch (err) {
          console.warn('User profile sync to Firestore encountered an issue (non-blocking):', err);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    clearAuthError();
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Firebase Auth Sign-In Error:', error);
      let friendlyMessage = 'Unable to complete sign-in. Please try again.';

      if (error?.code === 'auth/popup-blocked') {
        friendlyMessage = 'The Google sign-in window was blocked by your browser. Please allow popups for this page and try again.';
      } else if (error?.code === 'auth/popup-closed-by-user') {
        friendlyMessage = 'Sign-in window was closed before completing.';
      } else if (error?.code === 'auth/cancelled-popup-request') {
        friendlyMessage = 'Another sign-in window was already open. Please retry.';
      } else if (error?.code === 'auth/unauthorized-domain') {
        friendlyMessage = `This domain (${window.location.hostname}) is not authorized in Firebase Authentication. Please add it to Authorized Domains in your Firebase console.`;
      } else if (error?.code === 'auth/network-request-failed') {
        friendlyMessage = 'Network connection issue. Please check your internet connection.';
      } else if (error?.message) {
        friendlyMessage = error.message;
      }

      setAuthError(friendlyMessage);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    clearAuthError();
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const isAdmin = Boolean(
    user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase().trim())
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        isLoggingIn,
        authError,
        loginWithGoogle,
        logout,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
