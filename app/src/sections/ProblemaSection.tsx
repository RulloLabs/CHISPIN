import { Clock, Heart, Flame } from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';

const cards = [
  {
    icon: Clock,
    title: 'Las pe├▒as cambian',
    text: 'Los grupos de siempre se transforman, pero el esp├¡ritu permanece.',
    color: 'text-fuego',
  },
  {
    icon: Heart,
    title: 'Las generaciones pasan',
    text: 'Las historias de nuestros padres merecen seguir vivas.',
    color: 'text-rosa',
  },
  {
    icon: Flame,
    title: 'La chispa permanece',
    text: 'Chisp├¡n guarda ese recuerdo para siempre.',
    color: 'text-chispa',
  },
];

export function ProblemaSection() {
  return (
    <section className="relative section-padding bg-gradient-to-b from-negro to-gris-oscuro">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal>
            <SectionLabel text="El Porqu├®" />
            <h2 className="font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Algunas tradiciones se apagan
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Las pe├▒as cambian. Las generaciones pasan. Los pueblos crecen de otra forma. Pero algunos recuerdos merecen quedarse para siempre. Chisp├¡n nace para representar esos momentos que no queremos que se pierdan.
            </p>
          </ScrollReveal>
        </div>
        
        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.2}>
              <div className="glass rounded-3xl p-8 text-center hover:border-morado/50 hover:-translate-y-1 transition-all duration-400 group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-morado/20 to-morado/5 mb-6 group-hover:scale-110 transition-transform">
                  <card.icon className={`w-8 h-8 ${card.color}`} />
                </div>
                <h3 className="font-poppins font-bold text-xl text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {card.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
