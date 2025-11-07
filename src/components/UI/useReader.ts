import React, { useEffect, useRef, useState } from "react";
import { useReader } from "../components/UI/useReader";

// ---- TYPES ----
export interface ReaderOptions {
  words: string[];
  wpm?: number;
}

export interface ReaderControls {
  word: string;
  index: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  restart: () => void;
  setSpeed: (wpm: number) => void;
}

// ---- HOOK ----
export const useReader = ({ words, wpm = 250 }: ReaderOptions): ReaderControls => {
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(wpm);
  const timerRef = useRef<number | null>(null);

  const delay = 60000 / Math.max(1, speed);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const next = () => {
    setIndex((i) => (i + 1) % words.length);
  };

  const scheduleNext = () => {
    clearTimer();
    if (isRunning) {
      timerRef.current = window.setTimeout(() => {
        next();
        scheduleNext();
      }, delay);
    }
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const restart = () => {
    setIndex(0);
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning) scheduleNext();
    else clearTimer();
    return clearTimer;
  }, [isRunning, speed]);

  return {
    word: words[index] || "",
    index,
    isRunning,
    start,
    pause,
    restart,
    setSpeed,
  };
};

// ---- DEMO COMPONENT (optional test) ----
export default function ReaderDemo() {
  const sampleText =
    "This is a calm dark-mode reading demo powered by TextReader. Adjust speed or pause anytime.";
  const words = sampleText.split(/\s+/);
  const reader = useReader({ words, wpm: 250 });

  return (
    <div
      style={{
        background: "#0b1120",
        color: "#e4e6eb",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h2 style={{ color: "#27d0c6" }}>Reader Demo</h2>

      {/* The visual reader */}
      <TextReader currentWord={reader.word} />

      {/* Controls */}
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <button onClick={reader.start}>▶ Start</button>
        <button onClick={reader.pause}>⏸ Pause</button>
        <button onClick={reader.restart}>🔁 Restart</button>
        <input
          type="range"
          min={100}
          max={800}
          step={50}
          onChange={(e) => reader.setSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
