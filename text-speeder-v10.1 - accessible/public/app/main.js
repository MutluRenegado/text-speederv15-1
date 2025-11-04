/* =======================================================
   ⚡ TextSpeeder Main Controller — Instant Actions
   ======================================================= */
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ TextSpeeder loaded");

  // -------- Element References --------
  const textInput = document.getElementById("textInput");
  const fileInput = document.getElementById("fileInput");
  const modeSelect = document.getElementById("modeSelect");
  const wpmInput = document.getElementById("wpmInput");
  const wpmSlider = document.getElementById("wpmSlider");
  const flowScreen = document.getElementById("flowScreen");
  const rsvpScreen = document.getElementById("rsvpScreen");
  const marquee = document.getElementById("marquee");
  const rsvpWord = document.getElementById("rsvpWord");
  const pauseBtn = document.getElementById("pauseBtn");
  const startOverBtn = document.getElementById("startOverBtn");
  const loadBtn = document.getElementById("loadBtn");
  const toggleLinesBtn = document.getElementById("toggleLinesBtn");
  const hideScreenBtn = document.getElementById("hideScreenBtn");
  const fontType = document.getElementById("fontType");
  const fontSize = document.getElementById("fontSize");
  const fontColor = document.getElementById("fontColor");
  const bgColor = document.getElementById("bgColor");
  const themeBtn = document.getElementById("themeBtn");

// ✅ Force right alignment for Flow mode (fixes “starts in middle” issue)
flowScreen.style.justifyContent = "flex-end";
marquee.style.textAlign = "right";
marquee.style.direction = "rtl";


  // -------- State Variables --------
  let words = [];
  let pos = 0;
  let isPaused = false;
  let animationId = null;
  let currentIndex = 0;
  let speed = 1;
  let focusMode = false;

  /* ---------- Toast Utility ---------- */
  function showToast(message, duration = 2000) {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("visible"));
    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* ---------- Theme Handling ---------- */
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.dataset.theme = savedTheme;
  themeBtn.textContent = savedTheme === "dark" ? "Dark / Light" : "Light / Dark";

  themeBtn.addEventListener("click", () => {
    const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    themeBtn.textContent = newTheme === "dark" ? "Dark / Light" : "Light / Dark";
    showToast(`Theme: ${newTheme}`);
  });


/* ---------- File Upload Handler (No Auto-Load) ---------- */
const fileLabel = document.getElementById("fileLabel");

// 🧭 Show accepted formats initially
if (fileLabel) {
  fileLabel.innerHTML = "📂 No file chosen — accepted: .txt, .pdf, .doc, .docx";
}

// When clicked, remind user of accepted formats
fileInput.addEventListener("click", () => {
  if (fileLabel) {
    fileLabel.innerHTML = "📂 No file chosen — accepted: .txt, .pdf, .doc, .docx";
  }
});

// When a file is chosen, show its name and load text
fileInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) {
    if (fileLabel)
      fileLabel.innerHTML = "📂 No file chosen — accepted: .txt, .pdf, .doc, .docx";
    return;
  }

  // Display selected file name
  if (fileLabel)
    fileLabel.innerHTML = `📄 Selected: <strong>${file.name}</strong>`;

  const fileName = file.name.toLowerCase();
  const reader = new FileReader();

  /* ---------------- TXT ---------------- */
  if (fileName.endsWith(".txt")) {
    reader.onload = (e) => {
      textInput.value = e.target.result;
      showToast("📄 Text file loaded — press 'Load' to begin");
    };
    reader.readAsText(file);
  }

  /* ---------------- PDF ---------------- */
  else if (fileName.endsWith(".pdf")) {
    const pdfjsLib = window["pdfjsLib"];
    if (!pdfjsLib) {
      showToast("⚠️ PDF.js not found");
      return;
    }

    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n\n";
        }
        textInput.value = fullText.trim();
        showToast("📘 PDF loaded — press 'Load' to begin");
      } catch (err) {
        console.error(err);
        showToast("❌ Failed to load PDF");
      }
    };
    reader.readAsArrayBuffer(file);
  }

  /* ---------------- DOCX ---------------- */
  else if (fileName.endsWith(".docx")) {
    if (!window.mammoth) {
      showToast("⚠️ Mammoth.js missing");
      return;
    }

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        textInput.value = result.value.trim();
        showToast("🧾 DOCX loaded — press 'Load' to begin");
      } catch (err) {
        console.error(err);
        showToast("❌ Failed to load DOCX");
      }
    };
    reader.readAsArrayBuffer(file);
  }

  /* ---------------- Unsupported ---------------- */
  else {
    showToast("❌ Unsupported file format");
  }
}); // ✅ properly closed listener
  /* ---------- Screen Management ---------- */
  function updateActiveScreen() {
    if (modeSelect.value === "rsvp") {
      rsvpScreen.style.display = "flex";
      flowScreen.style.display = "none";
    } else {
      flowScreen.style.display = "flex";
      rsvpScreen.style.display = "none";
    }
  }

/* ---------- Render Words ---------- */
function renderWords() {
  words = textInput.value.trim().split(/\s+/);
  cancelAnimationFrame(animationId);

  if (modeSelect.value === "rsvp") {
    rsvpScreen.style.display = "flex";
    flowScreen.style.display = "none";
    currentIndex = parseInt(localStorage.getItem("readingIndex") || "0", 10);
    rsvpWord.textContent = words[currentIndex] || "";
    rsvpScreen.style.background = "#004466"; // Deep Blue
    rsvpWord.style.color = "#000"; // Black text
  } else {
    flowScreen.style.display = "flex";
    rsvpScreen.style.display = "none";
    marquee.textContent = "";

    words.forEach((word) => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = word + " ";
      marquee.appendChild(span);
    });

    // ✅ Start from right edge, perfectly aligned
    pos = flowScreen.clientWidth;
    marquee.style.transform = `translateX(${pos}px)`;

    // Force reflow to ensure layout is updated before animation starts
    void marquee.offsetWidth;

    // ✅ Start scrolling right away
    requestAnimationFrame(() => animateFlow());
  }

  // ✅ Always update the visible screen mode
  updateActiveScreen();
}

/* ---------- Speed Control (fixed and balanced) ---------- */
function updateSpeed() {
  const val = parseInt(wpmInput.value) || 200; // fallback for invalid input
  wpmSlider.value = val;

  // ⚙️ Adjusted: smoother scrolling for Flow, accurate timing for RSVP
  speed = val / 300; // lower denominator = faster scroll; 600 is smooth baseline

  // Prevent overly slow or NaN speeds
  if (speed < 0.05) speed = 0.05;
  if (isNaN(speed)) speed = 1;
}

// Keep slider ↔ input in sync instantly
wpmSlider.addEventListener("input", () => {
  wpmInput.value = wpmSlider.value;
  updateSpeed();
});

wpmInput.addEventListener("input", () => {
  wpmSlider.value = wpmInput.value;
  updateSpeed();
});


 /* ---------- Flow Animation ---------- */
function animateFlow() {
  if (isPaused) return;

  // Move text left
  pos -= speed;
  marquee.style.transform = `translateX(${pos}px)`;

  // ✅ When text completely leaves left side, restart at right edge
  if (pos + marquee.offsetWidth <= 0) {
    pos = flowScreen.clientWidth; // restart from right edge
  }

  // Optional: Highlight mode (unchanged)
  if (modeSelect.value === "flow-highlight") {
    const rect = flowScreen.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const spans = marquee.querySelectorAll(".word");
    spans.forEach((s) => s.classList.remove("active"));
    for (const s of spans) {
      const sRect = s.getBoundingClientRect();
      if (sRect.left <= centerX && sRect.right >= centerX) {
        s.classList.add("active");
        break;
      }
    }
  }

  animationId = requestAnimationFrame(animateFlow);
}

  /* ---------- RSVP Animation ---------- */
  function animateRSVP() {
    if (isPaused || currentIndex >= words.length) return;
    rsvpWord.textContent = words[currentIndex++];
    localStorage.setItem("readingIndex", currentIndex);
const interval = (60000 / wpmInput.value) * 0.15; // 🚀 80% faster start


    setTimeout(() => {
      if (!isPaused && currentIndex < words.length) animateRSVP();
    }, interval);
  }

  function startAnimation() {
    cancelAnimationFrame(animationId);
    updateSpeed();
    if (modeSelect.value === "rsvp") animateRSVP();
    else animationId = requestAnimationFrame(animateFlow);
  }
/* ---------- Button Actions ---------- */
loadBtn.addEventListener("click", () => {
  if (!textInput.value.trim()) return showToast("⚠️ Enter or upload text first!");
  renderWords();
  isPaused = false;
  pauseBtn.textContent = "Pause";

  // Prompt to arrange lines (Flow only)
  if (modeSelect.value !== "rsvp") showToast("📏 Please arrange your lines before reading");

  startAnimation();

  // ✅ Delay “Started” toast slightly to avoid overlap
  setTimeout(() => showToast("▶️ Started"), 1500);
});


  pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    showToast(isPaused ? "⏸️ Paused" : "▶️ Resumed");
    if (!isPaused) startAnimation();
  });

  startOverBtn.addEventListener("click", () => {
    isPaused = false;
    currentIndex = 0;
    pos = flowScreen.clientWidth;
    localStorage.removeItem("readingPos");
    localStorage.removeItem("readingIndex");
    pauseBtn.textContent = "Pause";
    renderWords();
    startAnimation();
    showToast("🔄 Restarted");
  });

  toggleLinesBtn.addEventListener("click", () => {
    const linesVisible = toggleLinesBtn.textContent === "Hide Lines";
    document.querySelectorAll(".rsvp-line, .flow-line")
      .forEach(line => line.style.display = linesVisible ? "none" : "block");
    toggleLinesBtn.textContent = linesVisible ? "Show Lines" : "Hide Lines";
    showToast(linesVisible ? "Lines Hidden" : "Lines Visible");
  });


/* ---------- Hide Screen / Focus Mode ---------- */
hideScreenBtn.addEventListener("click", () => {
  focusMode = !focusMode;
  document.body.classList.toggle("focus-mode", focusMode);

  // Mark active screen
  if (modeSelect.value === "rsvp") {
    rsvpScreen.classList.add("active-screen");
    flowScreen.classList.remove("active-screen");
  } else {
    flowScreen.classList.add("active-screen");
    rsvpScreen.classList.remove("active-screen");
  }

  hideScreenBtn.textContent = focusMode ? "Show Controls" : "Hide Screen";
  if (focusMode) window.scrollTo({ top: 0, behavior: "smooth" });
  showToast(focusMode ? "🧘 Focus Mode On" : "🧭 Focus Mode Off");
});





  /* ---------- Keyboard Shortcuts ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      pauseBtn.click();
    } else if (e.code === "Enter") {
      e.preventDefault();
      startOverBtn.click();
    } else if (e.key.toLowerCase() === "h") {
      hideScreenBtn.click();
    }
  });

  /* ---------- Restore Session ---------- */
  if (localStorage.getItem("readingPos") || localStorage.getItem("readingIndex")) {
    showToast("📖 Restored previous session");
    renderWords();
  }

/* ---------- Make Flow Lines Movable ---------- */
document.querySelectorAll(".flow-line").forEach((line) => {
  let isDragging = false;

  line.addEventListener("mousedown", (e) => {
    isDragging = true;
    document.body.style.userSelect = "none"; // prevent text selection
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const rect = flowScreen.getBoundingClientRect();
    let newX = e.clientX - rect.left;
    if (newX < 0) newX = 0;
    if (newX > rect.width) newX = rect.width;
    line.style.left = `${newX}px`;
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.userSelect = "auto";
      showToast("📏 Line position saved");
    }
  });
});




  console.log("✅ Ready and responsive");
});
