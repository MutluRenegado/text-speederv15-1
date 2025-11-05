// src/App.js
import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import ReadingSessionScreen from "./screens/ReadingSessionScreen";
import ResultsScreen from "./screens/ResultsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  // ---- Basic App State ----
  const [view, setView] = useState("home");
  const [activeText, setActiveText] = useState(null);
  const [lastSession, setLastSession] = useState(null);

  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 animate-pulse">
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">TextSpeeder</h1>
        <p className="text-gray-500">Please sign in to continue.</p>
      </div>
    );
  }

  // ---- Navigation ----
  switch (view) {
    case "reading":
      return (
        <ReadingSessionScreen
          text={activeText}
          onExit={() => setView("home")}
          onFinish={(sessionData) => {
            setLastSession(sessionData);
            setView("results");
          }}
        />
      );

    case "results":
      return (
        <ResultsScreen
          session={lastSession}
          text={activeText}
          onRetry={() => setView("reading")}
          onHome={() => {
            setActiveText(null);
            setView("home");
          }}
        />
      );

    case "profile":
      return (
        <ProfileScreen />
      );

    case "leaderboard":
      return (
        <LeaderboardScreen onBack={() => setView("home")} />
      );

    default:
      return (
        <HomeScreen
          onStartReading={(text) => {
            setActiveText(text);
            setView("reading");
          }}
          onProfile={() => setView("profile")}
          onLeaderboard={() => setView("leaderboard")}
        />
      );
  }
}

