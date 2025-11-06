import React, { useRef } from "react";
import { textVault } from "../utils/textVault";
import { useToast } from "./ToastContainer";

const SidebarMenu = ({ onLoadVaultText }) => {
  const fileInputRef = useRef();
  const { addToast } = useToast();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result || "";
      textVault.save(text);
      addToast("✅ Text uploaded to vault.", "success");
    };
    reader.readAsText(file);
  };

  const handleLoad = () => {
    const text = textVault.load();
    if (!text) {
      addToast("⚠️ No text found in vault. Please upload first.", "error");
      return;
    }
    onLoadVaultText(text);
    addToast("📖 Text loaded from vault.", "success");
  };

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Navigation</h3>
      <button className="sidebar-item">🏠 Home</button>
      <button className="sidebar-item">👤 Profile</button>
      <button className="sidebar-item">🏆 Leaderboard</button>

      <div className="sidebar-section">
        <h4>File Upload</h4>
        <button
          className="sidebar-item"
          onClick={() => fileInputRef.current.click()}
        >
          📤 Upload
        </button>
        <button className="sidebar-item" onClick={handleLoad}>
          📥 Load
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
    </aside>
  );
};

export default SidebarMenu;

