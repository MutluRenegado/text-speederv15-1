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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleAccessibility = () =>
    setIsAccessibilityOpen(!isAccessibilityOpen);

  const renderScreen = () => {
    switch (view) {
      case "reading":
        return <ReadingSessionScreen />;
      case "results":
        return <ResultsScreen />;
      case "profile":
        return <ProfileScreen />;
      case "leaderboard":
        return <LeaderboardScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="app-layout">
      {/* Header */}
      <header className="app-header">
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Text Speeder v15.1</h1>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>
        <ul>
          <li onClick={() => setView("home")}>Home</li>
          <li onClick={() => setView("reading")}>Reading Session</li>
          <li onClick={() => setView("results")}>Results</li>
          <li onClick={() => setView("leaderboard")}>Leaderboard</li>
          <li onClick={() => setView("profile")}>Profile</li>
        </ul>
      </div>

      {/* Accessibility Handle (top-right corner) */}
      <img
        src="https://raw.githubusercontent.com/MutluRenegado/text-speeder-v15-1/main/assets/handle/accessibility-handle.png"
        alt="Accessibility handle"
        className="accessibility-handle"
        onClick={toggleAccessibility}
      />

      {/* Accessibility Panel */}
      <div
        className={`accessibility-panel ${
          isAccessibilityOpen ? "open" : ""
        }`}
      >
        <button className="close-btn" onClick={toggleAccessibility}>
          ×
        </button>
        <h3>Accessibility Mode</h3>
        <p>Adjust font size, color, or screen contrast.</p>
        <div className="accessibility-options">
          <button>Increase Text</button>
          <button>High Contrast</button>
          <button>Dark Mode</button>
        </div>
      </div>

      {/* Main Content */}
      <main className={`content ${isSidebarOpen ? "blurred" : ""}`}>
        {renderScreen()}
      </main>
    </div>
  );
}
