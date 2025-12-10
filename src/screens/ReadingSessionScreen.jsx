import React, { useMemo } from "react";
import TextReader from "../components/UI/TextReader";
import { useReader } from "../components/UI/useReader";

export default function ReadingSessionScreen() {
  const text = useMemo(
    () =>
      "Welcome to TextSpeeder. This calm dark-mode reader helps you focus while reading one word at a time. Adjust the speed, pause when needed, and enjoy the flow.",
    []
  );
  const words = useMemo(() => text.split(/\s+/), [text]);
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
      <h1 style={{ color: "#27d0c6", marginBottom: "1rem" }}>Reading Session</h1>

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

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button onClick={reader.start}>▶ Start</button>
        <button onClick={reader.pause}>⏸ Pause</button>
        <button onClick={reader.restart}>🔁 Restart</button>
      </div>
    </div>
  );
}
