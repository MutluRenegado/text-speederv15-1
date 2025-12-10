import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import ReadingSessionScreen from "./screens/ReadingSessionScreen";
import ResultsScreen from "./screens/ResultsScreen";

export default function App() {
  return (
    <div className="app-root" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* HEADER */}
      <header style={{
        background: "#27d0c6",
        color: "white",
        padding: "1rem",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1.5rem"
      }}>
        <div>TextSpeeder</div>

        {/* Navigation Buttons */}
        <nav style={{ marginTop: "10px", display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link to="/" style={navLink}>Home</Link>
          <Link to="/profile" style={navLink}>Profile</Link>
          <Link to="/reading" style={navLink}>Reading</Link>
          <Link to="/leaderboard" style={navLink}>Leaderboard</Link>
          <Link to="/results" style={navLink}>Results</Link>
        </nav>
      </header>

      {/* MAIN ROUTING AREA */}
      <main style={{ flex: 1, padding: "1.5rem" }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/reading" element={<ReadingSessionScreen />} />
          <Route path="/leaderboard" element={<LeaderboardScreen />} />
          <Route path="/results" element={<ResultsScreen />} />
        </Routes>
      </main>

      {/* Footer with Docs Links */}
      <footer style={{ padding: "1.3rem", background: "#f6b659", textAlign: "center" }}>
        <nav style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "8px"
        }}>
          <a href="https://github.com/MutluRenegado/text-speeder-docs/wiki/Licence" target="_blank">📜 License</a>
          <a href="https://github.com/MutluRenegado/text-speeder-docs/wiki/Privacy-Policy" target="_blank">🔐 Privacy</a>
          <a href="https://github.com/MutluRenegado/text-speeder-docs/wiki" target="_blank">📘 Docs</a>
          <a href="https://github.com/MutluRenegado/text-speeder-docs/wiki/Features" target="_blank">✨ Features</a>
          <a href="https://github.com/MutluRenegado/text-speeder-docs/wiki/FAQ" target="_blank">💬 FAQ</a>
          <a href="https://github.com/MutluRenegado/text-speeder-docs/wiki/Customization" target="_blank">🎨 Customization</a>
          <a href="https://github.com/MutluRenegado/text-speeder-docs/wiki/keyboard%E2%80%90shortcuts" target="_blank">⌨️ Shortcuts</a>
          <a href="https://github.com/MutluRenegado/text-speeder-docs/wiki/Roadmap" target="_blank">🗺️ Roadmap</a>
          <a href="https://github.com/MutluRenegado/text-speeder-docs/wiki/ReadMe" target="_blank">📖 ReadMe</a>
          <a href="https://github.com/MutluRenegado/text-speeder-docs/wiki/Contact" target="_blank">📬 Contact</a>
        </nav>

        <div style={{ opacity: 0.7 }}>
          © TextSpeeder {new Date().getFullYear()} — All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

/* styles for navbar links */
const navLink = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  padding: "6px 10px",
  background: "rgba(0,0,0,0.15)",
  borderRadius: "6px"
};
