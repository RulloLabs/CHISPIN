import { useRef, useEffect } from 'react';
import { useReservation } from '@/context/ReservationContext';
import { ScrollReveal } from '@/components/ScrollReveal';

export function FinalCTASection() {
  const { openClawMachine } = useReservation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fireworks animation
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

      // Create new firework occasionally
      frame++;
      if (frame % 120 === 0) createFirework();

      fireworks.forEach(fw => {
        fw.particles.forEach(p => {
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.vy += 0.02; // gravity
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

      // Remove dead fireworks
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-sunset">
      {/* Fireworks canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      <div className="container-custom relative z-10 text-center py-20">
        <ScrollReveal>
          <h2 className="font-poppins font-black text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight">
            Las fiestas terminan.<br />
            <span className="text-gradient-fire">Los recuerdos no.</span>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.15}>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
            Rescata tu Chispín y forma parte de la primera generación que mantiene viva la chispa.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.25}>
          <button 
            onClick={openClawMachine}
            className="btn-primary text-xl px-16 py-6 animate-pulse-glow"
          >
            QUIERO RESCATAR MI CHISPÍN
          </button>
        </ScrollReveal>
        
        <ScrollReveal delay={0.35}>
          <div className="mt-12 flex items-center justify-center gap-2 text-white/40 text-sm">
            <span>© 2024 Chispín. La Chispa Nunca Se Apaga.</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
