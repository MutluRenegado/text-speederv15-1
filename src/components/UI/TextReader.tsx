import React, { useState } from "react";
import { useReader } from "./useReader";
import "./TextReader.css";

const TextReader: React.FC = () => {
  const [inputText, setInputText] = useState(
    "Welcome to TextSpeeder. This dark-mode reader is designed for comfort and focus."
  );
  const words = inputText.split(/\s+/);
  const reader = useReader({ words, wpm: 250 });

  return (
    <div className="reader-wrapper">
      <textarea
        className="reader-input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="reader-display">
        <span className="reader-word">{reader.word}</span>
      </div>

      <div className="reader-controls">
        <button onClick={reader.start}>▶ Start</button>
        <button onClick={reader.pause}>⏸ Pause</button>
        <button onClick={reader.restart}>🔄 Restart</button>

        <div className="reader-speed">
          <label htmlFor="speed">Speed:</label>
          <input
            id="speed"
            type="range"
            min={100}
            max={1000}
            step={10}
            onChange={(e) => reader.setSpeed(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default TextReader;

