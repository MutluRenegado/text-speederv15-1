// src/App.js
import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import ReadingSessionScreen from "./screens/ReadingSessionScreen";
import ResultsScreen from "./screens/ResultsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import { useAuth } from "./hooks/useAuth";
import "./AppLayout.css"; // new CSS file for sidebar + layout styling

export default function App() {
  // ---- Basic App State ----
  const [view, setView] = useState("home");
  const [activeText, setActiveText] = useState(null);
  const [lastSession, setLastSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // ---- Render with layout wrapper ----
  return (
    <div className="app-root">
      {/* Sidebar Toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen((s) => !s)}
      >
        ☰ Menu
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "" : "sidebar--closed"}`}>
        <div className="sidebar-content">
          <h2 className="sidebar-title">Navigation</h2>
          <button onClick={() => setView("home")}>🏠 Home</button>
          <button onClick={() => setView("profile")}>👤 Profile</button>
          <button onClick={() => setView("leaderboard")}>🏆 Leaderboard</button>
          <button onClick={() => setSidebarOpen(false)}>✖ Close</button>
        </div>
      </aside>

<script>
  // Reader control buttons
  const pauseBtn = document.getElementById("pauseBtn");
  const restartBtn = document.getElementById("restartBtn");
  const hideLinesBtn = document.getElementById("hideLinesBtn");
  const hideScreenBtn = document.getElementById("hideScreenBtn");
  const flowScreen = document.getElementById("flowScreen");
  const rsvpScreen = document.getElementById("rsvpScreen");
  const marquee = document.getElementById("marquee");
  const rsvpWord = document.getElementById("rsvpWord");

  // Pause toggle (example)
  pauseBtn.addEventListener("click", () => {
    document.body.classList.toggle("paused");
    pauseBtn.textContent = document.body.classList.contains("paused")
      ? "▶️ Resume"
      : "⏸️ Pause";
  });

  // Restart (just resets both screens for now)
  restartBtn.addEventListener("click", () => {
    marquee.scrollLeft = 0;
    rsvpWord.textContent = "Restarted!";
    document.body.classList.remove("paused");
    pauseBtn.textContent = "⏸️ Pause";
  });

  // Hide/Show lines
  hideLinesBtn.addEventListener("click", () => {
    document.body.classList.toggle("hide-lines");
    hideLinesBtn.textContent = document.body.classList.contains("hide-lines")
      ? "🧾 Show Lines"
      : "🧾 Hide Lines";
  });

  // Hide/Show screen
  hideScreenBtn.addEventListener("click", () => {
    document.body.classList.toggle("hide-screen");
    hideScreenBtn.textContent = document.body.classList.contains("hide-screen")
      ? "🕳️ Show Screen"
      : "🕳️ Hide Screen";
  });
</script>


      {/* Main Content Area */}
      <main className="main-container">{content}</main>
    </div>
  );
}
