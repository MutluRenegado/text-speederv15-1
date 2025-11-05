// src/components/TextReader.js

import React, { useEffect, useState, useRef } from "react";
import { calculateWPM } from "../utils/calculateWPM";
import { formatDuration } from "../utils/formatTime";

/**
 * TextReader Component
 *
 * Props:
 * - text: { id, title, content, wordCount, difficulty }
 * - onFinish: (results) => void   // Called when user finishes reading
 * - autoScrollSpeed?: number (ms per word, default = 200)
 */
export default function TextReader({ text, onFinish, autoScrollSpeed = 200 }) {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const scrollRef = useRef(null);

  // Split text content into words
  useEffect(() => {
    if (text?.content) {
      const split = text.content.trim().split(/\s+/);
      setWords(split);
      setCurrentIndex(0);
      setIsReading(false);
      setElapsed(0);
      clearInterval(timerRef.current);
    }
  }, [text]);

  // Start reading
  const startReading = () => {
    if (!text?.content) return;
    setIsReading(true);
    setStartTime(new Date());

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + 1 >= words.length) {
          stopReading();
          return prev;
        }
        return prev + 1;
      });
    }, autoScrollSpeed);
  };

  // Stop reading
  const stopReading = () => {
    clearInterval(timerRef.current);
    setIsReading(false);
    setEndTime(new Date());
  };

  // Calculate reading time and WPM when done
  useEffect(() => {
    if (endTime && startTime) {
      const duration = endTime - startTime;
      const wpm = calculateWPM(words.length, startTime, endTime);
      const result = {
        wpm,
        duration,
        formattedTime: formatDuration(duration),
      };
      onFinish?.(result);
    }
  }, [endTime]);

  // Live timer display
  useEffect(() => {
    let interval;
    if (isReading) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isReading]);

  // Scroll the current word into view
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentIndex]);

  if (!text) return <p className="text-gray-600">No text selected.</p>;

  return (
    <div className="flex flex-col items-center p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-3">{text.title}</h2>
      <p className="text-sm text-gray-500 mb-6">
        Difficulty: {text.difficulty} • {text.wordCount} words
      </p>

      <div className="border border-gray-300 rounded-xl p-4 bg-white shadow-md w-full h-[300px] overflow-y-auto">
        <div className="text-lg leading-relaxed">
          {words.map((word, i) => (
            <span
              key={i}
              ref={i === currentIndex ? scrollRef : null}
              className={`transition-colors duration-100 ${
                i === currentIndex
                  ? "bg-yellow-200 font-semibold"
                  : "text-gray-800"
              }`}
            >
              {word}{" "}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        {!isReading ? (
          <button
            onClick={startReading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Start Reading
          </button>
        ) : (
          <button
            onClick={stopReading}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
          >
            Stop
          </button>
        )}

        <div className="text-gray-600 text-sm ml-3">
          Time: {formatDuration(elapsed)}
        </div>
      </div>
    </div>
  );
}

