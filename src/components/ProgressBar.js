// src/components/ProgressBar.js

import React from "react";

/**
 * ProgressBar Component
 *
 * Props:
 * - progress (number): completion percentage (0–100)
 * - color (string): Tailwind color class (default: "bg-blue-500")
 * - height (string): Tailwind height class (default: "h-3")
 * - showLabel (boolean): whether to show numeric percentage (default: true)
 */
export default function ProgressBar({
  progress = 0,
  color = "bg-blue-500",
  height = "h-3",
  showLabel = true,
}) {
  // Clamp the progress value
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      {/* Bar container */}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
        {/* Progress fill */}
        <div
          className={`${color} h-full transition-all duration-300 ease-out`}
          style={{ width: `${safeProgress}%` }}
        />
      </div>

      {/* Optional percentage label */}
      {showLabel && (
        <div className="text-right text-sm text-gray-600 mt-1">
          {Math.round(safeProgress)}%
        </div>
      )}
    </div>
  );
}

