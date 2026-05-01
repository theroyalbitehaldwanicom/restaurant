import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface UserProfile {
  fullName: string;
  phoneNumber: string;
  email: string;
  address?: string;
  mapLink?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user profile from Firestore
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
             setUserProfile(userDoc.data() as UserProfile);
          } else {
             // Create initial profile
             const initialProfile: UserProfile = {
                fullName: currentUser.displayName || '',
                phoneNumber: currentUser.phoneNumber || '0000000000', // Need phone number due to schema
                email: currentUser.email || '',
             };
             // We can't automatically create it unless we ensure all required fields meet the schema.
             // But we can set userProfile state to null so the checkout form knows it might need initialization.
             setUserProfile(null);
          }
        } catch (error) {
           console.error("Error fetching user profile", error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login failed", error);
      if (error.code === 'auth/popup-blocked') {
        alert("The login popup was blocked by your browser. Please allow popups for this site, or open this app in a new tab (using the ↗️ button in the top right) to log in.");
      } else if (error.code !== 'auth/cancelled-popup-request') {
        alert(`Login failed: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          ...profileData,
          updatedAt: serverTimestamp()
        });
        setUserProfile(prev => prev ? { ...prev, ...profileData } : null);
      } else {
        // Create it
        const newProfile = {
           fullName: profileData.fullName || user.displayName || '',
           phoneNumber: profileData.phoneNumber || '0000000000',
           email: user.email || '',
           address: profileData.address || '',
           mapLink: profileData.mapLink || '',
           createdAt: serverTimestamp()
        };
        await setDoc(userDocRef, newProfile);
        // Note: setting local state without timestamp to avoid issues
        setUserProfile(newProfile as unknown as UserProfile);
      }
    } catch (error) {
       console.error("Error updating profile", error);
       throw error; // Re-throw to handle in component
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, login, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
