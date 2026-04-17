import { useCallback, useRef } from 'react';

export function useAudioEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = 'sine', gain = 0.15) => {
      if (!enabledRef.current) return;
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.value = gain;
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(g).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    },
    [getCtx]
  );

  const playFlip = useCallback(() => {
    playTone(600, 0.08, 'sine', 0.1);
  }, [playTone]);

  const playMatch = useCallback(() => {
    playTone(523, 0.15, 'sine', 0.12);
    setTimeout(() => playTone(784, 0.2, 'sine', 0.12), 120);
  }, [playTone]);

  const playMismatch = useCallback(() => {
    playTone(200, 0.15, 'sawtooth', 0.08);
  }, [playTone]);

  const playVictory = useCallback(() => {
    const notes = [523, 659, 784, 1047];
    notes.forEach((n, i) => {
      setTimeout(() => playTone(n, 0.3, 'sine', 0.1), i * 150);
    });
  }, [playTone]);

  const toggleSound = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  return { playFlip, playMatch, playMismatch, playVictory, toggleSound, initAudio: getCtx };
}
