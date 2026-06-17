import { useState, useEffect, useRef } from 'react';
import { Sparkles, Gift, Share2, Instagram, Users, Loader2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Rarity } from './types';
import { ATTEMPTS } from './helpers';

/* ÔöÇÔöÇÔöÇ Spark Canvas (intro bg) ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */

function SparkCanvas({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !visible) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    let pts: { x: number; y: number; vx: number; vy: number; a: number; s: number; col: string }[] = [];
    let animId = 0;

    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const newPt = () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: -(Math.random() * 1.2 + 0.3),
      a: Math.random(),
      s: Math.random() * 3 + 0.8,
      col: Math.random() < 0.5 ? '#FFB800' : '#FF6B00',
    });

    for (let i = 0; i < 65; i++) pts.push(newPt());

    const draw = () => {
      if (!c || !ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach((p, i) => {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.a -= 0.006;
        if (p.a <= 0) pts[i] = newPt();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [visible]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

/* ÔöÇÔöÇÔöÇ Intro Screen ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#080012]">
      <SparkCanvas visible />
      <div className="relative z-10 text-center px-6">
        <div className="mb-6 flex items-center justify-center gap-3">
          <Gift className="w-8 h-8 text-[#FFB800]" />
          <span className="text-[#FFB800] font-bangers text-3xl tracking-wide drop-shadow-[0_0_20px_rgba(255,184,0,0.3)]">
            CHISP├ìN
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bangers text-white leading-tight mb-4">
          ­ƒÄü Tienes <span className="text-[#FFB800]">{ATTEMPTS} intentos gratuitos</span><br />
          para rescatar a Chisp├¡n
        </h2>
        <p className="text-white/50 text-sm mb-8 font-nunito max-w-md mx-auto">
          Mueve el gancho, elige la profundidad y atrapa a tu Chisp├¡n. La m├íquina es 100% interactiva y real.
        </p>
        <button
          onClick={onStart}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#FFB800] to-[#FF6B00] text-[#1A0040] font-bangers text-2xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-[0_0_40px_rgba(255,184,0,0.3)]"
        >
          ENTRAR EN LA M├üQUINA
          <span className="block text-xs font-nunito mt-1 text-[#1A0040]/70">Intento 1/{ATTEMPTS}</span>
        </button>
      </div>
    </div>
  );
}

/* ÔöÇÔöÇÔöÇ Victory Screen ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */

interface VictoryScreenProps {
  rarity: Rarity;
  onReserve: () => void;
  onClose: () => void;
}

function getRarityInfo(rarity: Rarity) {
  const map: Record<Rarity, { cls: string; txt: string }> = {
    normal: { cls: 'text-white/70 border-white/20', txt: '­ƒÉä Chisp├¡n Fundador' },
    festivalero: { cls: 'text-purple-400 border-purple-400/30', txt: 'ÔÜí Chisp├¡n Festivalero' },
    dorado: { cls: 'text-amber-300 border-amber-300/30', txt: 'Ô£¿ Chisp├¡n Dorado ÔÇö 1 de 500' },
    azul: { cls: 'text-blue-400 border-blue-400/30', txt: '­ƒÆÖ Fuego Azul ÔÇö 1 de 1000' },
    legendario: { cls: 'text-yellow-200 border-yellow-400/60 shadow-[0_0_20px_rgba(255,200,0,0.4)]', txt: '­ƒææ CERTIFICADO LEGENDARIO ÔÇö ├ÜNICO' },
  };
  return map[rarity];
}

export function VictoryScreen({ rarity, onReserve, onClose }: VictoryScreenProps) {
  const rInfo = getRarityInfo(rarity);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const cols = ['#FFB800', '#FF6B00', '#7B2FBE', '#C8A5FF', '#FF4D00', '#FF0080'];
    const burst = () => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.4 + 0.1 },
        colors: [cols[Math.floor(Math.random() * cols.length)]],
      });
    };
    for (let i = 0; i < 8; i++) setTimeout(burst, i * 250);
  }, []);

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#080012]/95">
      <div className="text-center px-6 max-w-md">
        <div className="text-7xl mb-4">­ƒÄë</div>
        <h2 className="text-5xl font-bangers text-white mb-2">┬íLO HAS RESCATADO!</h2>
        <p className="text-white/60 font-nunito text-sm mb-6">
          Tu Chisp├¡n est├í esperando. Completa tu reserva para descubrir tu n├║mero de fundador.
        </p>

        <div className="glass rounded-2xl p-6 mb-6 border border-[#4A0E8F]">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-nunito border ${rInfo.cls}`}>
            {rInfo.txt}
          </div>
        </div>

        <button
          onClick={onReserve}
          className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FFB800] to-[#FF6B00] text-[#1A0040] font-bangers text-xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,184,0,0.3)]"
        >
          RESERVAR MI CHISP├ìN
          <span className="block text-xs font-nunito mt-1 text-[#1A0040]/70">39Ôé¼ ┬À Edici├│n Fundadores</span>
        </button>

        <button onClick={onClose} className="mt-3 text-white/30 text-sm hover:text-white/60 font-nunito block mx-auto">
          Cerrar
        </button>
      </div>
    </div>
  );
}

/* ÔöÇÔöÇÔöÇ Reserve / Form Screen ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */

interface ReserveScreenProps {
  onBack: () => void;
}

export function ReserveScreen({ onBack }: ReserveScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!email.trim()) newErrors.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email no v├ílido';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No se pudo iniciar el pago');
      }
    } catch {
      setErrors({ email: 'Error al iniciar el pago. Int├®ntalo de nuevo.' });
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass rounded-3xl p-8 max-w-md w-full mx-4 border border-[#4A0E8F]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Sparkles className="w-8 h-8 text-[#FFB800]" />
            <h3 className="font-bangers text-2xl text-white mt-2">Reserva tu Chisp├¡n</h3>
            <p className="text-white/60 text-sm">Edici├│n Fundadores ┬À 39Ôé¼</p>
          </div>
          <button onClick={onBack} className="p-1 text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })); }}
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800]/50 transition-all font-nunito"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1 font-nunito">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800]/50 transition-all font-nunito"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1 font-nunito">{errors.email}</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full text-center justify-center disabled:opacity-50 font-bangers">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin inline-block mr-2" /> PROCESANDO...</> : 'RESERVAR POR 39Ôé¼'}
          </button>
        </form>
        <p className="text-white/40 text-xs text-center mt-4 font-nunito">Pago seguro v├¡a Stripe</p>
      </div>
    </div>
  );
}

/* ÔöÇÔöÇÔöÇ No Attempts Screen ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ */

interface NoAttemptsScreenProps {
  onReserve: () => void;
  onEarnAttempt: (amount: number) => void;
  onClose: () => void;
}

export function NoAttemptsScreen({ onReserve, onEarnAttempt, onClose }: NoAttemptsScreenProps) {
  const socialActions = [
    { icon: <Share2 className="w-5 h-5" />, label: 'Comparte Chisp├¡n', reward: '+1 intento', action: () => onEarnAttempt(1) },
    { icon: <Instagram className="w-5 h-5" />, label: 'S├¡guenos en Instagram', reward: '+1 intento', action: () => onEarnAttempt(1) },
    { icon: <Users className="w-5 h-5" />, label: 'Invita a un amigo', reward: '+3 intentos', action: () => onEarnAttempt(3) },
  ];

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#080012]/95 px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">­ƒÿà</div>
        <h2 className="text-4xl font-bangers text-white mb-2">
          Has utilizado tus {ATTEMPTS} rescates gratuitos
        </h2>
        <p className="text-white/50 font-nunito text-sm mb-8">
          La m├íquina es real. Si has llegado hasta aqu├¡, sabes que el gancho, las c├ímaras y la profundidad no son un truco.
        </p>

        {/* Reserve option */}
        <button
          onClick={onReserve}
          className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FFB800] to-[#FF6B00] text-[#1A0040] font-bangers text-xl font-bold hover:scale-105 active:scale-95 transition-transform mb-6 shadow-[0_0_30px_rgba(255,184,0,0.3)]"
        >
          ­ƒÆ│ Reservar Chisp├¡n
          <span className="block text-xs font-nunito mt-1 text-[#1A0040]/70">39Ôé¼ ┬À Edici├│n Fundadores</span>
        </button>

        <div className="relative mb-6">
          <div className="border-t border-white/10" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#080012] px-4 text-white/30 text-xs font-nunito">
            o consigue m├ís intentos
          </span>
        </div>

        {/* Social actions */}
        <div className="space-y-3">
          {socialActions.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#FFB800]">{item.icon}</span>
                <span className="font-nunito text-sm">{item.label}</span>
              </div>
              <span className="text-[#FFB800] text-xs font-bold font-nunito">{item.reward}</span>
            </button>
          ))}
        </div>

        <button onClick={onClose} className="mt-6 text-white/30 text-sm hover:text-white/60 font-nunito">
          Cerrar
        </button>
      </div>
    </div>
  );
}


