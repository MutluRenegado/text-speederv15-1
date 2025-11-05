// src/services/userService.js

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// 🔹 Firestore reference
const usersCollection = collection(db, "users");

/**
 * Create a new user document
 * @param {string} userId
 * @param {Object} userData
 */
export async function createUser(userId, userData) {
  try {
    await setDoc(doc(db, "users", userId), {
      ...userData,
      createdAt: new Date(),
    });
    console.log(`✅ User created: ${userId}`);
  } catch (error) {
    console.error("❌ Error creating user:", error);
    throw error;
  }
}

/**
 * Get a user by ID
 * @param {string} userId
 */
export async function getUser(userId) {
  try {
    const userSnap = await getDoc(doc(db, "users", userId));
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      console.warn(`⚠️ User not found: ${userId}`);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    throw error;
  }
}

/**
 * Update user fields
 * @param {string} userId
 * @param {Object} updates
 */
export async function updateUser(userId, updates) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updates);
    console.log(`✅ User updated: ${userId}`);
  } catch (error) {
    console.error("❌ Error updating user:", error);
    throw error;
  }
}

/**
 * Delete a user (⚠️ removes user permanently)
 * @param {string} userId
 */
export async function deleteUser(userId) {
  try {
    await deleteDoc(doc(db, "users", userId));
    console.log(`🗑️ User deleted: ${userId}`);
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    throw error;
  }
}

/**
 * Add a reading session under a user
 * @param {string} userId
 * @param {Object} sessionData - { textId, startTime, endTime, wpm, comprehensionScore, device }
 */
export async function addReadingSession(userId, sessionData) {
  try {
    const sessionsRef = collection(db, "users", userId, "readingSessions");
    const newSessionRef = await addDoc(sessionsRef, {
      ...sessionData,
      createdAt: new Date(),
    });
    console.log(`✅ Added reading session for user ${userId}`);
    return newSessionRef.id;
  } catch (error) {
    console.error("❌ Error adding reading session:", error);
    throw error;
  }
}

/**
 * Get all reading sessions for a user
 * @param {string} userId
 */
export async function getUserReadingSessions(userId) {
  try {
    const sessionsRef = collection(db, "users", userId, "readingSessions");
    const q = query(sessionsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("❌ Error fetching reading sessions:", error);
    throw error;
  }
}

