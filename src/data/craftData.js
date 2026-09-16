export const CRAFT_CATEGORIES = [
  { id: "material", name: "Material", icon: "🏺", unlockReq: 1 },
  { id: "form", name: "Form & Posture", icon: "🕉️", unlockReq: 2 },
  { id: "color", name: "Natural Colors", icon: "🎨", unlockReq: 1 },
  { id: "clothing", name: "Attire & Dhoti", icon: "🧵", unlockReq: 3 },
  { id: "crown", name: "Crown (Mukut)", icon: "👑", unlockReq: 3 },
  { id: "ornaments", name: "Jewelry & Malas", icon: "📿", unlockReq: 3 },
  { id: "decorations", name: "Mandap & Decor", icon: "🌸", unlockReq: 4 },
  { id: "mooshak", name: "Mooshak Ji", icon: "🐁", unlockReq: 2 }
];

export const MATERIALS_DATA = [
  {
    id: "shadu_clay",
    name: "Natural Shadu Clay",
    icon: "🏺",
    eco: true,
    ecoPts: 35,
    beautyPts: 30,
    colorTone: "#a65637",
    textureTone: "#8b3e21",
    desc: "Traditional sacred riverbed clay. 100% biodegradable and dissolves naturally.",
    reqLevel: 1
  },
  {
    id: "seed_paper_pulp",
    name: "Plantable Seed Paper Pulp",
    icon: "🌱",
    eco: true,
    ecoPts: 40,
    beautyPts: 28,
    colorTone: "#cfc1a0",
    textureTone: "#b5a37e",
    desc: "Recycled paper pulp embedded with seeds. Sprouts into a plant after home immersion!",
    reqLevel: 1
  },
  {
    id: "red_soil",
    name: "Natural Red Soil",
    icon: "⛰️",
    eco: true,
    ecoPts: 35,
    beautyPts: 27,
    colorTone: "#984729",
    textureTone: "#7c351b",
    desc: "Mineral-rich organic earth that enriches garden soil and plant beds.",
    reqLevel: 1
  },
  {
    id: "bamboo_grass",
    name: "Bamboo & Coconut Coir",
    icon: "🌾",
    eco: true,
    ecoPts: 30,
    beautyPts: 25,
    colorTone: "#9c7c4f",
    textureTone: "#7d5e33",
    desc: "Renewable plant fiber structure, lightweight and compostable in garden soil.",
    reqLevel: 4
  },
  {
    id: "pop_harmful",
    name: "Plaster of Paris (POP)",
    icon: "🧱",
    eco: false,
    ecoPts: 5,
    beautyPts: 20,
    colorTone: "#dfdbd3",
    textureTone: "#c4bfb7",
    desc: "⚠️ Insoluble chemical substance that causes severe toxic harm to waterways and marine life.",
    reqLevel: 1
  }
];

export const FORM_DATA = [
  {
    id: "lalitasana_left",
    name: "Lalitasana (Vamamukhi - Left-Curved Trunk)",
    icon: "🕉️",
    trunkStyle: "left",
    eyeStyle: "calm",
    desc: "Auspicious left-curved trunk, radiating peace, household joy, and prosperity.",
    ecoPts: 10,
    beautyPts: 30,
    reqLevel: 2
  },
  {
    id: "padmasana_center",
    name: "Padmasana (Riju - Centered Trunk)",
    icon: "🧘",
    trunkStyle: "center",
    eyeStyle: "meditative",
    desc: "Lotus seated posture with centered trunk, symbolizing supreme wisdom and inner stillness.",
    ecoPts: 10,
    beautyPts: 30,
    reqLevel: 2
  },
  {
    id: "siddhivinayak_right",
    name: "Siddhivinayak (Right-Curved Trunk)",
    icon: "⚡",
    trunkStyle: "right",
    eyeStyle: "radiant",
    desc: "Solar-activated right-curved trunk, representing intense spiritual boons and radiance.",
    ecoPts: 10,
    beautyPts: 30,
    reqLevel: 2
  }
];

export const COLORS_DATA = [
  {
    id: "turmeric_yellow",
    name: "Turmeric Yellow",
    icon: "🌼",
    hex: "#eab308",
    accent: "#ca8a04",
    eco: true,
    source: "Pure extract from golden turmeric root",
    ecoPts: 20,
    beautyPts: 18,
    reqLevel: 1
  },
  {
    id: "beetroot_red",
    name: "Beetroot & Kumkum Red",
    icon: "🍠",
    hex: "#b91c1c",
    accent: "#991b1b",
    eco: true,
    source: "Fresh beetroot extract & herbal vermilion",
    ecoPts: 20,
    beautyPts: 20,
    reqLevel: 1
  },
  {
    id: "spinach_green",
    name: "Spinach & Neem Green",
    icon: "🌿",
    hex: "#15803d",
    accent: "#166534",
    eco: true,
    source: "Spinach leaves & cold-pressed neem extract",
    ecoPts: 20,
    beautyPts: 18,
    reqLevel: 1
  },
  {
    id: "indigo_blue",
    name: "Indigo & Aparajita Blue",
    icon: "🔵",
    hex: "#1d4ed8",
    accent: "#1e40af",
    eco: true,
    source: "Natural indigo herb & butterfly pea flowers",
    ecoPts: 20,
    beautyPts: 18,
    reqLevel: 2
  },
  {
    id: "terracotta_ochre",
    name: "Natural Ochre (Geru)",
    icon: "🍂",
    hex: "#b45309",
    accent: "#92400e",
    eco: true,
    source: "Pure earthen red-ochre mineral pigment",
    ecoPts: 20,
    beautyPts: 17,
    reqLevel: 1
  },
  {
    id: "chalk_white",
    name: "Multani Mitti White",
    icon: "⚪",
    hex: "#fef3c7",
    accent: "#fde68a",
    eco: true,
    source: "Fuller's earth & organic rice paste",
    ecoPts: 20,
    beautyPts: 17,
    reqLevel: 1
  },
  {
    id: "chemical_gloss",
    name: "Synthetic Chemical Dye",
    icon: "🧪",
    hex: "#c026d3",
    accent: "#9333ea",
    eco: false,
    source: "Hazardous synthetic lead & enamel lacquer",
    ecoPts: 2,
    beautyPts: 15,
    reqLevel: 1
  }
];

export const CLOTHING_DATA = [
  {
    id: "pitambari_silk",
    name: "Pitambari Silk Dhoti",
    icon: "🥻",
    color: "#eab308",
    borderColor: "#d4af37",
    desc: "Auspicious yellow silk dhoti with woven gold zari borders.",
    ecoPts: 15,
    beautyPts: 22,
    reqLevel: 3
  },
  {
    id: "rakta_crimson",
    name: "Crimson Red Dhoti",
    icon: "🧧",
    color: "#dc2626",
    borderColor: "#fbbf24",
    desc: "Sacred crimson red attire symbolizing vitality and spiritual grace.",
    ecoPts: 15,
    beautyPts: 20,
    reqLevel: 3
  },
  {
    id: "harit_forest",
    name: "Forest Green Dhoti",
    icon: "🍃",
    color: "#166534",
    borderColor: "#fde047",
    desc: "Nature-inspired green robe carrying a message of environmental harmony.",
    ecoPts: 16,
    beautyPts: 19,
    reqLevel: 3
  },
  {
    id: "shwet_gold",
    name: "Ivory White Khadi",
    icon: "🧵",
    color: "#fafaf9",
    borderColor: "#eab308",
    desc: "100% hand-spun organic cotton Khadi with gold borders, symbol of purity.",
    ecoPts: 20,
    beautyPts: 21,
    reqLevel: 3
  }
];

export const CROWNS_DATA = [
  {
    id: "traditional_clay_mukut",
    name: "Traditional Shadu Mukut",
    icon: "👑",
    eco: true,
    desc: "Handcrafted earthen crown with traditional temple filigree.",
    ecoPts: 18,
    beautyPts: 20,
    reqLevel: 3
  },
  {
    id: "floral_eco_mukut",
    name: "Fresh Floral Eco-Mukut",
    icon: "🌸",
    eco: true,
    desc: "Woven from fresh jasmine and fragrant marigold petals. 100% Eco!",
    ecoPts: 20,
    beautyPts: 22,
    reqLevel: 3
  },
  {
    id: "jeweled_mukut",
    name: "Jeweled Festive Mukut",
    icon: "💎",
    eco: true,
    desc: "Crown embellished with lustrous pearls and sacred ruby gemstones.",
    ecoPts: 15,
    beautyPts: 24,
    reqLevel: 3
  },
  {
    id: "royal_golden_mukut",
    name: "Royal Golden Mukut (Master)",
    icon: "✨",
    eco: true,
    desc: "Magnificent imperial golden mukut blessed with a glowing ruby crest.",
    ecoPts: 20,
    beautyPts: 30,
    reqLevel: 5
  }
];

export const ORNAMENTS_DATA = [
  {
    id: "rudraksha_tulsi",
    name: "Rudraksha & Tulsi Bead Mala",
    icon: "📿",
    eco: true,
    desc: "Sacred rosary of holy Tulsi wood and authentic Rudraksha beads.",
    ecoPts: 15,
    beautyPts: 18,
    reqLevel: 3
  },
  {
    id: "gold_kanthihar",
    name: "Golden Kanthihar & Armlets",
    icon: "🥇",
    eco: true,
    desc: "Traditional Indian embossed gold choker necklace and ornate armbands.",
    ecoPts: 14,
    beautyPts: 22,
    reqLevel: 3
  },
  {
    id: "pearl_mala",
    name: "Triple-Strand Pearl Necklace",
    icon: "⚪",
    eco: true,
    desc: "Lustrous triple-strand white pearl necklace with gold clasp.",
    ecoPts: 15,
    beautyPts: 20,
    reqLevel: 3
  }
];

export const DECORATIONS_DATA = [
  {
    id: "marigold_diyas",
    name: "Marigold Garland & Clay Diyas",
    icon: "🪔",
    eco: true,
    desc: "Fresh marigold flower garland with 11 flickering terracotta oil lamps.",
    ecoPts: 20,
    beautyPts: 20,
    reqLevel: 4
  },
  {
    id: "banana_leaf_backdrop",
    name: "Banana Leaf & Bamboo Mandap",
    icon: "🍌",
    eco: true,
    desc: "Lush green banana leaf background arch supported by natural bamboo.",
    ecoPts: 25,
    beautyPts: 22,
    reqLevel: 4
  },
  {
    id: "flower_rangoli",
    name: "Floral Petal Rangoli & Durva",
    icon: "🏵️",
    eco: true,
    desc: "Vibrant floor rangoli fashioned from rose petals, turmeric, and Durva grass.",
    ecoPts: 24,
    beautyPts: 23,
    reqLevel: 4
  },
  {
    id: "divine_prabhavali",
    name: "Divine Prabhavali & Throne (Master)",
    icon: "🦚",
    eco: true,
    desc: "Radiant golden aureole (Prabhavali) and an exquisite Peacock Throne.",
    ecoPts: 25,
    beautyPts: 30,
    reqLevel: 5
  }
];

export const MOOSHAK_DATA = [
  {
    id: "mooshak_modak",
    name: "Modak-Bearing Mooshak Ji",
    icon: "🐁",
    desc: "Lord Ganesha's devout mouse companion lovingly offering a golden modak.",
    ecoPts: 10,
    beautyPts: 15,
    reqLevel: 2
  },
  {
    id: "mooshak_bell",
    name: "Golden Bell Mooshak Ji",
    icon: "🔔",
    desc: "Mooshak Ji adorned with a tinkling golden temple bell and pearl collar.",
    ecoPts: 10,
    beautyPts: 15,
    reqLevel: 2
  }
];

export const INITIAL_SELECTION = {
  material: null,
  form: "lalitasana_left",
  color: null,
  clothing: null,
  crown: null,
  ornaments: null,
  decorations: null,
  mooshak: null
};

export const DEFAULT_SELECTION = INITIAL_SELECTION;

