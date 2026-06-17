import { Flame } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useReservation } from '@/context/ReservationContext';

export function FinalCTASection() {
  const { openClawMachine } = useReservation();

  return (
    <section className="relative overflow-hidden" 
      style={{ background: 'linear-gradient(135deg, #1A0040 0%, #080012 100%)' }}>
      
      {/* Top fire separator line */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #FF6B00, #FFB800, #FF6B00, transparent)' }} />

      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Image */}
          <ScrollReveal className="lg:col-span-4 hidden lg:block">
            <div className="relative flex justify-center -mb-24">
              <img 
                src="/images/chispin-hero.png" 
                alt="Chisp├¡n"
                className="w-80 h-80 object-contain animate-float drop-shadow-2xl"
              />
            </div>
          </ScrollReveal>

          {/* CENTER: Text & CTA */}
          <ScrollReveal delay={0.1} className="lg:col-span-8 text-center lg:text-left flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            <div className="flex-1">
              <h2 className="font-bangers text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-none">
                LAS FIESTAS TERMINAN.<br/>
                <span style={{ 
                  background: 'linear-gradient(135deg,#FFB800,#FF6B00)', 
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' 
                }}>
                  LOS RECUERDOS NO.
                </span>
              </h2>
              <p className="text-white/70 font-nunito text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                Rescata tu Chisp├¡n y forma parte de la primera generaci├│n.
              </p>
              
              <button onClick={openClawMachine} 
                className="btn-primary text-base px-10 py-5 w-full sm:w-auto animate-pulse-glow">
                QUIERO RESCATAR MI CHISP├ìN <Flame className="w-5 h-5 ml-2 inline-block" />
              </button>
            </div>

            {/* RIGHT: Founder Badge */}
            <div className="shrink-0 relative">
              {/* Spinning glow */}
              <div className="absolute inset-0 rounded-full animate-spin-slow opacity-50"
                style={{ 
                  background: 'conic-gradient(from 0deg, transparent, rgba(255,184,0,0.8), transparent)',
                  animation: 'spin 4s linear infinite'
                }} />
                
              <div className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center p-4 text-center border-4"
                style={{ 
                  background: 'linear-gradient(135deg, #4A0E8F, #1A0040)',
                  borderColor: '#FFB800',
                  boxShadow: '0 0 30px rgba(255,184,0,0.4)'
                }}>
                <span className="font-bangers text-[#FFB800] text-2xl tracking-wider leading-none mb-1">
                  EDICI├ôN<br/>FUNDADORES
                </span>
                <div className="w-12 h-0.5 bg-[#FF6B00] my-2" />
                <span className="text-white/60 font-nunito font-bold text-[9px] uppercase tracking-wider leading-tight">
                  SOLO HASTA<br/>AGOTAR LAS PRIMERAS<br/>10.000 UNIDADES
                </span>
              </div>
            </div>

          </ScrollReveal>

        </div>

        {/* Legal footer */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-white/40 mb-3">
            <a href="/aviso-legal" className="hover:text-white/60 transition-colors">Aviso Legal</a>
            <span className="text-white/10">┬À</span>
            <a href="/privacidad" className="hover:text-white/60 transition-colors">Privacidad</a>
            <span className="text-white/10">┬À</span>
            <a href="/cookies" className="hover:text-white/60 transition-colors">Cookies</a>
          </div>
          <p className="text-white/30 text-xs">┬® 2026 Chisp├¡n. La Chispa Nunca Se Apaga.</p>
        </div>
      </div>
    </section>
  );
}
