// src/screens/LeaderboardScreen.js

import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import ProgressBar from "../components/UI/ProgressBar";
import { getLeaderboard } from "../services/leaderboardService";

/**
 * LeaderboardScreen
 *
 * Shows leaderboard data for selected period (daily / weekly / monthly)
 */
export default function LeaderboardScreen({ onBack }) {
  const [period, setPeriod] = useState("weekly");
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async (p) => {
    try {
      setLoading(true);
      const data = await getLeaderboard(p);
      setLeaderboard(data);
    } catch (err) {
      console.error("❌ Error fetching leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(period);
  }, [period]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">🏆 Leaderboard</h1>
        <Button variant="secondary" onClick={onBack}>
          ← Back
        </Button>
      </header>

      {/* Period Selector */}
      <div className="flex gap-3">
        {["daily", "weekly", "monthly"].map((p) => (
          <Button
            key={p}
            variant={p === period ? "primary" : "secondary"}
            onClick={() => setPeriod(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </Button>
        ))}
      </div>

      {/* Leaderboard List */}
      {loading ? (
        <div className="flex justify-center py-10">
          <p className="text-gray-600 animate-pulse">Loading leaderboard...</p>
        </div>
      ) : !leaderboard || !leaderboard.topUsers?.length ? (
        <div className="text-center py-10 text-gray-500">
          No leaderboard data found for this period.
        </div>
      ) : (
        <Card title={`${period.charAt(0).toUpperCase() + period.slice(1)} Rankings`}>
          <ul className="divide-y divide-gray-200">
            {leaderboard.topUsers.map((user, index) => (
              <li
                key={user.userId}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-700 w-6 text-center">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">
                      {user.displayName || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.avgWPM} WPM • {user.avgComprehension}% accuracy
                    </p>
                  </div>
                </div>

                <div className="w-32">
                  <ProgressBar
                    progress={Math.min((user.avgWPM / 600) * 100, 100)}
                    color={
                      index === 0
                        ? "bg-yellow-400"
                        : index === 1
                        ? "bg-gray-300"
                        : index === 2
                        ? "bg-orange-400"
                        : "bg-blue-500"
                    }
                    showLabel={false}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Timestamp */}
      {leaderboard && leaderboard.updatedAt && (
        <p className="text-xs text-gray-400 text-center mt-4">
          Last updated:{" "}
          {leaderboard.updatedAt.toDate
            ? leaderboard.updatedAt.toDate().toLocaleString()
            : new Date(leaderboard.updatedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}

