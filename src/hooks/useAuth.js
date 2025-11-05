// src/hooks/useAuth.js

import { useState, useEffect, useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Create a React Context for auth
const AuthContext = createContext();

// 🔹 Hook to access the Auth context easily
export function useAuth() {
  return useContext(AuthContext);
}

// 🔹 Provider component wrapping your app
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Watch for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch or initialize Firestore user document
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // Create user document if it doesn’t exist
          await setDoc(userRef, {
            name: user.displayName || "Anonymous",
            email: user.email,
            createdAt: new Date(),
            settings: {
              theme: "light",
              difficultyLevel: "medium",
            },
            stats: {
              totalSessions: 0,
              avgSpeedWPM: 0,
              avgComprehension: 0,
            },
          });
        }

        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 🔹 Sign up new user
  async function signUp(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Create Firestore user doc
      await setDoc(doc(db, "users", user.uid), {
        name: displayName || "New User",
        email,
        createdAt: new Date(),
        settings: {
          theme: "light",
          difficultyLevel: "medium",
        },
        stats: {
          totalSessions: 0,
          avgSpeedWPM: 0,
          avgComprehension: 0,
        },
      });

      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("❌ Error signing up:", error);
      throw error;
    }
  }

  // 🔹 Sign in existing user
  async function signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("❌ Error signing in:", error);
      throw error;
    }
  }

  // 🔹 Sign out
  async function signOutUser() {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
      console.log("👋 User signed out");
    } catch (error) {
      console.error("❌ Error signing out:", error);
      throw error;
    }
  }

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut: signOutUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
