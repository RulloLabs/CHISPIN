import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck, Truck, Lock } from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';

export function HeroSection() {
  const { openClawMachine } = useReservation();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Headline character reveal
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.char');
      tl.fromTo(chars,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.04, stagger: 0.02, ease: 'power3.out' }
      );
    }
    
    // Subheadline fade
    tl.fromTo(subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );
    
    // CTAs fade up
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );
    
    // Image slide in
    tl.fromTo(imageRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

    // Badge pop in
    tl.fromTo(badgeRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.5'
    );
    
    // Features fade
    tl.fromTo(featuresRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.5'
    );
  }, []);

  const scrollToOrigen = () => {
    document.querySelector('#origen')?.scrollIntoView({ behavior: 'smooth' });
  };

  const headlineLines = [
    "LAS FIESTAS",
    "CAMBIAN.",
    "LAS AMISTADES",
    "PERMANECEN."
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Image (Fireworks Night Town Scene) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
        style={{ backgroundImage: 'url("/images/ChatGPT Image 11 jun 2026, 22_27_08.png")' }}
      />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-negro/40 via-negro/70 to-negro" />
      <div className="absolute inset-0 bg-gradient-to-r from-negro via-negro/50 to-transparent" />

      <div className="container-custom relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text */}
          <div className="text-center lg:text-left flex flex-col justify-center">
            
            {/* Headline */}
            <h1 
              ref={headlineRef}
              className="font-poppins font-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6 italic uppercase"
            >
              <div className="text-white">
                {headlineLines[0].split('').map((c, i) => <span key={i} className="char inline-block">{c === ' ' ? '\u00A0' : c}</span>)}
              </div>
              <div className="text-white">
                {headlineLines[1].split('').map((c, i) => <span key={i} className="char inline-block">{c === ' ' ? '\u00A0' : c}</span>)}
              </div>
              <div className="text-gradient-gold">
                {headlineLines[2].split('').map((c, i) => <span key={i} className="char inline-block">{c === ' ' ? '\u00A0' : c}</span>)}
              </div>
              <div className="text-gradient-gold">
                {headlineLines[3].split('').map((c, i) => <span key={i} className="char inline-block">{c === ' ' ? '\u00A0' : c}</span>)}
              </div>
            </h1>
            
            {/* Subheadline */}
            <p 
              ref={subRef}
              className="text-lg md:text-xl text-white/90 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-medium"
              style={{ opacity: 0 }}
            >
              Chispín guarda todas esas historias que nacen en una peña, una verbena o una noche de verano.
            </p>
            
            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12" style={{ opacity: 0 }}>
              <button onClick={openClawMachine} className="btn-primary text-base flex items-center justify-center gap-2">
                RESERVA TU CHISPÍN
                <span className="text-xl">🔥</span>
              </button>
              <button onClick={scrollToOrigen} className="btn-secondary flex items-center justify-center gap-2">
                DESCUBRE SU HISTORIA
              </button>
            </div>
            
            {/* Features (Trust Badges) */}
            <div ref={featuresRef} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-left border-t border-white/10 pt-8" style={{ opacity: 0 }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-chispa" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase text-white">EDICIÓN FUNDADORES</p>
                  <p className="text-xs text-white/60">Solo las primeras reservas<br/>recibirán número y certificado.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-chispa" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase text-white">ENVÍO GARANTIZADO</p>
                  <p className="text-xs text-white/60">Te avisaremos cuando tu<br/>Chispín esté en camino.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-chispa" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase text-white">PAGO SEGURO</p>
                  <p className="text-xs text-white/60">Solo se cargará el coste<br/>cuando comience el envío.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Chispín Character Image */}
          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div ref={imageRef} className="relative z-10" style={{ opacity: 0 }}>
              <img 
                src="/images/chispin-hero.png" 
                alt="Peluche Chispín" 
                className="w-full max-w-[480px] h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
              
              {/* Purple Badge */}
              <div 
                ref={badgeRef}
                className="absolute -right-4 md:-right-8 top-1/4 w-32 h-32 rounded-full gradient-purple flex flex-col items-center justify-center text-center shadow-xl border-4 border-negro/50 backdrop-blur-sm z-20"
                style={{ opacity: 0 }}
              >
                <span className="font-poppins font-black text-4xl text-white leading-none">18</span>
                <span className="font-poppins font-bold text-sm text-white/90">CM</span>
                <span className="text-[9px] text-white/80 uppercase font-bold tracking-widest mt-1 max-w-[80%]">DE PURA TERNURA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

