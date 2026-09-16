import React, { useState } from "react";

export function TutorialScreen({ onComplete }) {
  const [step, setStep] = useState(1);

  const steps = [
    {
      num: 1,
      title: "Step 1 — Knowledge Quiz",
      icon: "📚",
      desc: "Answer inspiring questions about Lord Ganesha, Ganesh Chaturthi, traditions, and eco-friendly celebrations."
    },
    {
      num: 2,
      title: "Step 2 — Answer Correctly to Unlock",
      icon: "🔓",
      desc: "Achieve the required passing score (60% to 80%) in each level to unlock new murti materials, colors, and decorations."
    },
    {
      num: 3,
      title: "Step 3 — Shape Ganesh Ji's Idol",
      icon: "🕉️",
      desc: "Choose Lord Ganesha's sacred posture, trunk direction (Vamamukhi left-curved, Dakshinabhimukhi right-curved, or centered), and divine form."
    },
    {
      num: 4,
      title: "Step 4 — Protect the Environment",
      icon: "🌱",
      desc: "Choose Shadu clay, plantable seed pulp, and herbal dyes like turmeric, beetroot, and spinach to boost your Eco Score."
    },
    {
      num: 5,
      title: "Step 5 — Adorn the Murti",
      icon: "🌸",
      desc: "Drape Pitambari dhotis, pearls, mukut, sacred malas, and place Mooshak Ji respectfully at Ganesha's lotus feet."
    },
    {
      num: 6,
      title: "Step 6 — Realistic Murti Preview",
      icon: "✨",
      desc: "Experience your handcrafted idol in a realistic ambient temple setting with glowing clay diyas and sacred pooja offerings."
    },
    {
      num: 7,
      title: "Step 7 — Celebrate & Compete",
      icon: "🏆",
      desc: "Receive your Quiz Score, Eco Score, Beauty Score, and Final Celebration Score to earn a spot on the All-India Leaderboard!"
    }
  ];

  const cur = steps[step - 1] || steps[0];
  const pct = Math.round((step / steps.length) * 100);

  const handleNext = () => {
    if (step < steps.length) {
      setStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="tutorial-wrap">
      <div className="tutorial-progress-bar">
        <div className="tutorial-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="tutorial-step-indicator">
        {steps.map((s) => (
          <div
            key={s.num}
            className={`tut-dot ${s.num === step ? "active" : ""}`}
            onClick={() => setStep(s.num)}
            role="button"
            tabIndex={0}
            aria-label={`Go to step ${s.num}`}
          />
        ))}
      </div>

      <div className="tutorial-step-content">
        <div className="tut-icon">{cur.icon}</div>
        <div className="tut-step-num">
          Step {cur.num} of {steps.length}
        </div>
        <h2 className="tut-step-title">{cur.title}</h2>
        <p className="tut-step-desc">{cur.desc}</p>
      </div>

      <div className="tut-nav-btns">
        <button className="btn btn-secondary" disabled={step === 1} onClick={handlePrev}>
          ← Back
        </button>
        <button className="btn-ghost" onClick={onComplete}>
          Skip Tutorial
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          {step === steps.length ? "Start Quizzes →" : "Next →"}
        </button>
      </div>
    </div>
  );
}
