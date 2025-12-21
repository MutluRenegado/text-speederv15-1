// src/App.jsx

import { useEffect, useState } from "react";

import Background from "./layers/layer1-background/Background";
import Overlay from "./layers/layer2-overlay/Overlay";
import Texture from "./layers/layer3-texture/Texture";
import ContentHost from "./layers/layer4-content/ContentHost";
import GlobalUI from "./layers/layer5-global-ui/GlobalUI";
import AccessibilityLayer from "./layers/layer6-accessibility/AccessibilityLayer";

import IntroScreen from "./pages/Intro/Intro";
import WelcomeScreen from "./pages/Welcome/WelcomeScreen";

import { getInitialTheme, applyTheme } from "./state/themeState";

export default function App() {
  const [view, setView] = useState("intro");
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <>
      {/* LAYERS ONLY AFTER INTRO */}
      {view !== "intro" && (
        <>
          <Background />
          <Overlay />
          <Texture />
        </>
      )}

      {/* FLOW */}
      {view === "intro" && (
        <IntroScreen onContinue={() => setView("welcome")} />
      )}

      {view === "welcome" && (
        <WelcomeScreen
          onStartApp={() => setView("input")}
          onTestApp={() => setView("input")}
          onDocs={() =>
            window.open("https://textspeeder.online/docs", "_blank")
          }
          onLogin={() => alert("Login will be added")}
        />
      )}

      {view !== "intro" && view !== "welcome" && (
        <ContentHost view={view} setView={setView} />
      )}

      {/* TOP / FLOATING UI */}
      <GlobalUI theme={theme} setTheme={setTheme} />
      <AccessibilityLayer />
    </>
  );
}
