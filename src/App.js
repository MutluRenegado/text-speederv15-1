import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import ReadingSessionScreen from "./screens/ReadingSessionScreen";
import ResultsScreen from "./screens/ResultsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import { useAuth } from "./hooks/useAuth";
import "./AppLayout.css"; // pastel layout styles

export default function App() {
  // ---- Basic App State ----
  const [view, setView] = useState("home");
  const [activeText, setActiveText] = useState(null);
  const [lastSession, setLastSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">Loading...</div>
    );
  }

  if (!currentUser) {
    return (
      <div className="auth-screen">
        <h1>TextSpeeder</h1>
        <p>Please sign in to continue.</p>
      </div>
    );
  }

  // ---- Active Screen ----
  let content;
  switch (view) {
    case "reading":
      content = (
        <ReadingSessionScreen
          text={activeText}
          onExit={() => setView("home")}
          onFinish={(sessionData) => {
            setLastSession(sessionData);
            setView("results");
          }}
        />
      );
      break;

    case "results":
      content = (
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
          onStartReading={(text) => {
            setActiveText(text);
            setView("reading");
          }}
          onProfile={() => setView("profile")}
          onLeaderboard={() => setView("leaderboard")}
        />
      );
  }

  // ---- Render ----
  return (
    <div className={`app-root ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="top-bar">
        <div className="logo">TEXTSPEEDER</div>
        <div className="top-controls">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            id="sidebarToggle"
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ Menu
          </button>
        </div>
      </header>

      {/* Sidebar (Right) */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="sidebar-content">
          <h2 className="sidebar-title">Navigation</h2>
          <button onClick={() => setView("home")}>🏠 Home</button>
          <button onClick={() => setView("profile")}>👤 Profile</button>
          <button onClick={() => setView("leaderboard")}>🏆 Leaderboard</button>
          <button onClick={() => setSidebarOpen(false)}>✖ Close</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-container">{content}</main>

      {/* Footer */}
      <footer className="footer">
        <p>TextSpeeder © 2025 — All Rights Reserved</p>
      </footer>
    </div>
  );
}
