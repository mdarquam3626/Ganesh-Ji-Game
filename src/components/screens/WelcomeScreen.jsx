import React, { useState } from "react";
import { ALL_INDIAN_STATES } from "../../data/config";

export function WelcomeScreen({ player, onSavePlayer, onChangePlayer, onStartGame, onOpenHowToPlay }) {
  const [name, setName] = useState(player ? player.name : "");
  const [state, setState] = useState(player ? player.state : "");
  const [errors, setErrors] = useState({ name: false, state: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameValid = Boolean(name.trim());
    const stateValid = Boolean(state);

    setErrors({ name: !nameValid, state: !stateValid });

    if (nameValid && stateValid) {
      onSavePlayer(name.trim(), state);
    }
  };

  return (
    <div className="welcome-grid">
      <div className="welcome-hero">
        <div className="hero-tag">🕉️ Sacred Ganesh Festival • Knowledge &amp; Eco Harmony</div>
        <h1 className="hero-title">
          Unlock with Knowledge,<br />
          <span className="accent">Craft Your Eco Ganesh Murti</span>
        </h1>
        <p className="hero-desc">
          Answer questions on Lord Ganesha and Ganesh Chaturthi traditions. Each quiz level unlocks divine
          natural materials, sacred colors, traditional dhotis, ornate mukuts, and grand decorations to
          sculpt your realistic eco-friendly idol!
        </p>
        <div className="hero-pills">
          <div className="hero-pill">📚 5 Quiz Levels</div>
          <div className="hero-pill">🌱 100% Shadu Clay &amp; Herbal Colors</div>
          <div className="hero-pill">🏆 Eco &amp; Beauty Scoring</div>
          <div className="hero-pill">🥇 All-India Leaderboard</div>
        </div>
      </div>

      <div className="welcome-card">
        <h2 style={{ fontSize: "24px", marginBottom: "18px" }}>
          {player ? "Welcome Back! 👋" : "Player Details"}
        </h2>

        {player ? (
          <div>
            <div className="returning-player-box">
              <p style={{ fontSize: "15px", marginBottom: "6px" }}>
                Playing as <b>{player.name}</b> ({player.state}).
              </p>
              <button
                className="btn-ghost"
                style={{ padding: 0, fontSize: "13px", fontWeight: 700, color: "var(--saffron)" }}
                onClick={onChangePlayer}
              >
                🔄 Change Player
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button className="btn btn-primary" onClick={onStartGame}>
                Start Game →
              </button>
              <button className="btn btn-secondary" onClick={onOpenHowToPlay}>
                📖 How to Play
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="nameInput">👤 Player Name *</label>
              <input
                type="text"
                id="nameInput"
                placeholder="e.g. Aarav Sharma"
                maxLength={32}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
                }}
                required
              />
              {errors.name && <div className="field-error" style={{ display: "block" }}>Please enter your name.</div>}
            </div>

            <div className="form-field">
              <label htmlFor="stateInput">📍 Select State / Union Territory *</label>
              <select
                id="stateInput"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  if (errors.state) setErrors((prev) => ({ ...prev, state: false }));
                }}
                required
              >
                <option value="">-- Select State / UT --</option>
                {ALL_INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.state && (
                <div className="field-error" style={{ display: "block" }}>
                  Please select your state.
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "8px" }}>
              Continue →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
