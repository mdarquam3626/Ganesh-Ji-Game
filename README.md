# 🛕 Ganesh Ji Eco Murti Maker

> **An interactive, educational festival game empowering devotees to craft sacred, biodegradable Lord Ganesha idols, test environmental knowledge, and celebrate Ganesh Utsav sustainably.**

[![React Version](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite)](https://vite.dev/)
[![Node Version](https://img.shields.io/badge/Node->=18.0.0-green?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)
[![Eco Friendly](https://img.shields.io/badge/Eco--Friendly-100%25%20Biodegradable-22c55e?logo=leaf)](https://github.com/)

---

## 🌟 Highlights & Features

* **🏺 Authentic Initial Sculpting Phase (0 / 100)**: Devotees begin with pure, unadorned sculpted riverbed clay. The live Eco & Decoration meter starts cleanly at `0 / 100` and dynamically progresses as you select materials and adornments.
* **🧠 5-Tier Environmental Quiz Challenge**: Test your eco-festival knowledge from sacred *Shadu Mati* and plantable seed idols to organic dyes (*Turmeric, Beetroot, Geru*) and non-polluting home immersion rituals.
* **🎨 Realistic Parametric SVG Murti Studio**: Real-time vector rendering of Lord Ganesha with dynamic radial gradients, drop shadow filters, trunk postures, crowns, silks, and divine backdrops.
* **🎚️ All-India Leaderboard with Rank Slider**:
  * **Interactive Rank Range Slider**: Smoothly glide through national devotee rankings with real-time scroll synchronization.
  * **Horizontal Slider Buttons (`❮` `❯`)**: Effortless column sliding on mobile and touch devices.
  * **Sticky Headers & Bounded Container**: Eliminates screen overflow and keeps columns visible.
  * **"My Rank" Shortcut**: Instantly scrolls directly to your highlighted entry.
* **🔊 Synthesized Vedic Audio Engine**: Native Web Audio API synthesis generating harmonic bronze temple bells, arpeggiated victory fanfares, and chimes without external audio dependencies.
* **🎵 Ambient Devotional Music**: Integrated YouTube IFrame background chant player at 30% volume with persistent cross-screen playback and global mute toggle.
* **🎉 Particle Physics Confetti**: Real-time 2D canvas celebration confetti on quiz milestones and final idol submissions.
* **🏆 Sacred Achievements & Devotee Profiles**: Unlock 8 distinct spiritual and ecological badges persisted in browser local storage.

---

## 🚀 Quick Start

### 1. Prerequisites
* [Node.js](https://nodejs.org/) version **18.0 or newer**
* npm version **9.0 or newer**

### 2. Install & Run
```bash
# Clone or navigate to the project directory
cd ganesh-ji-eco-murti-maker

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit **`http://localhost:5173/`** in your browser to start playing!

### 3. Build for Production
```bash
# Generate optimized production build in dist/
npm run build

# Preview the production build locally
npm run preview
```

---

## 🕹️ How to Play (Summary)

```mermaid
flowchart LR
    A[Welcome: Enter Name & State] --> B[Tutorial: Learn Eco Rules]
    B --> C[Quiz Hub: Pass Levels 1-5]
    C --> D[Studio: Sculpt Murti 0 to 100]
    D --> E[Preview: Sacred Diya Darshan]
    E --> F[Leaderboard: Slide & View Ranks]
```

1. **Register**: Enter your Devotee Name and select your Indian State/UT.
2. **Clear Quizzes**: Pass progressive environmental quiz levels with $\ge 60\%$ score to unlock craft categories (Form, Attire, Mukut, Malas, Mandap).
3. **Sculpt in Studio**:
   - Start with unadorned raw clay idol (**0 / 100** Eco Score).
   - Select your sacred clay (*Shadu Clay, Seed Paper, Red Soil*).
   - Apply natural herbal colors and dress in sacred organic silk or khadi.
   - Crown Lord Ganesha with traditional Mukuts and divine backdrops.
   - Earn the **+10 Eco Bonus** by selecting only 100% biodegradable choices!
4. **Darshan & Submit**: Admire your idol illuminated by glowing terracotta diyas and submit your score to the All-India Leaderboard.
5. **Explore Leaderboard**: Drag the **Rank Slider** to explore top idol creators across all states.

> 📖 **For complete in-depth gameplay tutorials, scoring formulas, and technical architectures, please read the [DOCUMENTATION.md](DOCUMENTATION.md) file.**

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | **React 19** (`^19.2.8`) | State hooks, memoized selectors, refs, virtual DOM diffing |
| **Tooling & Server**| **Vite 8** (`^8.3.0`) | Instant HMR, lightning build times, ESM module resolution |
| **Styling** | **Pure Vanilla CSS3** | Custom properties design system, Glassmorphism, animations |
| **Graphics** | **SVG & HTML5 Canvas**| Vector Murti illustration, drop shadows, confetti physics |
| **Audio** | **Web Audio API** | Polyphonic sine/triangle oscillators for bells and sound effects |
| **Music** | **YouTube IFrame API** | Background devotional chanting with session persistence |
| **Persistence** | **LocalStorage API** | Offline devotee profiles, quiz progress, and leaderboard |
| **Code Quality** | **Oxlint** (`^1.81.0`) | Rust-based high-performance static analysis |

---

## 📂 Project Structure

```
ganesh-ji-eco-murti-maker/
├── DOCUMENTATION.md                # In-depth technical architecture & game guide
├── README.md                       # Repository overview & quick start
├── index.html                      # Entry HTML with fonts and meta tags
├── package.json                    # Scripts and dependencies
├── vite.config.js                  # Vite configuration
└── src/
    ├── App.jsx                     # Root application coordinator & screen router
    ├── index.css                   # Master CSS design system & animations
    ├── main.jsx                    # React entrypoint
    ├── components/
    │   ├── ConfettiCanvas.jsx      # 2D celebration particle physics
    │   ├── MurtiCanvas.jsx         # Parametric SVG Murti renderer (0/100 to Master)
    │   ├── Navbar.jsx              # Global header with sound controls & profile
    │   ├── Toast.jsx               # Floating micro-notifications
    │   ├── YouTubeBGM.jsx          # Ambient devotional background player
    │   └── screens/                # 10 application screen components
    │       ├── WelcomeScreen.jsx
    │       ├── TutorialScreen.jsx
    │       ├── QuizHubScreen.jsx
    │       ├── QuizActiveScreen.jsx
    │       ├── QuizResultScreen.jsx
    │       ├── StudioScreen.jsx
    │       ├── FinalPreviewScreen.jsx
    │       ├── ResultsScreen.jsx
    │       ├── LeaderboardScreen.jsx
    │       └── ProfileScreen.jsx
    ├── data/
    │   ├── config.js               # States, storage keys, achievement catalog
    │   ├── craftData.js            # Materials, colors, attire, crowns, decor
    │   ├── initialLeaderboard.js   # Seeded all-India leaderboard data
    │   └── questionBank.js         # Eco quiz question sets by level (1-5)
    └── services/
        ├── audio.js                # Web Audio API synthesizer for bells & FX
        ├── scoring.js              # Eco, beauty, and celebration scoring engine
        └── storage.js              # LocalStorage repository manager
```

---

## 🌿 Environmental Dedication

This project is dedicated to the preservation of India's sacred rivers, lakes, and marine ecosystems. By choosing traditional Shadu clay and natural plant-based dyes over toxic Plaster of Paris and chemical paints, we protect aquatic life while upholding the sacred essence of Lord Ganesha's festival.

*Ganpati Bappa Morya!* 🌸🙏🐘
