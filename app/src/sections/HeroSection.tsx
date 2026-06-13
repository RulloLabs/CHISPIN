import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Shield, Truck, Lock } from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';

const trustBadges = [
  { icon: Shield, label: 'Edición Fundadores', sub: 'Solo las primeras 5.000 unidades' },
  { icon: Truck, label: 'Envío Garantizado', sub: 'A toda España en 5-7 días' },
  { icon: Lock, label: 'Pago Seguro', sub: 'Stripe cifrado 256-bit' },
];

export function HeroSection() {
  const { openClawMachine } = useReservation();
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Spark particle animation (matching reference HTML)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Pt = { x: number; y: number; vx: number; vy: number; a: number; s: number; col: string };
    const newPt = (): Pt => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: -(Math.random() * 1.2 + 0.3),
      a: Math.random(),
      s: Math.random() * 3 + 0.8,
      col: Math.random() < 0.5 ? '#FFB800' : '#FF6B00',
    });
    let pts: Pt[] = Array.from({ length: 70 }, newPt);
    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p, i) => {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.a -= 0.005;
        if (p.a <= 0) pts[i] = newPt();
      });
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    ).fromTo(imgRef.current,
      { opacity: 0, x: 60, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
      '-=0.5'
    ).fromTo(badgesRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    );
  }, []);

  const scrollToOrigen = () => {
    document.querySelector('#origen')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 35%, #1E0650 0%, #080012 70%)' }}
    >
      {/* Spark canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Purple glow top-left */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(74,14,143,0.3) 0%, transparent 70%)' }} />
      {/* Orange glow right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.25) 0%, transparent 70%)' }} />

      <div className="container-custom relative z-10 pt-24 pb-8 w-full">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-center">

          {/* LEFT: Text */}
          <div ref={textRef} className="lg:col-span-3 text-center lg:text-left" style={{ opacity: 0 }}>

            {/* Headline */}
            <h1
              className="font-bangers text-5xl sm:text-6xl md:text-7xl xl:text-8xl leading-[0.95] mb-6"
              style={{ letterSpacing: '0.03em' }}
            >
              <span className="text-white block">LAS FIESTAS CAMBIAN.</span>
              <span className="block" style={{
                background: 'linear-gradient(135deg, #FFB800, #FF6B00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                LAS AMISTADES<br />PERMANECEN.
              </span>
            </h1>

            {/* Sub */}
            <p className="text-white/65 font-nunito text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
              Chispín guarda todas esas historias que nacen en una peña, una verbena o una noche de verano.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button onClick={openClawMachine} className="btn-primary text-base px-8 py-4">
                🔥 RESERVA TU CHISPÍN
              </button>
              <button onClick={scrollToOrigen} className="btn-outline text-base px-8 py-4">
                DESCUBRE SU HISTORIA
              </button>
            </div>

            {/* Trust badges */}
            <div ref={badgesRef} className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0" style={{ opacity: 0 }}>
              {trustBadges.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="glass rounded-xl p-3 text-center">
                  <Icon className="w-4 h-4 text-[#FFB800] mx-auto mb-1" />
                  <div className="text-white text-[10px] font-nunito font-black uppercase tracking-wider leading-tight">{label}</div>
                  <div className="text-white/40 text-[9px] font-nunito mt-0.5 leading-tight">{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Chispín + badge */}
          <div ref={imgRef} className="lg:col-span-2 relative flex justify-center lg:justify-end" style={{ opacity: 0 }}>
            <div className="relative">
              {/* "18 CM" badge */}
              <div className="absolute top-4 right-0 z-20 w-20 h-20 rounded-full flex flex-col items-center justify-center text-center"
                style={{
                  background: 'linear-gradient(135deg, #4A0E8F, #7B2FBE)',
                  border: '2px solid #FFB800',
                  boxShadow: '0 0 20px rgba(255,184,0,0.4)',
                }}>
                <span className="font-bangers text-[#FFB800] text-2xl leading-none">18</span>
                <span className="text-white/70 text-[8px] font-nunito font-bold uppercase leading-tight">CM DE PURA<br/>TERNURA</span>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[380px] h-[380px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.3) 0%, rgba(74,14,143,0.2) 50%, transparent 70%)' }} />
              </div>

              {/* Chispín image */}
              <img
                src="/images/chispin-hero.png"
                alt="Chispín — Edición Fundadores"
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] object-contain animate-float drop-shadow-2xl"
              />

              {/* Spark decorations */}
              <div className="absolute top-10 left-0 w-3 h-3 rounded-full bg-[#FFB800] opacity-60 animate-pulse" />
              <div className="absolute bottom-16 right-2 w-2 h-2 rounded-full bg-[#FF6B00] opacity-80 animate-ping" />
              <div className="absolute top-1/2 -left-4 w-4 h-4 rounded-full bg-[#7B2FBE] opacity-40 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce">
        <div className="w-[1px] h-8 bg-white/40" />
        <span className="text-white/60 text-[10px] font-nunito uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
}
