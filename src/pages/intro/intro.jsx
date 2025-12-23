import Slide from "../../components/Slide/Slide";
import "./intro.css";

export default function Intro({ onContinue, theme }) {
  // 🔒 Normalize theme (dark is default)
  const safeTheme = theme === "light" ? "light" : "dark";

  // 🔁 Pick correct video
  const videoSrc =
    safeTheme === "light"
      ? "/intro/input-light.mp4"
      : "/intro/input-dark.mp4";

  return (
    <Slide>
      <div className={`intro-bg ${safeTheme}`}>
        <video
          key={safeTheme}        // force reload when theme changes
          className="intro-video"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />

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
    </Slide>
  );
}
