import React, { useEffect, useRef } from "react";

export function triggerConfetti() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("gjem-trigger-confetti"));
  }
}

export function ConfettiCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const onTrigger = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const colors = ["#f59e0b", "#e65c00", "#d4af37", "#2e7d32", "#dc2626", "#fde047"];
      for (let i = 0; i < 90; i++) {
        particles.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 200,
          y: canvas.height / 2 - 50,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.8) * 14,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          rot: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 10
        });
      }

      const start = Date.now();
      if (animRef.current) cancelAnimationFrame(animRef.current);

      function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35;
          p.rot += p.vRot;
          p.alpha -= 0.012;
          if (p.alpha > 0) {
            alive = true;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
          }
        });

        if (alive && Date.now() - start < 3000) {
          animRef.current = requestAnimationFrame(render);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }

      render();
    };

    window.addEventListener("gjem-trigger-confetti", onTrigger);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("gjem-trigger-confetti", onTrigger);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="fxCanvas"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999
      }}
    />
  );
}
