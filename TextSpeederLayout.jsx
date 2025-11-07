import React, { useState } from "react";
import "./AppLayout.css";

export default function TextSpeederLayout({ children, onToggleTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-root">
      {/* Top Header */}
      <header className="top-bar">
        <div className="logo">TEXTSPEEDER</div>

        <div className="top-controls">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle dark/light theme"
          >
            dark/light
          </button>

          <button
            id="sidebarToggle"
            className="menu-toggle"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰ Menu
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div className="sidebar-content">
          <h2 className="sidebar-title">Navigation</h2>
          <button onClick={() => setSidebarOpen(false)}>🏠 Home</button>
          <button onClick={() => setSidebarOpen(false)}>📚 Reading</button>
          <button onClick={() => setSidebarOpen(false)}>👤 Profile</button>
          <button onClick={() => setSidebarOpen(false)}>🏆 Leaderboard</button>
          <button onClick={() => setSidebarOpen(false)}>✖ Close</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">{children}</main>

      {/* Footer */}
      <footer className="footer">
        <p>TextSpeeder © 2025 — All Rights Reserved</p>
      </footer>
    </div>
  );
}
