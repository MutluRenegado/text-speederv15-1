// src/App.js
import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import ReadingSessionScreen from "./screens/ReadingSessionScreen";
import ResultsScreen from "./screens/ResultsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import { useAuth } from "./hooks/useAuth";
import "./AppLayout.css";

export default function App() {
  const [view, setView] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 animate-pulse">
        Loading...
      </div>
    );

  if (!currentUser)
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">TextSpeeder</h1>
        <p className="text-gray-500">Please sign in to continue.</p>
      </div>
    );

  // --- Active Page Rendering ---
  let content;
  switch (view) {
    case "reading":
      content = <ReadingSessionScreen onExit={() => setView("home")} />;
      break;
    case "results":
      content = <ResultsScreen onHome={() => setView("home")} />;
      break;
    case "profile":
      content = <ProfileScreen />;
      break;
    case "leaderboard":
      content = <LeaderboardScreen onBack={() => setView("home")} />;
      break;
    default:
      content = (
        <HomeScreen
          onStartReading={() => setView("reading")}
          onProfile={() => setView("profile")}
          onLeaderboard={() => setView("leaderboard")}
        />
      );
  }

  return (
    <div className="app-root">
      {/* === HEADER === */}
      <header className="top-bar">
        <div className="logo">📘 TextSpeeder</div>

        <div className="top-controls">
          <button className="theme-toggle">🌗</button>

          <button
            id="sidebarToggle"
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ Menu
          </button>
        </div>
      </header>

      {/* === SIDEBAR === */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <h2 className="sidebar-title">Navigation</h2>
        <div className="sidebar-content">
          <button onClick={() => setView("home")}>🏠 Home</button>
          <button onClick={() => setView("profile")}>👤 Profile</button>
          <button onClick={() => setView("leaderboard")}>🏆 Leaderboard</button>
          <button onClick={() => setSidebarOpen(false)}>✖ Close</button>
        </div>
      </aside>

      {/* === MAIN === */}
      <main className="main-content">{content}</main>

      {/* === FOOTER === */}
      <footer className="footer">
        © {new Date().getFullYear()} TextSpeeder. All rights reserved.
      </footer>
    </div>
  );
}
