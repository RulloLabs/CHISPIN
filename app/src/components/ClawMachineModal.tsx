import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Loader2, SkipForward } from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';

/* ─── Types ──────────────────────────────────────────────────────────────── */

type ModalPhase = 'intro-video' | 'loading' | 'playing' | 'reserving';

interface ReservePayload {
  founderId: number;
  rarity: 'normal' | 'festivalero' | 'dorado' | 'azul';
}

const RARITY_STYLES: Record<string, { label: string; color: string; glow: string }> = {
  normal:      { label: 'Edición Fundadores',           color: '#C8A5FF', glow: 'rgba(139,92,246,0.4)' },
  festivalero: { label: '⚡ Chispín Festivalero',        color: '#FF0080', glow: 'rgba(255,0,128,0.5)' },
  dorado:      { label: '✨ Chispín Dorado — 1 de 500', color: '#FFB800', glow: 'rgba(255,184,0,0.6)' },
  azul:        { label: '💙 Fuego Azul — 1 de 1000',   color: '#00D4FF', glow: 'rgba(0,212,255,0.6)' },
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export function ClawMachineModal() {
  const { isClawMachineOpen, closeClawMachine } = useReservation();

  const iframeRef    = useRef<HTMLIFrameElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  const [phase, setPhase]               = useState<ModalPhase>('intro-video');
  const [reserveData, setReserveData]   = useState<ReservePayload | null>(null);
  const [name, setName]                 = useState('');
  const [email, setEmail]               = useState('');
  const [errors, setErrors]             = useState<{ name?: string; email?: string }>({});
  const [submitting, setSubmitting]     = useState(false);
  const [videoLoaded, setVideoLoaded]   = useState(false);

  /* ── Reset on open/close ─────────────────────────────────────────────── */
  useEffect(() => {
    if (isClawMachineOpen) {
      setPhase('intro-video');
      setReserveData(null);
      setName('');
      setEmail('');
      setErrors({});
      setSubmitting(false);
      setVideoLoaded(false);
    } else {
      iframeRef.current?.contentWindow?.postMessage({ type: 'CHISPIN_RESET' }, '*');
    }
  }, [isClawMachineOpen]);

  /* ── Message bridge ──────────────────────────────────────────────────── */
  const handleMessage = useCallback((e: MessageEvent) => {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'CHISPIN_RESERVE') {
      setReserveData({ founderId: e.data.founderId, rarity: e.data.rarity });
      setPhase('reserving');
    }
    if (e.data.type === 'CHISPIN_CLOSE') closeClawMachine();
  }, [closeClawMachine]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  /* ── Escape key ──────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isClawMachineOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeClawMachine(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isClawMachineOpen, closeClawMachine]);

  /* ── Intro video ended → start game ─────────────────────────────────── */
  const goToGame = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setPhase('loading');
  }, []);

  /* ── Form submit ─────────────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; email?: string } = {};
    if (!name.trim())  errs.name  = 'El nombre es obligatorio';
    if (!email.trim()) errs.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Email no válido';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res  = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, founderId: reserveData?.founderId, rarity: reserveData?.rarity }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error('No checkout URL');
    } catch {
      setErrors({ email: 'Error al iniciar el pago. Inténtalo de nuevo.' });
      setSubmitting(false);
    }
  };

  if (!isClawMachineOpen) return null;

  const rStyle = reserveData ? (RARITY_STYLES[reserveData.rarity] ?? RARITY_STYLES.normal) : RARITY_STYLES.normal;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" role="dialog" aria-modal="true">

      {/* ── Backdrop ───────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* ── Close button ───────────────────────────────────────────────── */}
      <button
        id="claw-modal-close"
        onClick={closeClawMachine}
        aria-label="Cerrar"
        className="absolute top-4 right-4 z-[220] w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/10 hover:bg-white/20 transition-all"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* PHASE 1: INTRO VIDEO                                           */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {phase === 'intro-video' && (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Dark gradient overlay for cinematic feel */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />

          {/* The intro video */}
          <video
            ref={videoRef}
            src="/video (1).mp4"
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onEnded={goToGame}
            onLoadedData={() => setVideoLoaded(true)}
          />

          {/* Loading spinner while video loads */}
          {!videoLoaded && (
            <div className="relative z-20 flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
              <p className="text-white/60 text-sm">Cargando...</p>
            </div>
          )}

          {/* Bottom bar: logo + skip button */}
          {videoLoaded && (
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between p-6 md:p-10">
              {/* Logo / branding */}
              <div>
                <div
                  style={{
                    fontFamily: "'Bangers', cursive, sans-serif",
                    fontSize: 'clamp(2rem, 6vw, 4rem)',
                    color: '#FFB800',
                    textShadow: '3px 3px 0 #FF6B00, 0 0 40px rgba(255,184,0,0.4)',
                    letterSpacing: '.05em',
                    lineHeight: 1,
                  }}
                >
                  CHISPÍN
                </div>
                <p className="text-white/60 text-xs tracking-widest uppercase mt-1">La Chispa Nunca Se Apaga</p>
              </div>

              {/* Skip / Play now */}
              <button
                onClick={goToGame}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white border border-white/30 bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <SkipForward className="w-4 h-4" />
                Jugar ahora
              </button>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* PHASE 2+3: GAME IFRAME                                          */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {(phase === 'loading' || phase === 'playing') && (
        <div
          className="relative w-full h-full sm:w-[min(98vw,700px)] sm:h-[min(96vh,800px)] sm:rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(255,184,0,0.2)',
            boxShadow: '0 0 80px rgba(74,14,143,0.5), 0 0 30px rgba(255,122,0,0.2)',
          }}
        >
          {phase === 'loading' && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#080012]">
              <div
                style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: '3.5rem',
                  color: '#FFB800',
                  textShadow: '3px 3px 0 #FF6B00',
                  letterSpacing: '.05em',
                }}
              >
                CHISPÍN
              </div>
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin mt-4" />
              <p className="text-purple-300/60 text-sm mt-3">Cargando la máquina...</p>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src="/chispin-machine.html"
            className="w-full h-full border-0"
            title="Máquina Chispín"
            allow="autoplay"
            onLoad={() => setPhase('playing')}
            style={{ display: 'block' }}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* PHASE 4: RESERVE FORM                                           */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {phase === 'reserving' && reserveData && (
        <div
          className="relative z-10 w-full max-w-md mx-4 rounded-3xl p-8 overflow-hidden"
          style={{
            background: 'rgba(14,6,36,0.97)',
            border: `1px solid ${rStyle.color}33`,
            boxShadow: `0 0 60px ${rStyle.glow}, 0 0 120px rgba(0,0,0,0.8)`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Rarity badge */}
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: `${rStyle.color}22`, color: rStyle.color, border: `1px solid ${rStyle.color}44` }}
          >
            {rStyle.label}
          </div>

          <div className="text-center mb-6">
            <h2
              className="font-black uppercase italic leading-tight mb-1"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.8rem,5vw,2.4rem)', color: '#FFB800', textShadow: '2px 2px 0 #FF6B00' }}
            >
              ¡¡Chispín<br />te ha elegido!!
            </h2>
            <p className="text-purple-200/70 text-sm mt-2">
              Unidad{' '}
              <span className="font-black" style={{ color: rStyle.color }}>
                #{String(reserveData.founderId).padStart(6, '0')}
              </span>{' '}
              · Edición Fundadores
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <img
              src="/images/chispin-front.png"
              alt="Chispín"
              className="w-28 h-28 object-contain drop-shadow-2xl"
              style={{ filter: `drop-shadow(0 0 20px ${rStyle.glow})` }}
            />
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <div>
              <input
                id="reserve-name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                className="w-full px-5 py-3.5 rounded-xl text-white placeholder-white/35 focus:outline-none focus:ring-2 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: errors.name ? '1px solid #FF4D6A' : '1px solid rgba(255,255,255,0.14)',
                }}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>}
            </div>
            <div>
              <input
                id="reserve-email"
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                className="w-full px-5 py-3.5 rounded-xl text-white placeholder-white/35 focus:outline-none focus:ring-2 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: errors.email ? '1px solid #FF4D6A' : '1px solid rgba(255,255,255,0.14)',
                }}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
            </div>

            <button
              id="reserve-submit-btn"
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-full font-black uppercase tracking-wider text-sm transition-all active:scale-[0.97] disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg,#FF7A00,#FFC83D)',
                color: '#1A0040',
                boxShadow: '0 4px 24px rgba(255,122,0,0.45)',
              }}
            >
              {submitting
                ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> PROCESANDO...</span>
                : '🛒 PAGAR CON STRIPE (39€)'}
            </button>
          </form>

          <p className="text-center text-white/30 text-[11px] mt-4">
            Pago seguro vía Stripe · Solo se cargará cuando comience el envío
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => { setPhase('playing'); setReserveData(null); }}
              className="flex-1 py-2.5 rounded-full text-center text-white/40 hover:text-white/70 text-xs transition-colors border border-white/10 hover:border-white/20"
            >
              🔄 Vuelve a intentar
            </button>
            <button
              onClick={closeClawMachine}
              className="flex-1 py-2.5 rounded-full text-center text-white/30 hover:text-white/50 text-xs transition-colors border border-white/10 hover:border-white/20"
            >
              ❌ Salir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
