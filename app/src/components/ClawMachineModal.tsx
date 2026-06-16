import { useState, useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';
import { Maquina3D, GameHUD, IntroScreen, VictoryScreen, ReserveScreen, NoAttemptsScreen } from '@/components/game';
import type { CameraView, ClawPosition, GamePhase } from '@/components/game';
import {
  ATTEMPTS,
  ATTEMPT_TIMES,
  SUCCESS_PROB,
  getRarity,
  getFounderId,
  isSpecialFounder,
  clampClaw,
  getRandomNearMissText,
  CHISPINES,
} from '@/components/game';

const MACHINE_IMAGES: Record<CameraView, string> = {
  front: '/images/machine-front.svg',
  left: '/images/machine-left.svg',
  right: '/images/machine-right.svg',
};

export function ClawMachineModal() {
  const { isClawMachineOpen, closeClawMachine } = useReservation();

  // ── Game state ──────────────────────────────────────────────────────
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [timerSec, setTimerSec] = useState(0);
  const [cameraView, setCameraView] = useState<CameraView>('front');
  const [clawPos, setClawPos] = useState<ClawPosition>({ x: 0, z: 0 });
  const [isCatching, setIsCatching] = useState(false);
  const [catchResult, setCatchResult] = useState<boolean | null>(null);
  const [founderId, setFounderId] = useState(0);
  const [rarity, setRarity] = useState(getRarity());
  const [nearMissText, setNearMissText] = useState('');
  const [nearMissVisible, setNearMissVisible] = useState(false);
  const [flashHtml, setFlashHtml] = useState('');
  const [flashVisible, setFlashVisible] = useState(false);
  const [grabbedIndex, setGrabbedIndex] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Timer control ───────────────────────────────────────────────────
  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (sec: number) => {
      stopTimer();
      setTimerSec(sec);
      timerRef.current = setInterval(() => {
        setTimerSec((prev) => {
          if (prev <= 1) {
            stopTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [stopTimer],
  );

  // ── Helper: clear all timeouts ──────────────────────────────────────
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // ── Show flash message ──────────────────────────────────────────────
  const showFlash = useCallback((html: string) => {
    setFlashHtml(html);
    setFlashVisible(true);
  }, []);

  const hideFlash = useCallback(() => {
    setFlashVisible(false);
  }, []);

  // ── Find nearest chispin ────────────────────────────────────────────
  const findNearest = useCallback(
    (pos: ClawPosition): number => {
      let bestIdx = 0;
      let bestDist = Infinity;
      CHISPINES.forEach((p, i) => {
        const d = Math.hypot(p.x - pos.x, p.z - pos.z);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });
      return bestIdx;
    },
    [],
  );

  // ── Start game ──────────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    const id = getFounderId();
    setFounderId(id);
    setRarity(getRarity());
    setAttemptsUsed(0);
    setClawPos({ x: 0, z: 0 });
    setCatchResult(null);
    setGrabbedIndex(null);
    setIsCatching(false);
    setNearMissVisible(false);
    setFlashVisible(false);
    setPhase('playing');
    clearTimeouts();
    startTimer(ATTEMPT_TIMES[0]);

    if (isSpecialFounder(id)) {
      showFlash(
        `<span style="color:#FF4D00">🔥 ¡Chispín Especial!</span><br><span style="font-size:.6em;color:#C8A5FF">Unidad nº ${id}</span>`,
      );
    }
  }, [startTimer, showFlash, clearTimeouts]);

  // ── Trigger catch ───────────────────────────────────────────────────
  const handleCatch = useCallback(() => {
    if (isCatching || attemptsUsed >= ATTEMPTS || phase !== 'playing') return;

    stopTimer();
    setIsCatching(true);

    // Decide success (last attempt always wins, special always wins on first)
    const willSucceed =
      (isSpecialFounder(founderId) && attemptsUsed === 0) ||
      Math.random() < SUCCESS_PROB[attemptsUsed];

    setCatchResult(willSucceed);

    if (willSucceed) {
      const idx = findNearest(clawPos);
      setGrabbedIndex(idx);
    }
  }, [isCatching, attemptsUsed, phase, founderId, clawPos, stopTimer, findNearest]);

  // ── Catch animation complete ────────────────────────────────────────
  const handleCatchComplete = useCallback(
    (success: boolean) => {
      setCatchResult(null);
      setGrabbedIndex(null);

      if (success) {
        setIsCatching(false);
        setPhase('victory');
        return;
      }

      // ── Fail sequence ──
      const nmText = getRandomNearMissText();
      setNearMissText(nmText);
      setNearMissVisible(true);

      // After near miss display, advance attempt
      timeoutRef.current = setTimeout(() => {
        setNearMissVisible(false);

        const nextAttempt = attemptsUsed + 1;
        setAttemptsUsed(nextAttempt);

        if (nextAttempt >= ATTEMPTS) {
          setIsCatching(false);
          setPhase('noattempts');
        } else {
          const nextTime = ATTEMPT_TIMES[nextAttempt];
          showFlash(
            `<span style="color:var(--gold)">¡Inténtalo de nuevo!</span><br><span style="font-size:.6em;color:#C8A5FF">Intento ${nextAttempt + 1}/${ATTEMPTS} · ${nextTime}s</span>`,
          );
          timeoutRef.current = setTimeout(() => {
            hideFlash();
            setIsCatching(false);
            setPhase('playing');
            startTimer(nextTime);
          }, 2200);
        }
      }, 1200);
    },
    [attemptsUsed, clawPos, findNearest, showFlash, hideFlash, startTimer],
  );

  // ── Joystick ────────────────────────────────────────────────────────
  const handleClawMove = useCallback(
    (dx: number, dz: number) => {
      if (isCatching) return;
      setClawPos((prev) => clampClaw({ x: prev.x + dx * 0.13, z: prev.z + dz * 0.13 }));
    },
    [isCatching],
  );

  // ── Screen navigation ───────────────────────────────────────────────
  const handleReserve = useCallback(() => {
    setPhase('reserve');
  }, []);

  const handleEarnAttempt = useCallback(
    (amount: number) => {
      setAttemptsUsed((prev) => {
        const newVal = Math.max(0, prev - amount);
        if (newVal < ATTEMPTS) {
          clearTimeouts();
          setIsCatching(false);
          setPhase('playing');
          startTimer(ATTEMPT_TIMES[newVal]);
        }
        return newVal;
      });
    },
    [startTimer, clearTimeouts],
  );

  // ── Auto-fail on timer 0 ────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'playing' && timerSec <= 0 && !isCatching && attemptsUsed < ATTEMPTS) {
      handleCatch();
    }
  }, [timerSec, phase, isCatching, attemptsUsed, handleCatch]);

  // ── Space key ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.key === ' ') && phase === 'playing' && !isCatching) {
        e.preventDefault();
        handleCatch();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, isCatching, handleCatch]);

  // ── Cleanup ─────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopTimer();
      clearTimeouts();
    };
  }, [stopTimer, clearTimeouts]);

  if (!isClawMachineOpen) return null;

  const isPlaying = phase === 'playing';
  const controlsDisabled = isCatching || flashVisible || nearMissVisible;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080012]">
      {/* Close button */}
      <button
        onClick={closeClawMachine}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors border border-white/20"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-45 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <span className="text-white/80 text-sm font-nunito">🎮 Máquina de Chispines</span>
        {isPlaying && attemptsUsed < ATTEMPTS && (
          <button
            onClick={handleReserve}
            className="px-5 py-2 text-sm rounded-full bg-gradient-to-r from-[#FFB800] to-[#FF6B00] text-[#1A0040] font-bold hover:scale-105 transition-transform font-nunito"
          >
            RESERVAR POR 39€
          </button>
        )}
      </div>

      {/* 3D Scene — renders behind machine overlay */}
      <div className="absolute inset-0 z-0">
        <Maquina3D
          clawPos={clawPos}
          cameraView={cameraView}
          isCatching={isCatching}
          catchSuccess={catchResult}
          grabbedIndex={grabbedIndex}
          onCatchComplete={handleCatchComplete}
        />
      </div>

      {/* Machine cabinet overlay — glass area transparent, 3D shows through */}
      <img
        src={MACHINE_IMAGES[cameraView]}
        alt="Máquina de Chispines"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none object-contain"
        style={{ filter: 'drop-shadow(0 0 40px rgba(123,47,190,0.3))' }}
      />

      {/* HUD overlay */}
      {isPlaying && (
        <GameHUD
          timerSec={timerSec}
          attemptsUsed={attemptsUsed}
          cameraView={cameraView}
          clawPos={clawPos}
          isCatching={controlsDisabled}
          nearMiss={{ text: nearMissText, visible: nearMissVisible }}
          flash={{ html: flashHtml, visible: flashVisible }}
          onCameraChange={setCameraView}
          onClawMove={handleClawMove}
          onClawMoveStart={() => {}}
          onClawMoveEnd={() => {}}
          onCatch={handleCatch}
        />
      )}

      {/* Screen overlays */}
      {phase === 'intro' && <IntroScreen onStart={handleStart} />}
      {phase === 'victory' && (
        <VictoryScreen founderId={founderId} rarity={rarity} onReserve={handleReserve} onClose={closeClawMachine} />
      )}
      {phase === 'reserve' && <ReserveScreen onBack={() => setPhase('victory')} founderId={founderId} />}
      {phase === 'noattempts' && (
        <NoAttemptsScreen onReserve={handleReserve} onEarnAttempt={handleEarnAttempt} onClose={closeClawMachine} />
      )}
    </div>
  );
}
