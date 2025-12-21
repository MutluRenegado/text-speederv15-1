import "./intro.css";
import { useEffect, useState } from "react";

export default function IntroScreen({ onContinue }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const id =
      "requestIdleCallback" in window
        ? requestIdleCallback(() => setShowVideo(true))
        : setTimeout(() => setShowVideo(true), 300);

    return () => {
      if (typeof id === "number") clearTimeout(id);
    };
  }, []);

  return (
    <div className="intro-bg">
      {showVideo && (
        <video
          className="intro-video"
          src="/intro/intro.mp4"
          poster="/intro/poster.jpg"
          autoPlay
          muted
          playsInline
          preload="none"
        />
      )}

      <div className="intro-overlay" />

      <div className="intro-content">
        <button className="primary" onClick={onContinue}>
          Start
        </button>
        <button className="secondary" onClick={onContinue}>
          Skip Intro
        </button>
      </div>
    </div>
  );
}
