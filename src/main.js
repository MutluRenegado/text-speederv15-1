// src/main.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global CSS (Tailwind or your stylesheet)
import "./index.css";

// Firebase initialization
import "./firebase/firebase.config";

// Auth provider
import { AuthProvider } from "./contexts/AuthContext";

// Router
import { BrowserRouter } from "react-router-dom";

// ----------------------------
// Render App with Providers
// ----------------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
