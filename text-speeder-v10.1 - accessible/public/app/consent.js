/* ==========================================================
   📜 Consent Manager — Safe + Connected to GTM
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const consentBanner = document.getElementById("consentBanner"); // ✅ ID from HTML above
  const acceptBtn = document.getElementById("acceptCookies");
  const rejectBtn = document.getElementById("rejectCookies");

  // ✅ Exit early if the banner doesn't exist
  if (!consentBanner) {
    console.warn("⚠️ Consent banner not found in DOM. Skipping consent.js setup.");
    return;
  }

  // ✅ Restore state from localStorage
  const savedConsent = localStorage.getItem("consentMode");
  if (savedConsent) {
    consentBanner.classList.remove("show");
  } else {
    consentBanner.classList.add("show");
  }

  // ✅ Helper: update banner visibility safely
  function hideBanner() {
    if (consentBanner && consentBanner.classList.contains("show")) {
      consentBanner.classList.remove("show");
    }
  }

  // ✅ Accept
  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      if (typeof acceptConsent === "function") acceptConsent();
      hideBanner();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "consent_accepted" });
    });
  }

  // ✅ Reject
  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      if (typeof rejectConsent === "function") rejectConsent();
      hideBanner();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "consent_rejected" });
    });
  }
});
