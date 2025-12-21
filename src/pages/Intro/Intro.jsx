import Slide from "../../components/Slide/Slide";
import "./intro.css";

export default function Intro({ onContinue }) {
  return (
    <Slide>
      <div className="intro">
        <video
          className="intro-video"
          src="/intro.mp4"
          autoPlay
          muted
          playsInline
        />

        <div className="intro-overlay" />

        <div className="intro-ui">
          <div className="intro-title">
            <h1>Welcome to TextSpeeder</h1>
            <p>Read faster. Focus deeper. No chaos.</p>
          </div>

          <div className="intro-actions">
            <button className="btn primary" onClick={onContinue}>
              Start
            </button>
            <button className="btn ghost" onClick={onContinue}>
              Skip Intro
            </button>
          </div>
        </div>
      </div>
    </Slide>
  );
}
