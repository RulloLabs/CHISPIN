import { useEffect, useRef, useCallback } from 'react';
import { Timer, Crosshair, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CameraView, ClawPosition } from './types';
import { ATTEMPTS } from './helpers';

/* ─── Timer Badge ────────────────────────────────────────────────────── */

function TimerBadge({ sec }: { sec: number }) {
  const urgent = sec <= 10;
  if (sec <= 0) return null;
  return (
    <div
      className={`absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold font-nunito transition-all ${
        urgent
          ? 'bg-red-900/60 border-red-500/60 text-red-300 animate-pulse'
          : 'bg-black/50 border-white/20 text-white/80'
      }`}
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <Timer className={`w-4 h-4 ${urgent ? 'text-red-300' : 'text-white/60'}`} />
      <span>{sec}s</span>
    </div>
  );
}

/* ─── Attempt Dots ───────────────────────────────────────────────────── */

function AttemptDots({ total, used }: { total: number; used: number }) {
  return (
    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/20" style={{ backdropFilter: 'blur(8px)' }}>
      <span className="text-xs text-white/60 font-nunito">Intentos</span>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full border transition-all ${
              i < used
                ? 'bg-red-500/40 border-red-500/60'
                : 'bg-[#FFB800]/20 border-[#FFB800]/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Camera Controls ────────────────────────────────────────────────── */

function CameraControls({ current, onChange }: { current: CameraView; onChange: (v: CameraView) => void }) {
  const toggleLeft = () => onChange(current === 'left' ? 'front' : 'left');
  const toggleRight = () => onChange(current === 'right' ? 'front' : 'right');
  const btnClass = (side: 'left' | 'right') =>
    `w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200 select-none touch-none ${
      (side === 'left' && current === 'left') || (side === 'right' && current === 'right')
        ? 'border-[#FF6B00] text-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.4)] bg-[#FF6B00]/10'
        : 'border-white/20 text-white/60 hover:border-[#FF6B00]/60 hover:text-[#FF6B00] hover:shadow-[0_0_15px_rgba(255,107,0,0.2)]'
    } hover:scale-110 active:scale-95`;
  return (
    <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 md:gap-8">
      <button onClick={toggleLeft} className={btnClass('left')} style={{ backdropFilter: 'blur(8px)' }}>
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button onClick={toggleRight} className={btnClass('right')} style={{ backdropFilter: 'blur(8px)' }}>
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
}

/* ─── Joystick ───────────────────────────────────────────────────────── */

interface JoystickProps {
  onMove: (dx: number, dz: number) => void;
  onMoveStart: () => void;
  onMoveEnd: () => void;
  disabled: boolean;
}

function Joystick({ onMove, onMoveStart, onMoveEnd, disabled }: JoystickProps) {
  const moveInterval = useRef<number | null>(null);

  const startMove = useCallback(
    (dx: number, dz: number) => {
      if (disabled) return;
      onMoveStart();
      onMove(dx, dz);
      moveInterval.current = window.setInterval(() => onMove(dx, dz), 75);
    },
    [disabled, onMove, onMoveStart],
  );

  const stopMove = useCallback(() => {
    if (moveInterval.current !== null) {
      clearInterval(moveInterval.current);
      moveInterval.current = null;
    }
    onMoveEnd();
  }, [onMoveEnd]);

  useEffect(() => () => { if (moveInterval.current !== null) clearInterval(moveInterval.current); }, []);

  const btn = (_dir: string, dx: number, dz: number, label: string) => (
    <button
      onTouchStart={(e) => { e.preventDefault(); startMove(dx, dz); }}
      onTouchEnd={(e) => { e.preventDefault(); stopMove(); }}
      onMouseDown={() => startMove(dx, dz)}
      onMouseUp={stopMove}
      onMouseLeave={stopMove}
      disabled={disabled}
      className="w-14 h-14 rounded-full bg-white/10 border border-white/20 text-white/80 text-xl font-bold disabled:opacity-30 active:bg-white/20 select-none touch-none"
    >
      {label}
    </button>
  );

  return (
    <div className="absolute bottom-32 left-6 z-20 select-none touch-none">
      <div className="grid grid-cols-3 gap-1.5">
        <div />
        {btn('up', 0, -1, '▲')}
        <div />
        {btn('left', -1, 0, '◀')}
        <div className="w-14 h-14 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800]/50 text-xs font-bold">
          CL
        </div>
        {btn('right', 1, 0, '▶')}
        <div />
        {btn('down', 0, 1, '▼')}
        <div />
      </div>
    </div>
  );
}

/* ─── Position Indicator ─────────────────────────────────────────────── */

function PositionIndicator({ clawPos }: { clawPos: ClawPosition }) {
  return (
    <div className="absolute bottom-6 right-6 z-20 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white/50 text-xs font-mono" style={{ backdropFilter: 'blur(8px)' }}>
      X: {clawPos.x.toFixed(1)} / Z: {clawPos.z.toFixed(1)}
    </div>
  );
}

/* ─── Near Miss Overlay ──────────────────────────────────────────────── */

function NearMissOverlay({ text, visible }: { text: string; visible: boolean }) {
  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <span
        className="text-6xl font-bangers text-[#FF4D00] drop-shadow-[0_0_30px_rgba(255,77,0,0.8)]"
        style={{ textShadow: '0 0 20px rgba(255,77,0,0.6), 0 0 60px rgba(255,77,0,0.3)' }}
      >
        {text}
      </span>
    </div>
  );
}

/* ─── Flash Message ──────────────────────────────────────────────────── */

function FlashMessage({ html, visible }: { html: string; visible: boolean }) {
  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="text-center px-8 py-4 rounded-2xl"
        style={{ background: 'rgba(8,0,18,0.85)', backdropFilter: 'blur(12px)' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

/* ─── Main HUD ───────────────────────────────────────────────────────── */

interface GameHUDProps {
  timerSec: number;
  attemptsUsed: number;
  cameraView: CameraView;
  clawPos: ClawPosition;
  isCatching: boolean;
  nearMiss: { text: string; visible: boolean };
  flash: { html: string; visible: boolean };
  onCameraChange: (v: CameraView) => void;
  onClawMove: (dx: number, dz: number) => void;
  onClawMoveStart: () => void;
  onClawMoveEnd: () => void;
  onCatch: () => void;
}

export function GameHUD({
  timerSec,
  attemptsUsed,
  cameraView,
  clawPos,
  isCatching,
  nearMiss,
  flash,
  onCameraChange,
  onClawMove,
  onClawMoveStart,
  onClawMoveEnd,
  onCatch,
}: GameHUDProps) {
  // Keyboard controls
  const keyState = useRef<Set<string>>(new Set());
  const moveInterval = useRef<number | null>(null);

  const processKeys = useCallback(() => {
    let dx = 0;
    let dz = 0;
    if (keyState.current.has('ArrowLeft')) dx -= 1;
    if (keyState.current.has('ArrowRight')) dx += 1;
    if (keyState.current.has('ArrowUp')) dz -= 1;
    if (keyState.current.has('ArrowDown')) dz += 1;
    if (dx !== 0 || dz !== 0) {
      onClawMove(dx, dz);
    }
  }, [onClawMove]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        if (isCatching) return;
        keyState.current.add(e.key);
        if (moveInterval.current === null) {
          onClawMoveStart();
          processKeys();
          moveInterval.current = window.setInterval(processKeys, 75);
        }
      }
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        onCatch();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        keyState.current.delete(e.key);
        if (keyState.current.size === 0 && moveInterval.current !== null) {
          clearInterval(moveInterval.current);
          moveInterval.current = null;
          onClawMoveEnd();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (moveInterval.current !== null) clearInterval(moveInterval.current);
    };
  }, [isCatching, onClawMove, onClawMoveStart, onClawMoveEnd, processKeys, onCatch]);

  return (
    <>
      <TimerBadge sec={timerSec} />
      <AttemptDots total={ATTEMPTS} used={attemptsUsed} />
      <CameraControls current={cameraView} onChange={onCameraChange} />
      <Joystick onMove={onClawMove} onMoveStart={onClawMoveStart} onMoveEnd={onClawMoveEnd} disabled={isCatching} />
      <PositionIndicator clawPos={clawPos} />
      <NearMissOverlay text={nearMiss.text} visible={nearMiss.visible} />
      <FlashMessage html={flash.html} visible={flash.visible} />

      {/* Catch button */}
      <button
        onClick={onCatch}
        disabled={isCatching}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB800] to-[#FF6B00] text-[#1A0040] font-bangers text-lg font-bold shadow-[0_0_30px_rgba(255,107,0,0.4)] disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform border-4 border-[#FFB800]/50"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255,107,0,0.3))' }}
      >
        <Crosshair className="w-8 h-8 mx-auto" />
        <span className="block text-[10px] -mt-0.5">ATRAPAR</span>
      </button>
    </>
  );
}
