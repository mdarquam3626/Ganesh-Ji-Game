import { STORAGE_KEYS, ACHIEVEMENTS_LIST } from "../data/config";
import { INITIAL_LEADERBOARD } from "../data/initialLeaderboard";

export const DataManager = {
  getPlayer() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.player);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  savePlayer(name, state) {
    const player = {
      id: "p_" + Date.now().toString(36),
      name: name.trim(),
      state: state.trim(),
      savedAt: Date.now()
    };
    try {
      localStorage.setItem(STORAGE_KEYS.player, JSON.stringify(player));
    } catch (e) {
      console.error(e);
    }
    return player;
  },

  clearPlayer() {
    try {
      localStorage.removeItem(STORAGE_KEYS.player);
    } catch (e) {
      console.error(e);
    }
  },

  getProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.progress);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return {
      unlockedLevels: [1], // Level 1 is unlocked initially
      unlockedStages: [],
      levelScores: {},
      bestScore: 0,
      bestEco: 0,
      bestBeauty: 0,
      gamesPlayed: 0
    };
  },

  saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
    } catch (e) {
      console.error(e);
    }
  },

  getAchievements() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.achievements);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  unlockAchievement(achId, onUnlockedCallback) {
    const list = this.getAchievements();
    if (!list.includes(achId)) {
      list.push(achId);
      try {
        localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(list));
      } catch (e) {
        console.error(e);
      }
      const ach = ACHIEVEMENTS_LIST.find((a) => a.id === achId);
      if (ach && onUnlockedCallback) {
        onUnlockedCallback(ach);
      }
      return true;
    }
    return false;
  },

  getLeaderboard() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.leaderboard);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(INITIAL_LEADERBOARD));
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LEADERBOARD;
  },

  recordGameResult(entry) {
    const lb = this.getLeaderboard();
    const existingIdx = lb.findIndex(
      (item) => item.name.toLowerCase() === entry.name.toLowerCase() && item.state === entry.state
    );
    let isNewBest = false;

    if (existingIdx >= 0) {
      if (entry.finalCelebrationScore > lb[existingIdx].finalCelebrationScore) {
        lb[existingIdx] = entry;
        isNewBest = true;
      }
    } else {
      lb.push(entry);
      isNewBest = true;
    }

    // Rank sorting hierarchy:
    // Final Celebration Score ↓ -> Quiz Score ↓ -> Eco Score ↓ -> Beauty Score ↓ -> Completion Time ↑ -> Submitted Time ↑
    lb.sort((a, b) => {
      if (b.finalCelebrationScore !== a.finalCelebrationScore) return b.finalCelebrationScore - a.finalCelebrationScore;
      if (b.quizScore !== a.quizScore) return b.quizScore - a.quizScore;
      if (b.ecoScore !== a.ecoScore) return b.ecoScore - a.ecoScore;
      if (b.beautyScore !== a.beautyScore) return b.beautyScore - a.beautyScore;
      if (a.completionTime !== b.completionTime) return a.completionTime - b.completionTime;
      return a.submittedAt - b.submittedAt;
    });

    try {
      localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(lb));
    } catch (e) {
      console.error(e);
    }
    return isNewBest;
  },

  getSoundPref() {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.sound);
      return val !== "false";
    } catch {
      return true;
    }
  },

  setSoundPref(enabled) {
    try {
      localStorage.setItem(STORAGE_KEYS.sound, enabled ? "true" : "false");
    } catch (e) {
      console.error(e);
    }
  }
};
