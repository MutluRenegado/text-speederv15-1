import React, { useState } from "react";
import "./AppLayout.css";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleAccessibility = () =>
    setIsAccessibilityOpen(!isAccessibilityOpen);

  return (
    <div
      className={`app-root ${
        isAccessibilityOpen ? "accessibility-active" : ""
      }`}
    >
      {/* === HEADER === */}
      <header className="top-bar">
        <div className="top-left">
          <div className="logo">Text Speeder</div>
        </div>

        <div className="top-controls">
          <button className="theme-toggle">🌓</button>
          <button className="menu-toggle" onClick={toggleSidebar}>
            ☰
          </button>
        </div>
      </header>

      {/* === SIDEBAR === */}
      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-title">Menu</div>
          <button onClick={() => alert("Home clicked")}>Home</button>
          <button onClick={() => alert("Profile clicked")}>Profile</button>
          <button onClick={() => alert("Leaderboard clicked")}>
            Leaderboard
          </button>
        </div>
      </aside>

      {/* === ACCESSIBILITY HANDLE === */}
      <img
        src="https://raw.githubusercontent.com/MutluRenegado/text-speeder-v15-1/main/assets/handle/accessibility-handle.png"
        alt="Accessibility handle"
        className="accessibility-handle"
        onClick={toggleAccessibility}
      />

      {/* === ACCESSIBILITY PANEL === */}
      <div
        className={`accessibility-panel ${
          isAccessibilityOpen ? "open" : ""
        }`}
      >
        <h3>Accessibility Mode</h3>
        <div className="accessibility-options">
          <button>Increase Text Size</button>
          <button>High Contrast</button>
          <button>Dark Mode</button>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <main className="main-content">
        <h2>Welcome to Text Speeder</h2>
        <p>
          This is your reading and productivity dashboard. Use the sidebar to
          navigate and the accessibility handle for display settings.
        </p>
      </main>

      {/* === FOOTER === */}
      <footer className="footer">© 2025 Text Speeder v15.1</footer>
    </div>
  );
}
