import React, { useState } from "react";
import "./TextSpeederLayout.css"; // CSS below

const TextSpeederLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState("A");
  const [wpm, setWpm] = useState(300);

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
        <h2>Sidebar</h2>
        <p className="small-label">
          Your sidebar content here — when closed, it disappears completely.
        </p>
      </aside>

      {/* Main Section */}
      <main className="main">
        <header className="top-bar">
          <div>
            <h1>⚡ TextSpeeder</h1>
            <small>Dual reading screens stacked behind each other</small>
          </div>
        </header>

        {/* Reader Area */}
        <section className="reader-wrapper">
          <div className="reader-toolbar">
            {/* Toggle screens */}
            <button
              className="btn btn-ghost"
              onClick={() => setActiveScreen("A")}
            >
              Screen A
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setActiveScreen("B")}
            >
              Screen B
            </button>

            {/* Placeholders for next step (Start, Pause, Reset) */}
            <button className="btn btn-primary">Start</button>
            <button className="btn btn-ghost">Pause</button>
            <button className="btn btn-ghost">Reset</button>
          </div>

          {/* Reader Stack */}
          <div className="reader-stack">
            <div
              className={`reader-screen ${
                activeScreen === "A" ? "reader-screen--active" : ""
              }`}
            >
              <div className="reader-text">
                <span>Screen A:</span> <span className="highlight">Active</span>
              </div>
            </div>

            <div
              className={`reader-screen ${
                activeScreen === "B" ? "reader-screen--active" : ""
              }`}
            >
              <div className="reader-text">
                <span>Screen B:</span>{" "}
                <span className="highlight">Hidden behind A</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom controls */}
        <section className="bottom-area">
          <div className="card">
            <h3>Input Text</h3>
            <textarea
              placeholder="Paste or type text you want to speed-read..."
            />
          </div>

          <div className="card">
            <h3>Settings</h3>
            <div className="slider-row">
              <span className="small-label">
                Speed (WPM): <span>{wpm}</span>
              </span>
              <input
                type="range"
                min="120"
                max="900"
                value={wpm}
                onChange={(e) => setWpm(e.target.value)}
              />
            </div>
            <div className="slider-row">
              <span className="small-label">Chunk size:</span>
              <select>
                <option value="1">1 word</option>
                <option value="2">2 words</option>
                <option value="3">3 words</option>
              </select>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TextSpeederLayout;

