import { useRef, useEffect } from 'react';
import { useReservation } from '@/context/ReservationContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Truck, ShieldCheck, MessageCircle, Users } from 'lucide-react';

export function FinalCTASection() {
  const { openClawMachine } = useReservation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    interface Firework {
      x: number;
      y: number;
      particles: { vx: number; vy: number; alpha: number; color: string; size: number }[];
      alive: boolean;
    }

    const fireworks: Firework[] = [];
    const colors = ['#6B2FB8', '#FF7A00', '#FFC83D', '#FF6B9D', '#8B5CF6'];

    const createFirework = () => {
      const x = 100 + Math.random() * (canvas.offsetWidth - 200);
      const y = 50 + Math.random() * (canvas.offsetHeight * 0.4);
      const particleCount = 20 + Math.floor(Math.random() * 20);
      
      const particles = Array.from({ length: particleCount }, () => ({
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 1,
      }));
      
      fireworks.push({ x, y, particles, alive: true });
    };

    let frame = 0;
    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      frame++;
      if (frame % 120 === 0) createFirework();

      fireworks.forEach(fw => {
        fw.particles.forEach(p => {
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.vy += 0.02;
          p.alpha -= 0.008;
          
          fw.x += p.vx;
          fw.y += p.vy;
          
          if (p.alpha > 0) {
            ctx.beginPath();
            ctx.arc(fw.x, fw.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(p.alpha, 0);
            ctx.fill();
          }
        });
        
        fw.alive = fw.particles.some(p => p.alpha > 0);
      });

      for (let i = fireworks.length - 1; i >= 0; i--) {
        if (!fireworks[i].alive) fireworks.splice(i, 1);
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0d0720] to-[#060410] pt-20">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen"
      />
      
      {/* 1. Main Banner area */}
      <div className="container-custom relative z-10 pb-16">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#ff7a00]/90 via-[#6b2fb8]/95 to-[#1c0e35]/98 border border-white/10 shadow-2xl p-8 md:p-12">
            
            {/* Background sparkle effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,200,61,0.2),transparent_60%)] pointer-events-none" />
            
            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Plushie image (lg:col-span-3) */}
              <div className="lg:col-span-3 flex justify-center lg:justify-start">
                <img 
                  src="/images/chispin-hero.png" 
                  alt="Chispín" 
                  className="w-full max-w-[200px] h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Middle Column: Text & CTA Button (lg:col-span-6) */}
              <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start gap-4">
                <h2 className="font-poppins font-black text-3xl md:text-4xl text-white uppercase italic leading-[1.15]">
                  LAS FIESTAS TERMINAN.<br/>
                  <span className="text-[#ffc83d]">LOS RECUERDOS NO.</span>
                </h2>
                <p className="text-white/90 text-sm md:text-base font-semibold max-w-md">
                  Rescata tu Chispín y forma parte de la primera generación.
                </p>
                <button 
                  onClick={openClawMachine}
                  className="btn-primary mt-2 text-xs md:text-sm px-10 py-4 uppercase font-poppins font-black tracking-widest shadow-[0_4px_20px_rgba(255,122,0,0.4)] hover:scale-105 transition-transform"
                >
                  QUIERO RESCATAR MI CHISPÍN 🔥
                </button>
              </div>

              {/* Right Column: Circle Badge (lg:col-span-3) */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#ff7a00] to-[#ffc83d] flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(255,122,0,0.3)] border-4 border-white/25 transform hover:scale-105 transition-transform duration-300">
                  <span className="font-poppins font-black text-[11px] text-negro tracking-widest">EDICIÓN</span>
                  <span className="font-poppins font-black text-[15px] text-negro leading-none mb-1">FUNDADORES</span>
                  <span className="text-[8px] text-negro/80 font-black uppercase tracking-wider max-w-[85%] leading-tight border-t border-negro/10 pt-1 mt-1">
                    SOLO HASTA AGOTAR LAS PRIMERAS 500 UNIDADES
                  </span>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* 2. Premium Footer Bar */}
      <div className="w-full bg-[#060410] border-t border-white/5 relative z-10">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center text-center md:text-left">
            
            {/* Column 1: Envío Gratis */}
            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-chispa shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-poppins font-black text-white/95 uppercase tracking-wider text-[10px]">ENVÍO GRATIS</p>
                <p className="text-white/50 text-[10px]">a partir de 2 unidades</p>
              </div>
            </div>

            {/* Column 2: Pago Seguro */}
            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-chispa shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-poppins font-black text-white/95 uppercase tracking-wider text-[10px]">PAGO 100% SEGURO</p>
                <p className="text-white/50 text-[10px]">con tarjeta o Bizum</p>
              </div>
            </div>

            {/* Column 3: LOGO (Center) */}
            <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center py-2">
              <img 
                src="/images/logo.png" 
                alt="Chispín" 
                className="h-7 w-auto object-contain"
              />
              <span className="text-[7px] text-white/40 uppercase tracking-[0.25em] font-poppins font-bold mt-1">LA CHISPA NUNCA SE APAGA</span>
            </div>

            {/* Column 4: WhatsApp Chat */}
            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-chispa shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-poppins font-black text-white/95 uppercase tracking-wider text-[10px]">ATENCIÓN PERSONALIZADA</p>
                <a href="https://wa.me/something" target="_blank" rel="noreferrer" className="text-chispa hover:underline text-[10px]">¿Hablamos por WhatsApp?</a>
              </div>
            </div>

            {/* Column 5: Comunidad Oficial */}
            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-chispa shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-poppins font-black text-white/95 uppercase tracking-wider text-[10px]">COMUNIDAD OFICIAL</p>
                <p className="text-white/50 text-[10px]">Únete a la manada</p>
              </div>
            </div>

          </div>

          {/* Legal bottom row */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-[10px] uppercase font-bold tracking-widest font-poppins">
            <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
              <a href="/aviso-legal" className="hover:text-white/60 transition-colors">Aviso Legal</a>
              <span>|</span>
              <a href="/privacidad" className="hover:text-white/60 transition-colors">Privacidad</a>
              <span>|</span>
              <a href="/cookies" className="hover:text-white/60 transition-colors">Cookies</a>
              <span>|</span>
              <a href="/terminos" className="hover:text-white/60 transition-colors">Términos</a>
            </div>
            <span>© 2026 Chispín.</span>
          </div>

        </div>
      </div>
    </section>
  );
}
