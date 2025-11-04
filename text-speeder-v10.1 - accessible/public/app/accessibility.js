/* =======================================================
   ♿ ACCESSIBILITY SIDEBAR CONTROLLER (WITH STATUS COLORS)
   ======================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const accessibilityFrame = document.getElementById("accessibilityFrame");
  const accessibilityToggle = document.getElementById("accessibilityToggle");
  const closeAccessibility = document.getElementById("closeAccessibility");
  const resetAccessibility = document.getElementById("resetAccessibility");
  const accessibilityButtons = document.querySelectorAll(".accessibility-panel button[data-mode]");
  const overlay = document.getElementById("accessibilityOverlay");
  const accessibilityStatus = document.getElementById("accessibilityStatus");

  if (!accessibilityFrame || !accessibilityToggle) {
    console.warn("Accessibility sidebar not found in DOM.");
    return;
  }

  /* ---------------- TOAST CREATOR ---------------- */
  const showToast = (message, duration = 2500) => {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("visible"));
    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  /* ---------------- MODE NAMES & COLORS ---------------- */
  const modeInfo = {
    "accessible-mode": { name: "Accessible", color: "#00cc66" }, // green
    "colorblind-deuteranopia": { name: "Deuteranopia", color: "#ffcc00" }, // yellow
    "colorblind-protanopia": { name: "Protanopia", color: "#ff4444" }, // red
    "colorblind-tritanopia": { name: "Tritanopia", color: "#0099ff" }, // blue
    "": { name: "Default", color: "var(--text-color)" }
  };

  const updateAccessibilityStatus = (modeKey) => {
    const info = modeInfo[modeKey] || modeInfo[""];
    if (accessibilityStatus) {
      accessibilityStatus.textContent = `(${info.name})`;
      accessibilityStatus.style.color = info.color;
    }
  };

  /* ---------------- SIDEBAR CONTROLS ---------------- */
  accessibilityToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    accessibilityFrame.classList.toggle("open");
    overlay?.classList.toggle("visible");
  });

  closeAccessibility?.addEventListener("click", () => {
    accessibilityFrame.classList.remove("open");
    overlay?.classList.remove("visible");
  });

  document.addEventListener("click", (e) => {
    if (
      accessibilityFrame.classList.contains("open") &&
      !accessibilityFrame.contains(e.target) &&
      !accessibilityToggle.contains(e.target)
    ) {
      accessibilityFrame.classList.remove("open");
      overlay?.classList.remove("visible");
    }
  });

  /* ---------------- ACCESSIBILITY MODE HANDLING ---------------- */
  function resetAccessibilityModes(show = true) {
    document.body.classList.remove(
      "accessible-mode",
      "colorblind-deuteranopia",
      "colorblind-protanopia",
      "colorblind-tritanopia"
    );
    localStorage.removeItem("accessibilityMode");
    updateAccessibilityStatus("");
    if (show) showToast("Accessibility settings reset to default");
  }

  accessibilityButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      resetAccessibilityModes(false);
      document.body.classList.add(mode);
      localStorage.setItem("accessibilityMode", mode);
      updateAccessibilityStatus(mode);
      showToast(`Accessibility mode: ${modeInfo[mode]?.name || "Default"}`);
    });
  });

  resetAccessibility?.addEventListener("click", () => resetAccessibilityModes(true));

  /* ---------------- RESTORE ---------------- */
  const savedMode = localStorage.getItem("accessibilityMode");
  if (savedMode) {
    document.body.classList.add(savedMode);
    updateAccessibilityStatus(savedMode);
    showToast(`Restored mode: ${modeInfo[savedMode]?.name}`);
  } else {
    updateAccessibilityStatus("");
  }
});
