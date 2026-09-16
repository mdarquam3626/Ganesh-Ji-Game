import React from "react";
import { QUIZ_LEVELS_CONFIG } from "../../data/config";

export function QuizActiveScreen({
  activeLevel,
  questions,
  currentIndex,
  answers,
  score,
  onSelectOption,
  onNextQuestion
}) {
  const q = questions[currentIndex];
  if (!q) {
    return <div className="quiz-screen-wrap">Loading quiz questions...</div>;
  }

  const total = questions.length;
  const progressPct = Math.round((currentIndex / total) * 100);
  const isAnswered = answers[currentIndex] !== undefined;
  const selectedAnswer = answers[currentIndex];
  const isCorrect = isAnswered && selectedAnswer === q.correct;
  const lvlCfg = QUIZ_LEVELS_CONFIG.find((l) => l.id === activeLevel);

  return (
    <div className="quiz-screen-wrap">
      <div className="quiz-topbar">
        <span className="quiz-progress-num">
          Question {currentIndex + 1} of {total} • {lvlCfg ? lvlCfg.name : ""}
        </span>
        <span className="quiz-score-badge">
          Current Score: {score} / {currentIndex}
        </span>
      </div>

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="quiz-question-box">
        <span className="quiz-category-tag">🕉️ Sacred Knowledge Quiz</span>
        <h3 className="quiz-question-text">{q.question}</h3>
      </div>

      <div className="quiz-options-list">
        {q.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          let extraClass = "";
          if (isAnswered) {
            if (idx === q.correct) extraClass = "correct";
            else if (idx === selectedAnswer) extraClass = "wrong";
          }

          return (
            <button
              key={`opt-${idx}`}
              className={`quiz-opt-btn ${extraClass}`}
              disabled={isAnswered}
              onClick={() => onSelectOption(idx)}
            >
              <div className="quiz-opt-letter">{letter}</div>
              <div>{opt}</div>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <>
          <div className={`quiz-explanation-box ${isCorrect ? "correct" : "wrong"}`}>
            <b>{isCorrect ? "🎉 Correct Answer!" : "❌ Incorrect Answer!"}</b>
            <br />
            {!isCorrect && (
              <>
                <b>Correct Answer: {q.options[q.correct]}</b>
                <br />
              </>
            )}
            {q.explanation}
          </div>

          <button className="btn btn-primary quiz-next-btn" onClick={onNextQuestion}>
            {currentIndex + 1 === total ? "View Results →" : "Next Question →"}
          </button>
        </>
      )}
    </div>
  );
}
