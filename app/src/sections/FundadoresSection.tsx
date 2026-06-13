import { Award, Star, Users } from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useReservation } from '@/context/ReservationContext';
import CountUp from 'react-countup';

const benefits = [
  {
    icon: Award,
    title: 'Certificado Digital',
    text: 'Descarga tu certificado exclusivo de Fundador con número único.',
  },
  {
    icon: Star,
    title: 'Acceso VIP',
    text: 'Serás el primero en conocer nuevas ediciones y colaboraciones.',
  },
  {
    icon: Users,
    title: 'Comunidad Privada',
    text: 'Únete a la comunidad exclusiva de Fundadores de Chispín.',
  },
];

export function FundadoresSection() {
  const { reservationCount, openClawMachine } = useReservation();
  const progress = Math.min((reservationCount / 5000) * 100, 100);
  const remaining = Math.max(5000 - reservationCount, 0);

  return (
    <section id="fundadores" className="relative section-padding gradient-purple">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal>
            <SectionLabel text="Primera Edición" color="yellow" />
            <h2 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Sé Fundador de la Manada
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Solo las primeras 5.000 reservas recibirán el estatus de Fundador con beneficios exclusivos para siempre.
            </p>
          </ScrollReveal>
        </div>
        
        {/* Founder Card */}
        <ScrollReveal>
          <div className="relative max-w-md mx-auto mb-16">
            <div className="glass rounded-3xl p-8 md:p-10 border-2 border-chispa/30 text-center"
              style={{ boxShadow: '0 0 60px rgba(255, 200, 61, 0.15)' }}>
              
              <div className="text-chispa font-inter font-semibold text-sm uppercase tracking-wider mb-2">
                Edición Fundadores
              </div>
              <div className="text-gradient-gold font-poppins font-black text-6xl md:text-7xl mb-2">
                Nº <CountUp end={1} duration={1} />XXX
              </div>
              <div className="text-white/60 text-sm mb-6">
                Tu número único de fundador
              </div>
              
              <img 
                src="/images/certificate.jpg" 
                alt="Certificado de Fundador"
                className="w-full h-48 object-cover rounded-xl mb-6 opacity-80"
              />
              
              <div className="space-y-2 text-sm text-white/70">
                <p>Certificado digital numerado</p>
                <p>Número de fundador para siempre</p>
                <p>Acceso prioritario a futuras ediciones</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        
        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, i) => (
            <ScrollReveal key={benefit.title} delay={i * 0.15}>
              <div className="glass rounded-2xl p-6 text-center hover:border-morado/40 transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-chispa/10 mb-4">
                  <benefit.icon className="w-6 h-6 text-chispa" />
                </div>
                <h3 className="font-poppins font-bold text-lg text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        {/* Progress Bar */}
        <ScrollReveal>
          <div className="max-w-xl mx-auto text-center">
            <div className="glass rounded-2xl p-6">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white/60">
                  <CountUp end={reservationCount} duration={2} separator="." /> reservas
                </span>
                <span className="text-chispa font-bold">5.000 máx.</span>
              </div>
              
              <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full gradient-fire rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <p className="text-fuego font-inter font-bold">
                Solo quedan {remaining.toLocaleString()} plazas de Fundador
              </p>
            </div>
            
            <button onClick={openClawMachine} className="btn-primary mt-8">
              RESERVAR COMO FUNDADOR
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
