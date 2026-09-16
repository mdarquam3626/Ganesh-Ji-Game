import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { YouTubeBGM } from "./components/YouTubeBGM";
import { ConfettiCanvas, triggerConfetti } from "./components/ConfettiCanvas";
import { Toast, showToast } from "./components/Toast";
import { WelcomeScreen } from "./components/screens/WelcomeScreen";
import { TutorialScreen } from "./components/screens/TutorialScreen";
import { QuizHubScreen } from "./components/screens/QuizHubScreen";
import { QuizActiveScreen } from "./components/screens/QuizActiveScreen";
import { QuizResultScreen } from "./components/screens/QuizResultScreen";
import { StudioScreen } from "./components/screens/StudioScreen";
import { FinalPreviewScreen } from "./components/screens/FinalPreviewScreen";
import { ResultsScreen } from "./components/screens/ResultsScreen";
import { LeaderboardScreen } from "./components/screens/LeaderboardScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";

import { DataManager } from "./services/storage";
import { ScoringEngine } from "./services/scoring";
import { AudioManager } from "./services/audio";
import { QUESTION_BANK } from "./data/questionBank";
import { QUIZ_LEVELS_CONFIG } from "./data/config";
import { DEFAULT_SELECTION } from "./data/craftData";

export default function App() {
  const [player, setPlayer] = useState(() => DataManager.getPlayer());
  const [progress, setProgress] = useState(() => DataManager.getProgress());
  const [achievements, setAchievements] = useState(() => DataManager.getAchievements());
  const [leaderboard, setLeaderboard] = useState(() => DataManager.getLeaderboard());
  const [soundEnabled, setSoundEnabled] = useState(() => AudioManager.enabled);

  const [currentScreen, setCurrentScreen] = useState(() =>
    DataManager.getPlayer() ? "hub" : "welcome"
  );

  const [selection, setSelection] = useState(DEFAULT_SELECTION);
  const [activeCraftTab, setActiveCraftTab] = useState("material");

  // Quiz state
  const [activeQuizLevel, setActiveQuizLevel] = useState(1);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [lastQuizResult, setLastQuizResult] = useState(null);

  // Result state
  const [isNewBest, setIsNewBest] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(() => Date.now());

  // Safe gesture unlock for Web Audio API
  useEffect(() => {
    const unlockAudio = () => {
      AudioManager.getAudioContext();
    };
    window.addEventListener("pointerdown", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  const handleToggleSound = () => {
    const nextVal = AudioManager.toggle();
    setSoundEnabled(nextVal);
    showToast(nextVal ? "🔊 Sound & BGM On (30%)" : "🔇 Sound & BGM Muted");
  };

  const handleSavePlayer = (name, state) => {
    const newPlayer = DataManager.savePlayer(name, state);
    setPlayer(newPlayer);
    AudioManager.playBell();
    showToast(`Welcome, ${newPlayer.name}!`);
    setCurrentScreen("tutorial");
  };

  const handleChangePlayer = () => {
    DataManager.clearPlayer();
    setPlayer(null);
    setSelection(DEFAULT_SELECTION);
    setCurrentScreen("welcome");
    showToast("Player details reset.");
  };

  const handleNavigate = (screen) => {
    AudioManager.getAudioContext();
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartQuizLevel = (levelId) => {
    setActiveQuizLevel(levelId);
    const pool = QUESTION_BANK[levelId] || QUESTION_BANK[1];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setActiveQuestions(shuffled.slice(0, 5));
    setCurrentQuestionIdx(0);
    setQuizAnswers([]);
    setQuizScore(0);
    setCurrentScreen("quiz");
    AudioManager.playTone(330, 0.1, "sine");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectQuizOption = (optIdx) => {
    const q = activeQuestions[currentQuestionIdx];
    if (!q || quizAnswers[currentQuestionIdx] !== undefined) return;

    const newAnswers = [...quizAnswers];
    newAnswers[currentQuestionIdx] = optIdx;
    setQuizAnswers(newAnswers);

    const isCorrect = optIdx === q.correct;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      AudioManager.playCorrect();
    } else {
      AudioManager.playWrong();
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuestionIdx + 1 < activeQuestions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      finishQuizRound();
    }
  };

  const finishQuizRound = () => {
    const total = activeQuestions.length;
    const correct = quizScore;
    const percentage = Math.round((correct / total) * 100);
    const lvlCfg = QUIZ_LEVELS_CONFIG.find((l) => l.id === activeQuizLevel);
    const passed = percentage >= (lvlCfg ? lvlCfg.reqPct : 60);

    const currentProg = DataManager.getProgress();
    currentProg.levelScores[activeQuizLevel] = Math.max(
      currentProg.levelScores[activeQuizLevel] || 0,
      percentage
    );

    if (passed) {
      if (!currentProg.unlockedStages.includes(lvlCfg.unlockId)) {
        currentProg.unlockedStages.push(lvlCfg.unlockId);
      }
      const nextLevel = activeQuizLevel + 1;
      if (nextLevel <= 5 && !currentProg.unlockedLevels.includes(nextLevel)) {
        currentProg.unlockedLevels.push(nextLevel);
      }
      AudioManager.playFanfare();
      triggerConfetti();

      // Check achievements
      const onUnlock = (ach) => {
        showToast(`🎉 Achievement Unlocked: ${ach.name}!`);
        setAchievements(DataManager.getAchievements());
      };
      if (activeQuizLevel === 1) DataManager.unlockAchievement("ach_basic", onUnlock);
      if (activeQuizLevel === 4) DataManager.unlockAchievement("ach_decor", onUnlock);
      if (percentage >= 90) DataManager.unlockAchievement("ach_quiz_master", onUnlock);
    }

    DataManager.saveProgress(currentProg);
    setProgress({ ...currentProg });

    setLastQuizResult({
      level: activeQuizLevel,
      correct,
      total,
      percentage
    });

    setCurrentScreen("quiz_result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCraftOption = (category, itemId) => {
    setSelection((prev) => ({
      ...prev,
      [category]: itemId
    }));
  };

  const getAverageQuizScore = useCallback(() => {
    const scores = Object.values(progress?.levelScores || {});
    if (scores.length === 0) return 80;
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round(sum / scores.length);
  }, [progress]);

  const handleSubmitMurti = () => {
    const quizAccuracy = getAverageQuizScore();
    const scores = ScoringEngine.calculate(selection, quizAccuracy);
    const currentProg = DataManager.getProgress();

    const completionTime = Math.round((Date.now() - sessionStartTime) / 1000);
    const p = player || { name: "Devotee", state: "Maharashtra" };

    const entry = {
      id: "g_" + Date.now().toString(36),
      name: p.name,
      state: p.state,
      quizScore: scores.quizScore,
      ecoScore: scores.ecoScore,
      beautyScore: scores.beautyScore,
      ecoBonus: scores.ecoBonus,
      finalCelebrationScore: scores.finalCelebrationScore,
      completionTime,
      submittedAt: Date.now()
    };

    const newBest = DataManager.recordGameResult(entry);
    setIsNewBest(newBest);
    setLeaderboard(DataManager.getLeaderboard());

    currentProg.gamesPlayed = (currentProg.gamesPlayed || 0) + 1;
    currentProg.bestScore = Math.max(currentProg.bestScore || 0, scores.finalCelebrationScore);
    currentProg.bestEco = Math.max(currentProg.bestEco || 0, scores.ecoScore);
    currentProg.bestBeauty = Math.max(currentProg.bestBeauty || 0, scores.beautyScore);
    DataManager.saveProgress(currentProg);
    setProgress({ ...currentProg });

    // Achievements
    const onUnlock = (ach) => {
      showToast(`🎉 Achievement Unlocked: ${ach.name}!`);
      setAchievements(DataManager.getAchievements());
    };
    DataManager.unlockAchievement("ach_artist", onUnlock);
    if (scores.ecoScore >= 80) DataManager.unlockAchievement("ach_eco_80", onUnlock);
    if (scores.ecoScore >= 90) DataManager.unlockAchievement("ach_eco_champ", onUnlock);
    if (newBest && currentProg.gamesPlayed > 1) DataManager.unlockAchievement("ach_new_best", onUnlock);
    if (currentProg.unlockedLevels.includes(5) && selection.crown === "royal_golden_mukut") {
      DataManager.unlockAchievement("ach_master_creator", onUnlock);
    }

    AudioManager.playFanfare();
    triggerConfetti();
    setCurrentScreen("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReplayGame = () => {
    setSelection(DEFAULT_SELECTION);
    setActiveCraftTab("material");
    setSessionStartTime(Date.now());
    setCurrentScreen("hub");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="app" className="app-wrapper">
      <ConfettiCanvas />
      <Toast />
      <YouTubeBGM soundEnabled={soundEnabled} />

      <Navbar
        player={player}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onChangePlayer={handleChangePlayer}
        onNavigate={handleNavigate}
        currentScreen={currentScreen}
      />

      <main className="screen">
        {currentScreen === "welcome" && (
          <WelcomeScreen
            player={player}
            onSavePlayer={handleSavePlayer}
            onChangePlayer={handleChangePlayer}
            onStartGame={() => handleNavigate("hub")}
            onOpenHowToPlay={() => handleNavigate("tutorial")}
          />
        )}

        {currentScreen === "tutorial" && (
          <TutorialScreen onComplete={() => handleNavigate("hub")} />
        )}

        {currentScreen === "hub" && (
          <QuizHubScreen
            progress={progress}
            onStartLevel={handleStartQuizLevel}
            onOpenStudio={() => handleNavigate("studio")}
          />
        )}

        {currentScreen === "quiz" && (
          <QuizActiveScreen
            activeLevel={activeQuizLevel}
            questions={activeQuestions}
            currentIndex={currentQuestionIdx}
            answers={quizAnswers}
            score={quizScore}
            onSelectOption={handleSelectQuizOption}
            onNextQuestion={handleNextQuizQuestion}
          />
        )}

        {currentScreen === "quiz_result" && (
          <QuizResultScreen
            result={lastQuizResult}
            onGoToStudio={() => handleNavigate("studio")}
            onPlayNextLevel={() => handleStartQuizLevel(lastQuizResult.level + 1)}
            onRetryLevel={(lvl) => handleStartQuizLevel(lvl)}
            onViewHub={() => handleNavigate("hub")}
          />
        )}

        {currentScreen === "studio" && (
          <StudioScreen
            selection={selection}
            onSelectOption={handleSelectCraftOption}
            activeTab={activeCraftTab}
            onSelectTab={setActiveCraftTab}
            progress={progress}
            quizAccuracy={getAverageQuizScore()}
            onViewFinalPreview={() => {
              AudioManager.playBell();
              handleNavigate("final_preview");
            }}
          />
        )}

        {currentScreen === "final_preview" && (
          <FinalPreviewScreen
            selection={selection}
            quizAccuracy={getAverageQuizScore()}
            onEditMurti={() => handleNavigate("studio")}
            onSubmitMurti={handleSubmitMurti}
          />
        )}

        {currentScreen === "results" && (
          <ResultsScreen
            selection={selection}
            quizAccuracy={getAverageQuizScore()}
            progress={progress}
            isNewBest={isNewBest}
            onReplay={handleReplayGame}
            onRedecorate={() => handleNavigate("studio")}
            onViewLeaderboard={() => handleNavigate("leaderboard")}
            onGoHome={() => handleNavigate(player ? "hub" : "welcome")}
          />
        )}

        {currentScreen === "leaderboard" && (
          <LeaderboardScreen
            leaderboard={leaderboard}
            player={player}
            onOpenStudio={() => handleNavigate("studio")}
          />
        )}

        {currentScreen === "profile" && (
          <ProfileScreen
            player={player}
            progress={progress}
            achievements={achievements}
            onChangePlayer={handleChangePlayer}
          />
        )}
      </main>
    </div>
  );
}
