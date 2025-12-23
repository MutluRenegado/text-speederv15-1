// src/App.jsx

import { useEffect, useState } from "react";

import Background from "./layers/layer1-background/Background";
import Overlay from "./layers/layer2-overlay/Overlay";
import Texture from "./layers/layer3-texture/Texture";
import ContentHost from "./layers/layer4-content/ContentHost";
import GlobalUI from "./layers/layer5-global-ui/GlobalUI";
import AccessibilityLayer from "./layers/layer6-accessibility/AccessibilityLayer";

import { getInitialTheme, applyTheme } from "./state/themeState";

export default function App() {
  // intro → welcome → app/test
  const [view, setView] = useState("intro");
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <>
      {/* GLOBAL LAYERS (always present) */}
      <Background />
      <Overlay />
      <Texture />

      {/* SINGLE CONTENT ORCHESTRATOR */}
      <ContentHost
        view={view}
        onNavigate={setView}
        theme={theme}
      />

      {/* GLOBAL UI */}
      <GlobalUI theme={theme} setTheme={setTheme} />
      <AccessibilityLayer />
    </>
  );
}
