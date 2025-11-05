// src/screens/ReadingSessionScreen.js

import React, { useEffect, useState } from "react";
import TextReader from "../components/TextReader";
import SpeedMeter from "../components/SpeedMeter";
import ProgressBar from "../components/UI/ProgressBar";
import Button from "../components/UI/Button";
import { useSession } from "../hooks/useSession";
import { calculateWPM } from "../utils/calculateWPM";
import { formatDuration } from "../utils/formatTime";

/**
 * ReadingSessionScreen
 * Handles a live reading session lifecycle.
 *
 * Props:
 * - text: Firestore text object ({ id, title, content, wordCount, difficulty, ... })
 * - onExit: function — called when user finishes or exits
 */
export default function ReadingSessionScreen({ text, onExit }) {
  const { startSession, endSession, isActive, currentSession } = useSession();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [readingDone, setReadingDone] = useState(false);

  // Start session when screen loads
  useEffect(() => {
    if (text?.id) {
      startSession(text.id, "web");
      setStartTime(new Date());
    }
  }, [text?.id]);

  // Handle reading completion (called by TextReader)
  const handleFinishReading = async ({ wpm: finalWPM, duration }) => {
    setWpm(finalWPM);
    setEndTime(new Date());
    setReadingDone(true);

    await endSession({
      wpm: finalWPM,
      comprehensionScore: 0, // Optional quiz integration later
    });
  };

  // Compute progress in % (simulated if text loaded)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 2 : 100));
    }, 300);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{text.title}</h2>
          <p className="text-sm text-gray-600">
            Difficulty: {text.difficulty} • {text.wordCount} words
          </p>
        </div>
        <Button variant="secondary" onClick={onExit}>
          Exit
        </Button>
      </header>

      {/* Text Reader */}
      {!readingDone ? (
        <>
          <TextReader
            text={text}
            onFinish={handleFinishReading}
            autoScrollSpeed={180}
          />

          <div className="mt-6">
            <ProgressBar progress={progress} color="bg-blue-500" />
          </div>
        </>
      ) : (
        <SessionResults wpm={wpm} startTime={startTime} endTime={endTime} />
      )}

      {/* Live Speed Meter */}
      {!readingDone && (
        <div className="mt-8">
          <SpeedMeter wpm={wpm} targetWPM={300} maxWPM={600} />
        </div>
      )}
    </div>
  );
}

/**
 * SessionResults Component
 * Displays the summary after finishing a reading session
 */
function SessionResults({ wpm, startTime, endTime }) {
  const duration = endTime && startTime ? endTime - startTime : 0;

  return (
    <div className="text-center mt-10 p-6 bg-white border rounded-2xl shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        ✅ Reading Complete!
      </h3>
      <p className="text-gray-600 mb-4">
        Duration: <strong>{formatDuration(duration)}</strong>
      </p>
      <p className="text-2xl font-bold text-green-600 mb-2">{wpm} WPM</p>
      <p className="text-sm text-gray-500">
        Great job! Keep practicing to boost your speed.
      </p>
    </div>
  );
}

