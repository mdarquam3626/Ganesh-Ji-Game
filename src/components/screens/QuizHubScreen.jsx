import React from "react";
import { QUIZ_LEVELS_CONFIG } from "../../data/config";

export function QuizHubScreen({ progress, onStartLevel, onOpenStudio }) {
  const unlockedLevels = progress?.unlockedLevels || [1];
  const levelScores = progress?.levelScores || {};

  return (
    <div>
      <div className="hub-header">
        <h2>Ganesh Ji Quiz Hub</h2>
        <p>
          Answer correctly to unlock higher levels and divine murti crafting items.
          Achieving the required passing score is mandatory for each stage.
        </p>
      </div>

      <div className="hub-levels-grid">
        {QUIZ_LEVELS_CONFIG.map((lvl) => {
          const isUnlocked = unlockedLevels.includes(lvl.id);
          const lastScore = levelScores[lvl.id];
          const isPassed = lastScore !== undefined && lastScore >= lvl.reqPct;

          return (
            <div key={lvl.id} className={`level-card ${isUnlocked ? "" : "locked"}`}>
              <div className="level-badge-top">
                <span className="level-num-tag">
                  Level {lvl.id} • Required: {lvl.reqPct}%
                </span>
                <span
                  className={`level-status-pill ${
                    isPassed ? "status-cleared" : isUnlocked ? "status-ready" : "status-locked"
                  }`}
                >
                  {isPassed
                    ? `✅ Passed (${lastScore}%)`
                    : isUnlocked
                    ? "🔓 Ready"
                    : "🔒 Locked"}
                </span>
              </div>

              <h3>{lvl.name}</h3>
              <p className="level-desc">{lvl.desc}</p>

              <div className="level-unlocks-box">
                <b>Unlocks:</b>
                {lvl.unlockTitle}
              </div>

              <button
                className={`btn ${
                  isPassed ? "btn-leaf" : isUnlocked ? "btn-primary" : "btn-secondary"
                }`}
                disabled={!isUnlocked}
                onClick={() => onStartLevel(lvl.id)}
              >
                {isPassed
                  ? "🔄 Play Again"
                  : isUnlocked
                  ? "Start Quiz →"
                  : "🔒 Complete Previous Level"}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          className="btn btn-gold"
          style={{ fontSize: "16px", padding: "14px 36px" }}
          onClick={onOpenStudio}
        >
          🎨 Go to Murti Studio →
        </button>
      </div>
    </div>
  );
}
