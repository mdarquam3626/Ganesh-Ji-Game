export const ALL_INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export const QUIZ_LEVELS_CONFIG = [
  {
    id: 1,
    name: "Level 1 — Basic Ganesh Knowledge",
    desc: "Test your understanding of Lord Ganesha's names, mount, parents, and sacred symbols.",
    reqPct: 60,
    unlockTitle: "Basic Murti Making (Murti Base & Natural Clay)",
    unlockId: "stage_basic_murti"
  },
  {
    id: 2,
    name: "Level 2 — Ganesh Chaturthi",
    desc: "Ganesh Chaturthi festival traditions, Sthapana, Pooja rituals, and Visarjan significance.",
    reqPct: 70,
    unlockTitle: "Murti Appearance (Posture, Trunk Direction & Divine Eyes)",
    unlockId: "stage_appearance"
  },
  {
    id: 3,
    name: "Level 3 — Symbols & Stories",
    desc: "The sacred symbolism of Modak, Mooshak, Ekdanta, Pasha-Ankusha, and revered legends.",
    reqPct: 70,
    unlockTitle: "Clothing & Ornaments (Dhoti, Angavastram, Crown & Sacred Jewelry)",
    unlockId: "stage_clothing_ornaments"
  },
  {
    id: 4,
    name: "Level 4 — Eco-Friendly Ganesh Utsav",
    desc: "Shadu clay, herbal colors, environmental hazards of POP, and water conservation.",
    reqPct: 70,
    unlockTitle: "Advanced & Eco Decorations (Banana Leaves, Natural Rangoli, Bamboo Mandap)",
    unlockId: "stage_decorations"
  },
  {
    id: 5,
    name: "Level 5 — Expert Ganesh Quiz",
    desc: "Cultural heritage, philosophical depth, and spiritual meaning of Ganesha's divine symbols.",
    reqPct: 80,
    unlockTitle: "🏆 Master Creator Mode (Royal Golden Mukut, Divine Prabhavali, Peacock Throne)",
    unlockId: "stage_master_creator"
  }
];

export const ACHIEVEMENTS_LIST = [
  { id: "ach_basic", name: "Ganesh Scholar", icon: "🏆", desc: "Passed Level 1 Basic Knowledge Quiz." },
  { id: "ach_eco_80", name: "Eco Devotee", icon: "🌱", desc: "Achieved an Eco Score above 80." },
  { id: "ach_decor", name: "Master Decorator", icon: "🎨", desc: "Unlocked advanced eco-friendly decorations." },
  { id: "ach_artist", name: "Divine Artisan", icon: "🕉️", desc: "Successfully completed sculpting a full Ganesh idol." },
  { id: "ach_eco_champ", name: "Eco Champion", icon: "🌳", desc: "Scored 90+ Eco Score in honor of nature." },
  { id: "ach_quiz_master", name: "Quiz Master", icon: "📚", desc: "Scored 90%+ in the festive knowledge quizzes." },
  { id: "ach_master_creator", name: "Master Creator", icon: "👑", desc: "Passed Level 5 and sculpted an idol in Master Creator Mode." },
  { id: "ach_new_best", name: "Personal Best", icon: "🔥", desc: "Surpassed your previous personal high score." }
];

export const STORAGE_KEYS = {
  player: "gjem_player_v2",
  progress: "gjem_progress_v2",
  leaderboard: "gjem_leaderboard_v2",
  achievements: "gjem_achieve_v2",
  sound: "gjem_sound_v2"
};
