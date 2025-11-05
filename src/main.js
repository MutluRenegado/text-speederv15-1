// src/main.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ Import global CSS (Tailwind)
import "./index.css";

// ✅ Import Firebase setup
import "./firebase/firebaseConfig";

// ✅ Import Auth Provider (optional if you have useAuth context)
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

