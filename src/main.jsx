import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // IMPORTANT: use .jsx extension

// Global styles
import "./index.css";

// Firebase initialization (your config file)
import "./firebase/firebase.config";

// Auth provider
import { AuthProvider } from "./contexts/AuthContext";

// Router
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
