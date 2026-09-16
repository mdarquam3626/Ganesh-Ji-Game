import React, { useRef } from "react";
import { MurtiCanvas } from "../MurtiCanvas";
import {
  CRAFT_CATEGORIES,
  MATERIALS_DATA,
  FORM_DATA,
  COLORS_DATA,
  CLOTHING_DATA,
  CROWNS_DATA,
  ORNAMENTS_DATA,
  DECORATIONS_DATA,
  MOOSHAK_DATA
} from "../../data/craftData";
import { ScoringEngine } from "../../services/scoring";
import { showToast } from "../Toast";
import { AudioManager } from "../../services/audio";

export function StudioScreen({
  selection,
  onSelectOption,
  activeTab,
  onSelectTab,
  progress,
  quizAccuracy,
  onViewFinalPreview
}) {
  const tabsRef = useRef(null);

  const scores = ScoringEngine.calculate(selection, quizAccuracy);
  const ecoZone = ScoringEngine.getEcoZone(scores.ecoScore);

  const unlockedLevels = progress?.unlockedLevels || [1];
  const highestLevel = Math.max(...unlockedLevels, 1);

  const scrollTabs = (offset) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const getCategoryItems = (tabId) => {
    switch (tabId) {
      case "material":
        return MATERIALS_DATA;
      case "form":
        return FORM_DATA;
      case "color":
        return COLORS_DATA;
      case "clothing":
        return CLOTHING_DATA;
      case "crown":
        return CROWNS_DATA;
      case "ornaments":
        return ORNAMENTS_DATA;
      case "decorations":
        return DECORATIONS_DATA;
      case "mooshak":
        return MOOSHAK_DATA;
      default:
        return MATERIALS_DATA;
    }
  };

  const currentItems = getCategoryItems(activeTab);
  const selectedItemId = selection[activeTab];

  const handleOptionClick = (item) => {
    const req = item.reqLevel || 1;
    if (highestLevel < req) {
      AudioManager.playWrong();
      showToast(`🔒 Unlocks after clearing Level ${req} Quiz!`);
      return;
    }
    // If optional item is already selected, allow toggling off / deselecting
    if (selectedItemId === item.id && activeTab !== "material") {
      AudioManager.playTone(380, 0.08, "sine", 0.05);
      onSelectOption(activeTab, null);
      showToast(`Removed ${item.name}`);
      return;
    }
    AudioManager.playTone(440, 0.08, "sine", 0.06);
    onSelectOption(activeTab, item.id);
  };

  const handlePreviewClick = () => {
    if (!selection?.material) {
      AudioManager.playWrong();
      showToast("🏺 Please choose a sacred clay material to begin!");
      onSelectTab("material");
      return;
    }
    onViewFinalPreview();
  };

  return (
    <div className="studio-layout">
      {/* Left: Live Preview Pane */}
      <div className="studio-preview-pane">
        <div className="preview-canvas-wrap" id="liveMurtiCanvas">
          <MurtiCanvas selection={selection} />
        </div>

        {/* Animated Eco Meter */}
        <div className="eco-meter-box">
          <div className="eco-meter-header">
            <span className="eco-meter-title">🌱 Murti Eco &amp; Decoration Meter</span>
            <span className="eco-meter-val" id="ecoMeterVal">
              {scores.ecoScore} / 100
            </span>
          </div>
          <div className="eco-bar-track">
            <div
              className="eco-bar-fill"
              id="ecoMeterBar"
              style={{
                width: `${scores.ecoScore}%`,
                background: ecoZone.color
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              className="eco-zone-badge"
              id="ecoZoneBadge"
              style={{ background: ecoZone.bg, color: ecoZone.color }}
            >
              {ecoZone.label}
            </span>
            {scores.ecoScore === 0 ? (
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-soft)" }}>
                Select sacred clay to begin
              </span>
            ) : scores.ecoBonus > 0 ? (
              <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--leaf)" }}>
                +10 Eco Bonus!
              </span>
            ) : null}
          </div>
        </div>

        <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handlePreviewClick}>
            ✨ Realistic Preview →
          </button>
        </div>
      </div>

      {/* Right: Customization Options & Tabs */}
      <div className="studio-custom-pane">
        <div className="tabs-slider-wrapper">
          <button
            className="tabs-scroll-btn btn-prev"
            onClick={() => scrollTabs(-220)}
            aria-label="Scroll tabs left"
            title="Scroll left"
          >
            ❮
          </button>

          <div
            className="custom-category-tabs"
            id="customCategoryTabs"
            ref={tabsRef}
          >
            {CRAFT_CATEGORIES.map((cat) => {
              const isLocked = highestLevel < cat.unlockReq;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`tab-btn ${isActive ? "active" : ""} ${isLocked ? "locked-tab" : ""}`}
                  onClick={() => onSelectTab(cat.id)}
                >
                  {cat.icon} {cat.name} {isLocked ? "🔒" : ""}
                </button>
              );
            })}
          </div>

          <button
            className="tabs-scroll-btn btn-next"
            onClick={() => scrollTabs(220)}
            aria-label="Scroll tabs right"
            title="Scroll right"
          >
            ❯
          </button>
        </div>

        <div className="options-container">
          <div className="options-grid">
            {currentItems.map((item) => {
              const req = item.reqLevel || 1;
              const isLocked = highestLevel < req;
              const isSelected = selectedItemId === item.id;

              return (
                <div
                  key={item.id}
                  className={`opt-card ${isSelected ? "selected" : ""} ${isLocked ? "locked" : ""}`}
                  onClick={() => handleOptionClick(item)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="opt-card-top">
                    <span className="opt-card-icon">{item.icon || "🎨"}</span>
                    {item.eco !== undefined && (
                      <span className={`opt-eco-pill ${item.eco ? "green" : "red"}`}>
                        {item.eco ? "🌱 Eco" : "⚠️ Harmful"}
                      </span>
                    )}
                  </div>

                  <div className="opt-card-name">{item.name}</div>
                  <div className="opt-card-desc">{item.desc || ""}</div>
                  <div className="opt-card-impact">
                    {item.ecoPts ? <span>Eco: +{item.ecoPts}</span> : null}
                    {item.beautyPts ? <span>Beauty: +{item.beautyPts}</span> : null}
                  </div>

                  {isLocked && (
                    <div className="opt-lock-overlay">
                      <span style={{ fontSize: "18px" }}>🔒</span>
                      <span>Pass Level {req} Quiz</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
