export default function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-panel">
      <h1>TextSpeeder</h1>
      <p>Consistent Reading. Controlled Pace.</p>
      <button onClick={onStart}>Start</button>
    </div>
  );
}
