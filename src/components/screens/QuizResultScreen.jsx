import React from "react";
import { QUIZ_LEVELS_CONFIG } from "../../data/config";

export function QuizResultScreen({
  result,
  onGoToStudio,
  onPlayNextLevel,
  onRetryLevel,
  onViewHub
}) {
  if (!result) {
    return <div className="quiz-result-wrap">No result available.</div>;
  }

  const lvlCfg = QUIZ_LEVELS_CONFIG.find((l) => l.id === result.level);
  const reqPct = lvlCfg ? lvlCfg.reqPct : 60;
  const passed = result.percentage >= reqPct;
  const hasNextLevel = result.level < 5;

  return (
    <div className="quiz-result-wrap">
      <div className="result-trophy">{passed ? "🎉" : "📖"}</div>
      <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
        {passed ? "Congratulations! You Passed!" : "Please Try Again"}
      </h2>
      <p style={{ color: "var(--ink-soft)", marginBottom: "24px" }}>
        {lvlCfg ? lvlCfg.name : ""} • Passing Score Required: {reqPct}%
      </p>

      <div className="score-circle">
        <div className="pct">{result.percentage}%</div>
        <div className="sub">
          {result.correct} of {result.total} Correct
        </div>
      </div>

      {passed ? (
        <div className="unlock-fanfare-card">
          <div className="u-icon">✨</div>
          <div>
            <h4>New Crafting Feature Unlocked!</h4>
            <p>
              {lvlCfg ? lvlCfg.unlockTitle : ""} is now available in the Murti
              Studio.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="unlock-fanfare-card"
          style={{ background: "#fee2e2", borderColor: "#fca5a5" }}
        >
          <div className="u-icon">🔒</div>
          <div>
            <h4 style={{ color: "#991b1b" }}>Not Unlocked Yet</h4>
            <p style={{ color: "#7f1d1d" }}>
              Achieve at least {reqPct}% to unlock this crafting tier.
            </p>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "24px"
        }}
      >
        {passed ? (
          <>
            <button className="btn btn-gold" onClick={onGoToStudio}>
              🎨 Go to Murti Studio →
            </button>
            {hasNextLevel ? (
              <button className="btn btn-secondary" onClick={onPlayNextLevel}>
                📚 Play Next Quiz (Level {result.level + 1})
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={onViewHub}>
                View All Levels
              </button>
            )}
          </>
        ) : (
          <>
            <button
              className="btn btn-primary"
              onClick={() => onRetryLevel(result.level)}
            >
              🔄 Retry Quiz
            </button>
            <button className="btn btn-secondary" onClick={onViewHub}>
              View All Levels
            </button>
          </>
        )}
      </div>
    </div>
  );
}
