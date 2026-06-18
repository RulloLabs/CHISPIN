import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { X } from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';
import { GameHUD, IntroScreen, VictoryScreen, ReserveScreen, NoAttemptsScreen, useSound } from '@/components/game';

const Maquina3D = lazy(() => import('@/components/game/Maquina3D').then(m => ({ default: m.Maquina3D })));
import type { CameraView, ClawPosition, GamePhase } from '@/components/game';
import {
  ATTEMPTS,
  ATTEMPT_TIMES,
  SUCCESS_PROB,
  getRarity,
  clampClaw,
  getRandomNearMissText,
  CHISPINES,
} from '@/components/game';
import gsap from 'gsap';

const MACHINE_IMAGES: Record<CameraView, string> = {
  front: '/images/machine-front.svg',
  left: '/images/machine-left.svg',
  right: '/images/machine-right.svg',
};

function shakeViewport() {
  const el = document.getElementById('claw-machine-game');
  if (!el) return;
  gsap.to(el, { x: 3, duration: 0.05, ease: 'power2.inOut', yoyo: true, repeat: 5 });
}

export function ClawMachineModal() {
  const { isClawMachineOpen, closeClawMachine } = useReservation();
  const sound = useSound();
  const [muted, setMuted] = useState(false);

  const [phase, setPhase] = useState<GamePhase>('intro');
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [timerSec, setTimerSec] = useState(0);
  const [cameraView, setCameraView] = useState<CameraView>('front');
  const [clawPos, setClawPos] = useState<ClawPosition>({ x: 0, z: 0 });
  const [isCatching, setIsCatching] = useState(false);
  const [catchResult, setCatchResult] = useState<boolean | null>(null);
  const [rarity, setRarity] = useState(getRarity());
  const [nearMissText, setNearMissText] = useState('');
  const [nearMissVisible, setNearMissVisible] = useState(false);
  const [flashHtml, setFlashHtml] = useState('');
  const [flashVisible, setFlashVisible] = useState(false);
  const [grabbedIndex, setGrabbedIndex] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showFlash = useCallback((html: string) => {
    setFlashHtml(html);
    setFlashVisible(true);
  }, []);

  const hideFlash = useCallback(() => {
    setFlashVisible(false);
  }, []);

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

  const handleStart = useCallback(() => {
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
    sound.grab();
  }, [startTimer, clearTimeouts, sound]);

  const handleCatch = useCallback(() => {
    if (isCatching || attemptsUsed >= ATTEMPTS || phase !== 'playing') return;

    stopTimer();
    setIsCatching(true);
    sound.whirr();

    const willSucceed = Math.random() < SUCCESS_PROB[attemptsUsed];

    setCatchResult(willSucceed);

    if (willSucceed) {
      const idx = findNearest(clawPos);
      setGrabbedIndex(idx);
    }
  }, [isCatching, attemptsUsed, phase, clawPos, stopTimer, findNearest, sound]);

  const handleCatchComplete = useCallback(
    (success: boolean) => {
      setCatchResult(null);
      setGrabbedIndex(null);

      if (success) {
        sound.win();
        setIsCatching(false);
        setPhase('victory');
        return;
      }

      sound.fail();
      shakeViewport();

      const nmText = getRandomNearMissText();
      setNearMissText(nmText);
      setNearMissVisible(true);

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
            `<span style="color:var(--gold)">┬íInt├®ntalo de nuevo!</span><br><span style="font-size:.6em;color:#C8A5FF">Intento ${nextAttempt + 1}/${ATTEMPTS} ┬À ${nextTime}s</span>`,
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
    [attemptsUsed, sound, showFlash, hideFlash, startTimer],
  );

  const handleClawMove = useCallback(
    (dx: number, dz: number) => {
      if (isCatching) return;
      setClawPos((prev) => clampClaw({ x: prev.x + dx * 0.13, z: prev.z + dz * 0.13 }));
      sound.tick();
    },
    [isCatching, sound],
  );

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

  useEffect(() => {
    if (phase === 'playing' && timerSec <= 0 && !isCatching && attemptsUsed < ATTEMPTS) {
      handleCatch();
    }
  }, [timerSec, phase, isCatching, attemptsUsed, handleCatch]);

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

  useEffect(() => {
    return () => {
      stopTimer();
      clearTimeouts();
    };
  }, [stopTimer, clearTimeouts]);

  const handleCountdownTick = useCallback(() => {
    sound.countdownTick();
  }, [sound]);

  const handleSoundToggle = useCallback(() => {
    const newMuted = sound.toggleMute();
    setMuted(newMuted);
  }, [sound]);

  if (!isClawMachineOpen) return null;

  const isPlaying = phase === 'playing';
  const controlsDisabled = isCatching || flashVisible || nearMissVisible;

  return (
    <div id="claw-machine-root" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080012]">
      <button
        onClick={closeClawMachine}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors border border-white/20"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="absolute top-0 left-0 right-0 z-45 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <span className="text-white/80 text-sm font-nunito">­ƒÄ« M├íquina de Chispines</span>
        {isPlaying && attemptsUsed < ATTEMPTS && (
          <button
            onClick={handleReserve}
            className="px-5 py-2 text-sm rounded-full bg-gradient-to-r from-[#FFB800] to-[#FF6B00] text-[#1A0040] font-bold hover:scale-105 transition-transform font-nunito"
          >
            RESERVAR POR 39Ôé¼
          </button>
        )}
      </div>

      <div id="claw-machine-game" className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-[1100px] max-h-[900px] aspect-[4/3]">
          <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center bg-[#080012]"><div className="w-12 h-12 border-4 border-[#FFB800] border-t-transparent rounded-full animate-spin" /></div>}>
            <Maquina3D
              clawPos={clawPos}
              cameraView={cameraView}
              isCatching={isCatching}
              catchSuccess={catchResult}
              grabbedIndex={grabbedIndex}
              onCatchComplete={handleCatchComplete}
            />
          </Suspense>
        </div>

        <img
          src={MACHINE_IMAGES[cameraView]}
          alt="M├íquina de Chispines"
          className="absolute inset-0 w-full h-full z-10 pointer-events-none object-contain"
          style={{ filter: 'drop-shadow(0 0 40px rgba(123,47,190,0.3))' }}
        />

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
            onCatch={handleCatch}
            onCountdownTick={handleCountdownTick}
            muted={muted}
            onSoundToggle={handleSoundToggle}
          />
        )}
      </div>

      {phase === 'intro' && <IntroScreen onStart={handleStart} />}
      {phase === 'victory' && (
        <VictoryScreen rarity={rarity} onReserve={handleReserve} onClose={closeClawMachine} />
      )}
      {phase === 'reserve' && <ReserveScreen onBack={() => setPhase('victory')} />}
      {phase === 'noattempts' && (
        <NoAttemptsScreen onReserve={handleReserve} onEarnAttempt={handleEarnAttempt} onClose={closeClawMachine} />
      )}
    </div>
  );
}
