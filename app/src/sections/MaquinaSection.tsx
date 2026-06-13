import { Gamepad2 } from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useReservation } from '@/context/ReservationContext';

export function MaquinaSection() {
  const { openClawMachine } = useReservation();

  return (
    <section className="relative section-padding bg-negro overflow-hidden">
      {/* Arcade glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse, rgba(107,47,184,0.5) 0%, transparent 70%)' }} />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <div>
            <ScrollReveal>
              <SectionLabel text="La Experiencia" />
              <h2 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">
                Rescata tu Chispín
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                Convierte tu reserva en un juego. Atrapa tu Chispín en nuestra máquina arcade y conviértete en parte de la leyenda.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Un gancho, una oportunidad, un premio eterno. Así es como funcionan las mejores historias... y así es como reservarás tu Chispín.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.15}>
              <button 
                onClick={openClawMachine}
                className="btn-primary text-lg px-12 py-5 flex items-center gap-3 animate-pulse-glow"
              >
                <Gamepad2 className="w-5 h-5" />
                JUGAR Y RESERVAR
              </button>
            </ScrollReveal>
          </div>
          
          {/* Right: Machine Preview */}
          <ScrollReveal>
            <div className="relative">
              <div 
                className="rounded-3xl overflow-hidden border-4 animate-arcade-light cursor-pointer group"
                onClick={openClawMachine}
              >
                <img 
                  src="/images/claw-machine.jpg" 
                  alt="Máquina arcade llena de Chispines"
                  className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-transparent to-transparent" />
                
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="glass rounded-full px-6 py-3 flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-chispa" />
                    <span className="text-white font-bold">JUGAR AHORA</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative sparks */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-chispa rounded-full opacity-60 animate-pulse" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-fuego rounded-full opacity-40 animate-ping" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
