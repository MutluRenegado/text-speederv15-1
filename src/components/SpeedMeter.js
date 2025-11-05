// src/components/SpeedMeter.js

import React from "react";

/**
 * SpeedMeter Component
 *
 * Props:
 * - wpm (number): current words per minute
 * - targetWPM (number): target speed to compare against
 * - maxWPM (number): maximum scale for the meter (default: 1000)
 */
export default function SpeedMeter({ wpm = 0, targetWPM = 300, maxWPM = 1000 }) {
  // Clamp the WPM within limits
  const clampedWPM = Math.min(Math.max(wpm, 0), maxWPM);
  const progress = (clampedWPM / maxWPM) * 100;
  const targetPercent = (targetWPM / maxWPM) * 100;

  // Meter color logic
  const color =
    wpm < targetWPM * 0.7
      ? "bg-red-500"
      : wpm < targetWPM
      ? "bg-yellow-400"
      : "bg-green-500";

  return (
    <div className="w-full max-w-md mx-auto mt-4 p-4 bg-white rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold text-center mb-3">Speed Meter</h3>

      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        {/* Main progress bar */}
        <div
          className={`${color} h-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />

        {/* Target marker */}
        <div
          className="absolute top-0 bottom-0 border-l-2 border-blue-600"
          style={{ left: `${targetPercent}%` }}
        />
      </div>

      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>0</span>
        <span>{maxWPM} WPM</span>
      </div>

      <div className="text-center mt-3">
        <p className="text-xl font-bold text-gray-800">
          {Math.round(wpm)} <span className="text-sm text-gray-500">WPM</span>
        </p>
        <p className="text-sm text-gray-500">
          Target: <strong>{targetWPM} WPM</strong>
        </p>
      </div>
    </div>
  );
}

