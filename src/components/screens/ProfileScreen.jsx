import React from "react";
import { ACHIEVEMENTS_LIST } from "../../data/config";

export function ProfileScreen({ player, progress, achievements, onChangePlayer }) {
  const earnedAch = achievements || [];

  return (
    <div className="profile-wrap">
      <div className="profile-header-card">
        <div className="profile-avatar">🕉️</div>
        <div className="profile-info" style={{ flex: 1 }}>
          <h2>{player ? player.name : "Guest Player"}</h2>
          <p>
            📍 State: {player ? player.state : "Unknown"} • Games Played:{" "}
            {progress?.gamesPlayed || 0}
          </p>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "8px",
              flexWrap: "wrap"
            }}
          >
            <span className="hero-pill" style={{ fontSize: "12px", padding: "4px 12px" }}>
              Best Score: {progress?.bestScore || 0}
            </span>
            <span className="hero-pill" style={{ fontSize: "12px", padding: "4px 12px" }}>
              Best Eco: {progress?.bestEco || 0}
            </span>
            <span className="hero-pill" style={{ fontSize: "12px", padding: "4px 12px" }}>
              Best Beauty: {progress?.bestBeauty || 0}
            </span>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={onChangePlayer}>
          🔄 Change Player
        </button>
      </div>

      <h3 style={{ fontSize: "22px", marginBottom: "16px" }}>🏆 Achievements</h3>
      <div className="achievements-grid">
        {ACHIEVEMENTS_LIST.map((ach) => {
          const isEarned = earnedAch.includes(ach.id);
          return (
            <div
              key={ach.id}
              className={`achieve-card ${isEarned ? "" : "locked"}`}
            >
              <div className="achieve-icon">{ach.icon}</div>
              <div className="achieve-text">
                <h4>
                  {ach.name} {isEarned ? "✅" : "🔒"}
                </h4>
                <p>{ach.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
