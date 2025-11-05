import { calculateWPM, calculateAdjustedWPM, estimateReadingTime } from "../utils/calculateWPM";

// Example session
const wordCount = 420; // words in text
const startTime = new Date("2025-11-05T12:00:00");
const endTime = new Date("2025-11-05T12:03:00"); // 3 minutes later

const wpm = calculateWPM(wordCount, startTime, endTime); // => 140
const adjusted = calculateAdjustedWPM(wpm, 85);          // => 119
const estTime = estimateReadingTime(wordCount, 200);     // => 126 seconds (~2 mins)

console.log("WPM:", wpm);
console.log("Adjusted WPM:", adjusted);
console.log("Estimated Time:", estTime, "seconds");

