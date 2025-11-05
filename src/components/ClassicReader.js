// src/components/ClassicReader.js
import React, { useEffect, useRef } from "react";
import { useSession } from "../hooks/useSession";
import { calculateWPM } from "../utils/calculateWPM";

/**
 * ClassicReader
 * Wraps the original TextSpeeder engine inside React.
 * Works inside your ReadingSessionScreen and integrates with Firestore sessions.
 *
 * Props:
 * - text (string): reading text content
 * - onFinish: (results) => void
 */
export default function ClassicReader({ text, onFinish }) {
  const containerRef = useRef(null);
  const { updateSessionData, endSession, currentSession } = useSession();

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a shadow DOM sandbox so vanilla JS doesn’t affect React
    const shadow = containerRef.current.attachShadow({ mode: "open" });
    const div = document.createElement("div");

    // Basic layout
    div.innerHTML = `
      <div id="textInput" style="display:none">${text}</div>
      <div id="flowScreen" class="screen flow"></div>
      <div id="rsvpScreen" class="screen rsvp"></div>
      <div id="marquee"></div>
      <div id="rsvpWord"></div>
      <button id="pauseBtn">Pause</button>
      <button id="startOverBtn">Restart</button>
    `;
    shadow.appendChild(div);

    // Inject the full vanilla JS engine
    const script = document.createElement("script");
    script.textContent = `
      /* =======================================================
         ⚡ TextSpeeder Vanilla Engine (Embedded)
         ======================================================= */
      document.addEventListener("DOMContentLoaded", () => {
        console.log("✅ TextSpeeder Embedded Engine Running");

        const textInput = document.getElementById("textInput");
        const flowScreen = document.getElementById("flowScreen");
        const rsvpScreen = document.getElementById("rsvpScreen");
        const marquee = document.getElementById("marquee");
        const rsvpWord = document.getElementById("rsvpWord");
        const pauseBtn = document.getElementById("pauseBtn");
        const startOverBtn = document.getElementById("startOverBtn");

        let words = [];
        let pos = 0;
        let isPaused = false;
        let animationId = null;
        let currentIndex = 0;
        let speed = 1;
        let startTime = null;

        /* ---------- Utility ---------- */
        function showToast(msg) {
          console.log("Toast:", msg);
        }

        /* ---------- Render Words ---------- */
        function renderWords() {
          words = textInput.textContent.trim().split(/\\s+/);
          cancelAnimationFrame(animationId);
          startTime = Date.now();

          // Flow mode
          flowScreen.style.display = "flex";
          rsvpScreen.style.display = "none";
          marquee.textContent = "";

          words.forEach((word) => {
            const span = document.createElement("span");
            span.className = "word";
            span.textContent = word + " ";
            marquee.appendChild(span);
          });

          pos = flowScreen.clientWidth;
          marquee.style.transform = \`translateX(\${pos}px)\`;
          requestAnimationFrame(() => animateFlow());
        }

        /* ---------- Flow Animation ---------- */
        function animateFlow() {
          if (isPaused) return;
          pos -= speed;
          marquee.style.transform = \`translateX(\${pos}px)\`;
          if (pos + marquee.offsetWidth <= 0) {
            pos = flowScreen.clientWidth;
          }
          animationId = requestAnimationFrame(animateFlow);
        }

        /* ---------- RSVP Animation ---------- */
        function animateRSVP() {
          if (isPaused || currentIndex >= words.length) {
            finishSession();
            return;
          }
          rsvpWord.textContent = words[currentIndex++];
          const interval = (60000 / 250) * 0.2;
          setTimeout(() => {
            if (!isPaused && currentIndex < words.length) animateRSVP();
            else if (currentIndex >= words.length) finishSession();
          }, interval);
        }

        /* ---------- Start / Restart ---------- */
        function startAnimation() {
          cancelAnimationFrame(animationId);
          pos = flowScreen.clientWidth;
          isPaused = false;
          startTime = Date.now();
          renderWords();
          showToast("▶️ Started");
        }

        function finishSession() {
          const endTime = Date.now();
          const wordCount = words.length;
          const detail = { startTime, endTime, wordCount };
          window.dispatchEvent(new CustomEvent("sessionFinished", { detail }));
          showToast("✅ Reading finished!");
        }

        /* ---------- Buttons ---------- */
        pauseBtn.addEventListener("click", () => {
          isPaused = !isPaused;
          pauseBtn.textContent = isPaused ? "Resume" : "Pause";
          if (!isPaused) startAnimation();
        });

        startOverBtn.addEventListener("click", () => {
          currentIndex = 0;
          isPaused = false;
          startAnimation();
        });

        // Auto start when loaded
        startAnimation();
      });
    `;
    shadow.appendChild(script);

    // Cleanup when component unmounts
    return () => {
      shadow.innerHTML = "";
    };
  }, [text]);

  /* ---------- React listener for completion ---------- */
  useEffect(() => {
    const handleFinish = async (e) => {
      if (!currentSession) return;
      const { startTime, endTime, wordCount } = e.detail;
      const wpm = calculateWPM(wordCount, startTime, endTime);

      try {
        await updateSessionData({ wpm });
        await endSession({ wpm });
        onFinish?.({ wpm });
      } catch (err) {
        console.error("Error saving session:", err);
      }
    };

    window.addEventListener("sessionFinished", handleFinish);
    return () => window.removeEventListener("sessionFinished", handleFinish);
  }, [currentSession, onFinish]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] border rounded-lg overflow-hidden bg-gray-50"
    />
  );
}
