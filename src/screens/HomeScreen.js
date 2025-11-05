// src/screens/HomeScreen.js

import React, { useState } from "react";
import { useTexts } from "../hooks/useTexts";
import { useUserData } from "../hooks/useUserData";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import ProgressBar from "../components/UI/ProgressBar";
import { DIFFICULTY_LEVELS, TEXT_CATEGORIES } from "../utils/constants";

/**
 * HomeScreen
 * Displays list of reading texts + user stats
 */
export default function HomeScreen({ onStartReading }) {
  const { userData, loading: userLoading } = useUserData();
  const [selectedCategory, setSelectedCategory] = useState("training");
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");

  const { texts, loading: textsLoading } = useTexts({
    category: selectedCategory,
    difficulty: selectedDifficulty,
  });

  if (userLoading || textsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-800">
          👋 Welcome, {userData?.name || "Reader"}
        </h1>
        <div className="text-sm text-gray-600">
          Total Sessions:{" "}
          <strong>{userData?.stats?.totalSessions ?? 0}</strong> • Avg Speed:{" "}
          <strong>{userData?.stats?.avgSpeedWPM ?? 0} WPM</strong>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {TEXT_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {Object.values(DIFFICULTY_LEVELS).map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Reading Texts */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Available Texts
        </h2>

        {texts.length === 0 && (
          <p className="text-gray-500">No texts found for this filter.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {texts.map((text) => (
            <Card
              key={text.id}
              title={text.title}
              footer={
                <Button
                  size="sm"
                  onClick={() => onStartReading?.(text)}
                  className="w-full mt-2"
                >
                  Start Reading
                </Button>
              }
            >
              <p className="text-sm text-gray-600 mb-1">
                Difficulty: <strong>{text.difficulty}</strong>
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Category: {text.category} • Words: {text.wordCount}
              </p>
              <p className="text-gray-700 line-clamp-3">{text.content}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Progress Summary */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Overall Progress
        </h2>
        <ProgressBar
          progress={Math.min(userData?.stats?.avgComprehension ?? 0, 100)}
          color="bg-green-500"
        />
      </section>
    </div>
  );
}

