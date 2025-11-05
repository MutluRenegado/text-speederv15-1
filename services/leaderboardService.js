
// src/services/leaderboardService.js

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const leaderboardsCollection = collection(db, "leaderboards");

/**
 * Create or replace a leaderboard document
 * @param {string} periodId - "daily", "weekly", "monthly"
 * @param {Object[]} topUsers - Array of { userId, displayName, avgWPM, avgComprehension }
 */
export async function createOrUpdateLeaderboard(periodId, topUsers) {
  try {
    await setDoc(doc(db, "leaderboards", periodId), {
      period: periodId,
      topUsers,
      updatedAt: new Date(),
    });
    console.log(`✅ Leaderboard (${periodId}) updated successfully`);
  } catch (error) {
    console.error("❌ Error creating/updating leaderboard:", error);
    throw error;
  }
}

/**
 * Get a leaderboard by its period
 * @param {string} periodId - "daily", "weekly", or "monthly"
 */
export async function getLeaderboard(periodId) {
  try {
    const leaderboardRef = doc(db, "leaderboards", periodId);
    const leaderboardSnap = await getDoc(leaderboardRef);

    if (leaderboardSnap.exists()) {
      return { id: leaderboardSnap.id, ...leaderboardSnap.data() };
    } else {
      console.warn(`⚠️ No leaderboard found for period: ${periodId}`);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error);
    throw error;
  }
}

/**
 * Get all leaderboards sorted by update time (most recent first)
 */
export async function getAllLeaderboards() {
  try {
    const q = query(leaderboardsCollection, orderBy("updatedAt", "desc"), limit(10));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("❌ Error fetching leaderboards:", error);
    throw error;
  }
}

/**
 * Update top users of an existing leaderboard
 * @param {string} periodId
 * @param {Object[]} newTopUsers
 */
export async function updateLeaderboardUsers(periodId, newTopUsers) {
  try {
    const leaderboardRef = doc(db, "leaderboards", periodId);
    await updateDoc(leaderboardRef, {
      topUsers: newTopUsers,
      updatedAt: new Date(),
    });
    console.log(`✅ Updated leaderboard users for ${periodId}`);
  } catch (error) {
    console.error("❌ Error updating leaderboard users:", error);
    throw error;
  }
}
