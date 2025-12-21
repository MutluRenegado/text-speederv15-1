export default function GlobalUI({ theme, setTheme }) {
  return (
    <div className="layer layer-global-ui">
      <button
        className="theme-toggle"
        onClick={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
        aria-label="Toggle light and dark mode"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
