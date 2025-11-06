import React, { useState, useEffect } from "react";
import "./AppLayout.css";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [glowActive, setGlowActive] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleAccessibility = () =>
    setIsAccessibilityOpen(!isAccessibilityOpen);

  // Glow trigger every 5 minutes (300000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowActive(true);
      setTimeout(() => setGlowActive(false), 4000); // Glow lasts 4s
    }, 300000);
    return () => clearInterval(interval);
  }, []);

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
          <button
            className={`theme-toggle ${glowActive ? "glow" : ""}`}
            title="Toggle Theme"
          >
            🌓
          </button>
          <button
            className={`menu-toggle ${glowActive ? "glow" : ""}`}
            onClick={toggleSidebar}
            title="Menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* === SIDEBAR === */}
      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-title">Menu</div>
          <button className={glowActive ? "glow" : ""}>Home</button>
          <button className={glowActive ? "glow" : ""}>Profile</button>
          <button className={glowActive ? "glow" : ""}>Leaderboard</button>
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
          <button className={glowActive ? "glow" : ""}>Increase Text Size</button>
          <button className={glowActive ? "glow" : ""}>High Contrast</button>
          <button className={glowActive ? "glow" : ""}>Dark Mode</button>
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
