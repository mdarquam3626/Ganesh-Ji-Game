import React from "react";

export function Navbar({
  player,
  soundEnabled,
  onToggleSound,
  onChangePlayer,
  onNavigate,
  currentScreen
}) {
  return (
    <header className="topbar">
      <div
        className="brand"
        onClick={() => onNavigate(player ? "hub" : "welcome")}
        role="button"
        tabIndex={0}
      >
        <div className="brand-icon">🕉️</div>
        <div className="brand-text">
          <h1>Ganesh Ji Eco Murti Maker</h1>
          <span>Sacred Knowledge + Eco-Friendly Ganesh Festival</span>
        </div>
      </div>

      <div className="topbar-right">
        {player && (
          <div className="player-badge">
            <div className="p-icon">👤</div>
            <span>
              {player.name} ({player.state})
            </span>
            <button
              className="btn-ghost"
              style={{ padding: "0 4px", fontSize: "11px" }}
              onClick={onChangePlayer}
            >
              Change
            </button>
          </div>
        )}

        <button
          className={`bgm-pill ${!soundEnabled ? "muted" : ""}`}
          onClick={onToggleSound}
          title={
            soundEnabled
              ? "Sukhkarta Dukhharta (Violin) — Click to Mute"
              : "Sound & Music Muted — Click to Play (30%)"
          }
        >
          <span className="bgm-note">{soundEnabled ? "🔊" : "🔇"}</span>
          <span className="bgm-title">
            {soundEnabled ? "Sukhkarta Dukhharta" : "Music Muted"}
          </span>
          <span
            className="bgm-vol"
            style={
              !soundEnabled
                ? { background: "#fee2e2", color: "#991b1b" }
                : undefined
            }
          >
            {soundEnabled ? "30%" : "0%"}
          </span>
        </button>

        <button
          className={`nav-link-btn ${currentScreen === "tutorial" ? "active" : ""}`}
          onClick={() => onNavigate("tutorial")}
        >
          📖 How to Play
        </button>
        <button
          className={`nav-link-btn ${currentScreen === "hub" || currentScreen === "quiz" || currentScreen === "quiz_result" ? "active" : ""}`}
          onClick={() => onNavigate("hub")}
        >
          📚 Quizzes
        </button>
        <button
          className={`nav-link-btn ${currentScreen === "studio" ? "active" : ""}`}
          onClick={() => onNavigate("studio")}
        >
          🎨 Murti Studio
        </button>
        <button
          className={`nav-link-btn ${currentScreen === "leaderboard" ? "active" : ""}`}
          onClick={() => onNavigate("leaderboard")}
        >
          🏆 Leaderboard
        </button>
        <button
          className={`nav-link-btn ${currentScreen === "profile" ? "active" : ""}`}
          onClick={() => onNavigate("profile")}
        >
          👤 Profile
        </button>
      </div>
    </header>
  );
}
