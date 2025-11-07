import React, { useState, useEffect } from "react";
import "./AppLayout.css";
import ReadingSessionScreen from "./screens/ReadingSessionScreen"; // ✅ import here

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [glowActive, setGlowActive] = useState(false);
  const [vaultText, setVaultText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isFlowing, setIsFlowing] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleAccessibility = () =>
    setIsAccessibilityOpen(!isAccessibilityOpen);

  // 5-minute glow pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowActive(true);
      setTimeout(() => setGlowActive(false), 4000);
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  // Handle file upload into vault
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setVaultText((e.target?.result as string) || "");
      reader.readAsText(file);
    }
  };

  // Load text from vault to main display (smooth flow)
  const handleLoadText = () => {
    if (!vaultText) return;
    setDisplayText("");
    setIsFlowing(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + vaultText.charAt(i));
      i++;
      if (i >= vaultText.length) {
        clearInterval(interval);
        setIsFlowing(false);
      }
    }, 15);
  };

  // ✅ everything below is inside the `return`
  return (
    <div
      className={`app-root ${
        isAccessibilityOpen ? "accessibility-active" : ""
      }`}
    >
      {/* HEADER */}
      <header className="top-bar">
        <div className="top-left">
          <button
            className={`menu-toggle ${glowActive ? "glow-yellow" : ""}`}
            onClick={toggleSidebar}
            title="Menu"
          >
            ☰
          </button>
          <div className="logo">Text Speeder</div>
        </div>
        <div className="top-controls">
          <button
            className={`theme-toggle ${glowActive ? "glow-yellow" : ""}`}
            title="Toggle Theme"
          >
            🌓
          </button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-title">Menu</div>
          <label
            htmlFor="fileUpload"
            className={`menu-btn upload-label ${
              isSidebarOpen ? "" : "hidden"
            }`}
          >
            Upload File
          </label>
          <input
            id="fileUpload"
            type="file"
            accept=".txt,.md,.docx,.pdf"
            onChange={handleFileUpload}
            className={`upload-input ${isSidebarOpen ? "" : "hidden"}`}
          />
          <button
            className={`menu-btn ${glowActive ? "glow-pink" : ""} ${
              isSidebarOpen ? "" : "hidden"
            }`}
            onClick={handleLoadText}
          >
            Load Text
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h2>Welcome to Text Speeder</h2>
        <p>
          {displayText ||
            "Upload a text file and click 'Load Text' to start flowing..."}
        </p>
        {isFlowing && <div className="flow-indicator">⏳ Flowing...</div>}

        {/* 🧪 Test Reader in the middle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
            backgroundColor: "#0b1120",
          }}
        >
          <div
            style={{
              border: "2px solid #27d0c6",
              borderRadius: "12px",
              padding: "2rem",
              width: "700px",
              maxWidth: "90%",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            }}
          >
            <ReadingSessionScreen />
          </div>
        </div>
      </main>

      <footer className="footer">© 2025 Text Speeder v15.1</footer>
    </div>
  );
}
