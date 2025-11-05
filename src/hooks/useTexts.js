// src/hooks/useTexts.js

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Hook to fetch and manage reading texts from Firestore
 *
 * @param {object} filters - optional filters { category, difficulty, language }
 * @returns {object} {
 *   texts,          // array of text objects
 *   loading,        // boolean
 *   error,          // error message
 *   refreshTexts,   // manual refresh function
 *   getTextById,    // fetch single text by ID
 * }
 */
export function useTexts(filters = {}) {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseRef = collection(db, "texts");

  // Build Firestore query dynamically
  const buildQuery = useCallback(() => {
    const constraints = [];
    if (filters.category) constraints.push(where("category", "==", filters.category));
    if (filters.difficulty) constraints.push(where("difficulty", "==", filters.difficulty));
    if (filters.language) constraints.push(where("language", "==", filters.language));
    constraints.push(orderBy("createdAt", "desc"));
    return query(baseRef, ...constraints);
  }, [filters.category, filters.difficulty, filters.language]);

  // Real-time listener for texts
  useEffect(() => {
    const q = buildQuery();
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTexts(results);
        setLoading(false);
      },
      (err) => {
        console.error("❌ Error fetching texts:", err);
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [buildQuery]);

  /**
   * Manually refresh texts (non-real-time fetch)
   */
  const refreshTexts = useCallback(async () => {
    try {
      setLoading(true);
      const q = buildQuery();
      const querySnapshot = await getDocs(q);
      setTexts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("❌ Error refreshing texts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [buildQuery]);

  /**
   * Fetch a single text by ID (useful for detail views)
   * @param {string} textId
   */
  const getTextById = useCallback(async (textId) => {
    try {
      const docRef = collection(db, "texts");
      const snapshot = await getDocs(docRef);
      const docData = snapshot.docs.find((d) => d.id === textId);
      return docData ? { id: docData.id, ...docData.data() } : null;
    } catch (err) {
      console.error("❌ Error getting text by ID:", err);
      throw err;
    }
  }, []);

  return {
    texts,
    loading,
    error,
    refreshTexts,
    getTextById,
  };
}

