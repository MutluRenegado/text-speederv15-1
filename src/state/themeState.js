const THEME_KEY = "textspeeder-theme";

export function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  return stored ? stored : "dark";
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}
