import React from "react";
import { MurtiCanvas } from "../MurtiCanvas";
import { ScoringEngine } from "../../services/scoring";

export function FinalPreviewScreen({ selection, quizAccuracy, onEditMurti, onSubmitMurti }) {
  const scores = ScoringEngine.calculate(selection, quizAccuracy);

  return (
    <div className="final-preview-wrap">
      <div className="preview-header">
        <div className="hero-tag">🕉️ Sacred Darshan • Realistic Murti Preview</div>
        <h2>Your Divine Ganesh Ji Murti</h2>
        <p>Admire your handcrafted idol in an auspicious setting with glowing lamps and festive blessings.</p>
      </div>

      <div className="grand-display-stage">
        <div className="diya-flame-left">🪔</div>
        <div className="diya-flame-right">🪔</div>
        <MurtiCanvas selection={selection} />
      </div>

      <div className="preview-stats-bar">
        <div className="p-stat-card">
          <div className="val">{scores.quizScore}</div>
          <div className="lbl">Quiz Score</div>
        </div>
        <div className="p-stat-card">
          <div className="val" style={{ color: "var(--leaf)" }}>
            {scores.ecoScore}
          </div>
          <div className="lbl">Eco Score</div>
        </div>
        <div className="p-stat-card">
          <div className="val" style={{ color: "var(--gold-dark)" }}>
            {scores.beautyScore}
          </div>
          <div className="lbl">Beauty Score</div>
        </div>
        <div className="p-stat-card">
          <div className="val" style={{ color: "var(--saffron)" }}>
            {scores.finalCelebrationScore}
          </div>
          <div className="lbl">Celebration Score</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn btn-secondary" onClick={onEditMurti}>
          🎨 Edit Murti
        </button>
        <button
          className="btn btn-primary"
          style={{ fontSize: "16px", padding: "14px 34px" }}
          onClick={onSubmitMurti}
        >
          🙏 Submit Murti →
        </button>
      </div>
    </div>
  );
}
