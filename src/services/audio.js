import { DataManager } from "./storage";

class AudioService {
  constructor() {
    this.ctx = null;
    this.enabled = DataManager.getSoundPref();
  }

  getAudioContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  setEnabled(val) {
    this.enabled = val;
    DataManager.setSoundPref(val);
  }

  toggle() {
    this.enabled = !this.enabled;
    DataManager.setSoundPref(this.enabled);
    if (this.enabled) {
      this.playBell();
    }
    return this.enabled;
  }

  playTone(freq, duration = 0.15, type = "sine", gainVal = 0.08) {
    if (!this.enabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might not be allowed before user interaction
    }
  }

  playBell() {
    if (!this.enabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const freqs = [587.33, 880, 1174.66, 1760];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        const startGain = 0.09 / (idx + 1);
        gain.gain.setValueAtTime(startGain, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      });
    } catch {
      // ignore
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    this.playTone(523.25, 0.1, "triangle", 0.1);
    setTimeout(() => this.playTone(659.25, 0.12, "triangle", 0.1), 100);
    setTimeout(() => this.playTone(783.99, 0.25, "triangle", 0.12), 200);
  }

  playWrong() {
    if (!this.enabled) return;
    this.playTone(220, 0.18, "sawtooth", 0.08);
    setTimeout(() => this.playTone(185, 0.25, "sawtooth", 0.08), 160);
  }

  playFanfare() {
    if (!this.enabled) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((n, i) => {
      setTimeout(() => this.playTone(n, 0.22, "triangle", 0.1), i * 120);
    });
  }
}

export const AudioManager = new AudioService();
