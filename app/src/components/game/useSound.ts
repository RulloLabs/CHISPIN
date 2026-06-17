import { useRef, useCallback, useEffect } from 'react';

let _ctx: AudioContext | null = null;
function getCtx(): AudioContext {
  if (!_ctx) _ctx = new AudioContext();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function playTone(freq: number, dur: number, type: OscillatorType = 'square', vol = 0.08) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + dur);
}

export function useSound() {
  const muteRef = useRef(false);

  const tick = useCallback(() => {
    if (muteRef.current) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.04);
  }, []);

  const whirr = useCallback(() => {
    if (muteRef.current) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.6);
  }, []);

  const grab = useCallback(() => {
    if (muteRef.current) return;
    playTone(200, 0.15, 'square', 0.1);
    setTimeout(() => playTone(400, 0.1, 'square', 0.08), 60);
  }, []);

  const win = useCallback(() => {
    if (muteRef.current) return;
    [523, 659, 784].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.2, 'square', 0.08), i * 120);
    });
  }, []);

  const fail = useCallback(() => {
    if (muteRef.current) return;
    [300, 200].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.25, 'sawtooth', 0.06), i * 150);
    });
  }, []);

  const countdownTick = useCallback(() => {
    if (muteRef.current) return;
    playTone(1000, 0.06, 'square', 0.06);
  }, []);

  const toggleMute = useCallback(() => {
    muteRef.current = !muteRef.current;
    return muteRef.current;
  }, []);

  useEffect(() => {
    const handleVis = () => { if (document.hidden && _ctx) _ctx.suspend(); };
    document.addEventListener('visibilitychange', handleVis);
    return () => document.removeEventListener('visibilitychange', handleVis);
  }, []);

  return { tick, whirr, grab, win, fail, countdownTick, toggleMute, muted: muteRef };
}
