import React from "react";

/**
 * TextReader component
 * Displays the current word in a large, centered, dark-mode friendly style.
 */
export default function TextReader({ currentWord }) {
  return (
    <div
      style={{
        fontSize: "2.4rem",
        fontWeight: 600,
        color: "#ffd580",
        textAlign: "center",
        letterSpacing: "0.04em",
        transition: "all 0.25s ease",
        minHeight: "3.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {currentWord || "—"}
    </div>
  );
}
