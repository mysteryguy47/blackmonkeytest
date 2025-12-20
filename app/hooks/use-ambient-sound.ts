import { useEffect, useRef, useState } from "react";

// Create soothing ambient sounds using Web Audio API
const createAmbientTone = (frequency: number, duration: number): string => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  gain.gain.setValueAtTime(0.1, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);

  return "generated";
};

const createSmoothTransition = (): AudioBuffer => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const duration = 0.3;
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  // Create a smooth whoosh sound
  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    const frequency = 200 + Math.sin(t * Math.PI * 2) * 100;
    data[i] = Math.sin((t * frequency * Math.PI * 2)) * Math.exp(-t * 3);
  }

  return buffer;
};

export function useAmbientSound() {
  const audioContextRef = useRef<AudioContext>();
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    // Initialize audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    return () => {
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Already stopped
        }
      });
    };
  }, []);

  const playHoverSound = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = 800;
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.start(now);
    osc.stop(now + 0.1);
  };

  const playClickSound = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.frequency.value = 400;
    osc.type = "triangle";
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.start(now);
    osc.stop(now + 0.15);
  };

  const playSuccessSound = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

    notes.forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.value = frequency;
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);

      const delay = now + index * 0.1;
      gain.gain.setValueAtTime(0.05, delay);
      gain.gain.exponentialRampToValueAtTime(0.01, delay + 0.2);

      osc.start(delay);
      osc.stop(delay + 0.2);
    });
  };

  const playScrollSound = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = 300;
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.2);
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.start(now);
    osc.stop(now + 0.2);
  };

  return {
    playHoverSound,
    playClickSound,
    playSuccessSound,
    playScrollSound,
  };
}
