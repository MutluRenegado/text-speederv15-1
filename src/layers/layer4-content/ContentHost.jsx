import "./ContentHost.css";

import Intro from "../../pages/Intro/Intro";
import WelcomeScreen from "../../pages/Welcome/WelcomeScreen";

export default function ContentHost({ view, onNavigate, theme }) {
  return (
    <div className="app-frame">
      {/* MAIN CONTENT */}
      <main className="main-content">
        {view === "intro" && (
          <Intro
            theme={theme}
            onContinue={() => onNavigate("welcome")}
          />
        )}

        {view === "welcome" && (
          <WelcomeScreen
            onStart={() => onNavigate("app")}
            onTest={() => onNavigate("test")}
          />
        )}

        {view === "app" && (
          <>
            <h1 style={{ color: "white" }}>Main App Loaded</h1>
            <p style={{ color: "#a3a7b7" }}>View: {view}</p>
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer-area">
        {/* Footer controls go here */}
      </footer>

      {/* ALWAYS-VISIBLE HANDLE */}
      <div className="asset-handle">☰</div>
    </div>
  );
}
