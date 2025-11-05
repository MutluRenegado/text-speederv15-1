// src/hooks/useSession.js

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import {
  createSession,
  updateSession,
  getSession,
} from "../services/sessionService";

/**
 * Hook to manage a reading session lifecycle
 *
 * @returns {object} {
 *   currentSession,       // session data object
 *   sessionId,            // Firestore session ID
 *   isActive,             // boolean
 *   startSession,         // start a new session
 *   endSession,           // end session and save results
 *   updateSessionData,    // update session fields
 *   loading,              // boolean
 *   error,                // error message
 * }
 */
export function useSession() {
  const { currentUser } = useAuth();
  const [sessionId, setSessionId] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Start a new reading session
   * @param {string} textId - ID of the text being read
   * @param {string} device - device type (web, mobile, etc.)
   */
  const startSession = useCallback(
    async (textId, device = "web") => {
      if (!currentUser) {
        setError("User not authenticated");
        return;
      }
      try {
        setLoading(true);
        const sessionData = {
          textId,
          startTime: new Date(),
          endTime: null,
          wpm: 0,
          comprehensionScore: 0,
          device,
        };
        const id = await createSession(currentUser.uid, sessionData);
        setSessionId(id);
        setCurrentSession({ id, ...sessionData });
        setIsActive(true);
        setLoading(false);
        console.log(`🚀 Started session ${id}`);
      } catch (err) {
        console.error("❌ Error starting session:", err);
        setError(err.message);
        setLoading(false);
      }
    },
    [currentUser]
  );

  /**
   * Update current session fields (e.g. WPM, comprehensionScore)
   * @param {object} updates - partial updates
   */
  const updateSessionData = useCallback(
    async (updates) => {
      if (!currentUser || !sessionId) return;
      try {
        await updateSession(currentUser.uid, sessionId, updates);
        setCurrentSession((prev) => ({ ...prev, ...updates }));
      } catch (err) {
        console.error("❌ Error updating session:", err);
        setError(err.message);
      }
    },
    [currentUser, sessionId]
  );

  /**
   * End the session
   * @param {object} results - { wpm, comprehensionScore }
   */
  const endSession = useCallback(
    async (results) => {
      if (!currentUser || !sessionId) return;
      try {
        const updates = {
          endTime: new Date(),
          ...results,
        };
        await updateSession(currentUser.uid, sessionId, updates);
        setCurrentSession((prev) => ({ ...prev, ...updates }));
        setIsActive(false);
        console.log(`🏁 Session ${sessionId} ended`);
      } catch (err) {
        console.error("❌ Error ending session:", err);
        setError(err.message);
      }
    },
    [currentUser, sessionId]
  );

  /**
   * Fetch a session by ID (useful for result screens)
   * @param {string} id - session ID
   */
  const loadSession = useCallback(
    async (id) => {
      if (!currentUser) return;
      try {
        setLoading(true);
        const sessionData = await getSession(currentUser.uid, id);
        setCurrentSession(sessionData);
        setSessionId(id);
      } catch (err) {
        console.error("❌ Error loading session:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [currentUser]
  );

  return {
    sessionId,
    currentSession,
    isActive,
    startSession,
    updateSessionData,
    endSession,
    loadSession,
    loading,
    error,
  };
}

