import React, { useMemo } from "react";
import TextReader from "../components/UI/TextReader";
import { useReader } from "../components/UI/useReader";

/**
 * ReadingSessionScreen
 * ----------------------
 * Displays the live reading interface with:
 * - dark mode styling
 * - word-by-word flow
 * - playback controls (start, pause, restart)
 * - speed slider
 */
export default function ReadingSessionScreen() {
  // 🧾 Sample reading text
  const text = useMemo(
    () =>
      "Welcome to TextSpeeder. This calm dark-mode reader helps you focus while reading one word at a time. Adjust the speed, pause when needed, and enjoy the flow.",
    []
  );

  const words = useMemo(() => text.split(/\s+/), [text]);

  // ⚙️ Use the custom reader hook
  const reader = useReader({ words, wpm: 250 });

  return (
    <div
      style={{
        backgroundColor: "#0b1120",
        color: "#e4e6eb",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 🔹 Header */}
      <h1
        style={{
          color: "#27d0c6",
          marginBottom: "1rem",
          fontSize: "1.8rem",
          fontWeight: 600,
          letterSpacing: "0.03em",
        }}
      >
        Reading Session
      </h1>

      {/* 🔹 Text Reader */}
      <div
        style={{
          background: "#111827",
          borderRadius: "10px",
          padding: "2rem",
          width: "100%",
          maxWidth: "700px",
          minHeight: "160px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        }}
      >
        <TextReader currentWord={reader.word} />
      </div>

      {/* 🔹 Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <button
          onClick={reader.start}
          style={{
            background: "#27d0c6",
            color: "#0b1120",
            border: "none",
            padding: "0.6rem 1.2rem",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ▶ Start
        </button>

        <button
          onClick={reader.pause}
          style={{
            background: "#f6b659",
            color: "#0b1120",
            border: "none",
            padding: "0.6rem 1.2rem",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ⏸ Pause
        </button>

        <button
          onClick={reader.restart}
          style={{
            background: "#b6004a",
            color: "white",
            border: "none",
            padding: "0.6rem 1.2rem",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          🔁 Restart
        </button>
      </div>

      {/* 🔹 Speed Slider */}
      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <label htmlFor="speedSlider" style={{ color: "#9ca3af" }}>
          Speed ({Math.round(60000 / (60000 / Math.max(1, 250)))} WPM)
        </label>
        <input
          id="speedSlider"
          type="range"
          min={100}
          max={800}
          step={50}
          onChange={(e) => reader.setSpeed(Number(e.target.value))}
          style={{
            width: "100%",
            marginTop: "0.5rem",
            accentColor: "#27d0c6",
          }}
        />
      </div>
    </div>
  );
}
