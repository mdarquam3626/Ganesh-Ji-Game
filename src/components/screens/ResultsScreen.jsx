import React from "react";
import { ScoringEngine } from "../../services/scoring";

export function ResultsScreen({
  selection,
  quizAccuracy,
  progress,
  isNewBest,
  onReplay,
  onRedecorate,
  onViewLeaderboard,
  onGoHome
}) {
  const scores = ScoringEngine.calculate(selection, quizAccuracy);

  return (
    <div className="results-wrap">
      <div className="results-header-icon">🕉️</div>
      <h2 className="results-title">Your Ganesh Ji Murti is Ready!</h2>
      <p style={{ color: "var(--ink-soft)", fontSize: "16px" }}>
        Your devotion, knowledge, and environmental consciousness make this celebration truly auspicious.
      </p>

      <div className="celebration-score-box">
        <div className="caption">Final Celebration Score</div>
        <div className="total-score">{scores.finalCelebrationScore}</div>
        <div style={{ fontSize: "13px", color: "#78350f", marginTop: "6px", fontWeight: 700 }}>
          = Quiz ({scores.quizScore}) + Eco ({scores.ecoScore}) + Beauty ({scores.beautyScore}) + Bonus ({scores.ecoBonus})
        </div>
      </div>

      {isNewBest ? (
        <div className="best-score-banner">
          🏆 Congratulations! New Personal Best Score!
        </div>
      ) : (
        <div style={{ fontSize: "14px", color: "var(--ink-soft)", marginBottom: "20px" }}>
          Previous Best: <b>{progress?.bestScore || 0}</b> | Current Score: <b>{scores.finalCelebrationScore}</b>
        </div>
      )}

      <div className="breakdown-row">
        <div className="breakdown-card">
          <div className="b-val">{scores.quizScore} / 100</div>
          <div className="b-lbl">Quiz Score</div>
        </div>
        <div className="breakdown-card">
          <div className="b-val" style={{ color: "var(--leaf)" }}>
            {scores.ecoScore} / 100
          </div>
          <div className="b-lbl">Eco Score</div>
        </div>
        <div className="breakdown-card">
          <div className="b-val" style={{ color: "var(--gold-dark)" }}>
            {scores.beautyScore} / 100
          </div>
          <div className="b-lbl">Beauty Score</div>
        </div>
        <div className="breakdown-card">
          <div className="b-val" style={{ color: "var(--saffron)" }}>
            +{scores.ecoBonus}
          </div>
          <div className="b-lbl">Eco Bonus</div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "24px"
        }}
      >
        <button className="btn btn-primary" onClick={onReplay}>
          🔄 Play Again (Replay)
        </button>
        <button className="btn btn-secondary" onClick={onRedecorate}>
          🎨 Re-decorate
        </button>
        <button className="btn btn-gold" onClick={onViewLeaderboard}>
          🏆 View Leaderboard
        </button>
        <button className="btn btn-ghost" onClick={onGoHome}>
          🏠 Home
        </button>
      </div>
    </div>
  );
}
