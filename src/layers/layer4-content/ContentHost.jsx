// src/layers/layer4-content/ContentHost.jsx

import "./ContentHost.css";

export default function ContentHost({ view, setView }) {
  return (
    <div className="app-frame">
      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* TEMP PLACEHOLDER — replace with Input / Reader */}
        <h1 style={{ color: "white" }}>Main App Loaded</h1>
        <p style={{ color: "#a3a7b7" }}>
          View: {view}
        </p>
      </main>

      {/* FOOTER */}
      <footer className="footer-area">
        {/* Footer controls go here */}
      </footer>

      {/* ALWAYS-VISIBLE HANDLE */}
      <div className="asset-handle">
        ☰
      </div>
    </div>
  );
}
