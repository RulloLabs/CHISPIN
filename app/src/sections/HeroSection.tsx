import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Users } from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';
import CountUp from 'react-countup';

export function HeroSection() {
  const { openClawMachine, reservationCount } = useReservation();
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Badge bounce in
    tl.fromTo(badgeRef.current, 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
    
    // Headline character reveal
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.char');
      tl.fromTo(chars,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.04, stagger: 0.02, ease: 'power3.out' },
        '-=0.2'
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
    
    // Counter fade
    tl.fromTo(counterRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.5'
    );
  }, []);

  const scrollToOrigen = () => {
    document.querySelector('#origen')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Split headline into characters
  const headlineText = 'Las fiestas cambian. Las amistades permanecen.';
  const headlineChars = headlineText.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ opacity: 0 }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-purple opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-negro" />
      
      {/* Glow behind Chispín */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.4) 0%, transparent 70%)' }} />

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          
          {/* Left: Text */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-gold mb-6"
              style={{ opacity: 0 }}>
              <span className="text-negro font-inter font-bold text-xs uppercase tracking-wider">
                Edición Fundadores
              </span>
            </div>
            
            {/* Headline */}
            <h1 
              ref={headlineRef}
              className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-6"
            >
              {headlineChars}
            </h1>
            
            {/* Subheadline */}
            <p 
              ref={subRef}
              className="text-lg md:text-xl text-white/70 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              style={{ opacity: 0 }}
            >
              Chispín guarda todas esas historias que nacen en una peña, una verbena o una noche de verano.
            </p>
            
            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" style={{ opacity: 0 }}>
              <button onClick={openClawMachine} className="btn-primary text-base">
                RESERVA TU CHISPÍN
              </button>
              <button onClick={scrollToOrigen} className="btn-secondary flex items-center justify-center gap-2">
                DESCUBRE SU HISTORIA
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            {/* Counter */}
            <div ref={counterRef} className="mt-8 inline-flex items-center gap-2 glass rounded-full px-4 py-2"
              style={{ opacity: 0 }}>
              <Users className="w-4 h-4 text-chispa" />
              <span className="text-white/60 text-sm">
                <CountUp end={reservationCount} duration={2} separator="." /> personas ya han reservado
              </span>
            </div>
          </div>
          
          {/* Right: Chispín Image */}
          <div ref={imageRef} className="lg:col-span-2 relative flex justify-center lg:justify-end" style={{ opacity: 0 }}>
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] rounded-full opacity-40"
                  style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.5) 0%, rgba(107,47,184,0.3) 50%, transparent 70%)' }} />
              </div>
              
              {/* Image */}
              <img 
                src="/images/chispin-hero.png" 
                alt="Chispín - El ternero de peluche con llama en la cola"
                className="relative w-72 h-72 md:w-96 md:h-96 object-contain animate-float drop-shadow-2xl"
              />
              
              {/* Spark decoration */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-chispa/30 animate-ping" />
              <div className="absolute bottom-10 -left-6 w-4 h-4 rounded-full bg-fuego/50 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
