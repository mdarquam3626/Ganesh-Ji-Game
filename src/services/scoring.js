import {
  MATERIALS_DATA,
  FORM_DATA,
  COLORS_DATA,
  CLOTHING_DATA,
  CROWNS_DATA,
  ORNAMENTS_DATA,
  DECORATIONS_DATA,
  MOOSHAK_DATA
} from "../data/craftData.js";

export const ScoringEngine = {
  calculate(selection = {}, quizAccuracy = 80) {
    const mat = MATERIALS_DATA.find((m) => m.id === selection?.material) || null;
    const form = FORM_DATA.find((f) => f.id === selection?.form) || FORM_DATA[0];
    const col = COLORS_DATA.find((c) => c.id === selection?.color) || null;
    const cloth = CLOTHING_DATA.find((c) => c.id === selection?.clothing) || null;
    const crown = CROWNS_DATA.find((cr) => cr.id === selection?.crown) || null;
    const orn = ORNAMENTS_DATA.find((o) => o.id === selection?.ornaments) || null;
    const deco = DECORATIONS_DATA.find((d) => d.id === selection?.decorations) || null;
    const mooshak = MOOSHAK_DATA.find((m) => m.id === selection?.mooshak) || null;

    // Eco Score (0 - 100)
    const rawEco =
      (mat?.ecoPts || 0) +
      (col?.ecoPts || 0) +
      (cloth?.ecoPts || 0) +
      (crown?.ecoPts || 0) +
      (orn?.ecoPts || 0) +
      (deco?.ecoPts || 0) +
      (mooshak?.ecoPts || 0);
    const ecoScore = Math.min(100, Math.max(0, Math.round((rawEco / 135) * 100)));

    // Beauty Score (0 - 100)
    const rawBeauty =
      (mat?.beautyPts || 0) +
      (form?.beautyPts || 0) +
      (col?.beautyPts || 0) +
      (cloth?.beautyPts || 0) +
      (crown?.beautyPts || 0) +
      (orn?.beautyPts || 0) +
      (deco?.beautyPts || 0) +
      (mooshak?.beautyPts || 0);
    const beautyScore =
      rawEco === 0 && !mat
        ? 0
        : Math.min(100, Math.max(0, Math.round((rawBeauty / 185) * 100)));

    // Eco Bonus (+10 points if user chose key items and all selected choices are completely eco-friendly)
    const hasKeyItems = Boolean(mat && col && crown && deco);
    const isAllEco =
      hasKeyItems &&
      Boolean(mat?.eco && col?.eco && crown?.eco && deco?.eco) &&
      (!cloth || cloth.ecoPts >= 15);
    const ecoBonus = isAllEco ? 10 : 0;

    // Quiz Score (0 - 100)
    const quizScore = Math.round(quizAccuracy);

    // Final Celebration Score = Quiz Score + Eco Score + Beauty Score + Eco Bonus
    const finalCelebrationScore = quizScore + ecoScore + beautyScore + ecoBonus;

    return {
      quizScore,
      ecoScore,
      beautyScore,
      ecoBonus,
      finalCelebrationScore,
      isAllEco
    };
  },

  getEcoZone(score) {
    if (score === 0) return { label: "🏺 Raw Clay (Initial Phase)", color: "#78716c", bg: "#f5f5f4" };
    if (score <= 30) return { label: "🌱 Needs Improvement", color: "#dc2626", bg: "#fee2e2" };
    if (score <= 60) return { label: "🌿 Getting Greener", color: "#d97706", bg: "#fef3c7" };
    if (score <= 80) return { label: "🌳 Eco-Friendly", color: "#16a34a", bg: "#dcfce7" };
    return { label: "🏆 Eco Champion", color: "#15803d", bg: "#bbf7d0" };
  }
};
