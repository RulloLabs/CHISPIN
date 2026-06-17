import { Heart, Music, Smile, Users, Star } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const values = [
  { icon: Heart, label: 'Amistad' },
  { icon: Star, label: 'Tradici├│n' },
  { icon: Smile, label: 'Diversi├│n' },
  { icon: Users, label: 'Uni├│n' },
  { icon: Music, label: 'Alegr├¡a' },
];

export function OrigenSection() {
  return (
    <section id="origen" className="relative section-padding" style={{ background: '#0D0025' }}>
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(74,14,143,0.15) 0%, transparent 60%)' }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT: Text */}
          <ScrollReveal className="order-1">
            <div className="section-label">Su Historia</div>
            <h2 className="font-bangers text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              ┬┐QUI├ëN ES<br />
              <span style={{
                background: 'linear-gradient(135deg,#FFB800,#FF6B00)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                CHISP├ìN?
              </span>
            </h2>

            <p className="text-white/70 font-nunito text-base md:text-lg leading-relaxed mb-4">
              Chisp├¡n naci├│ de una peque├▒a chispa perdida durante una noche de fiesta en un pueblo de monta├▒a.
            </p>
            <p className="text-white/55 font-nunito text-sm md:text-base leading-relaxed mb-10">
              Desde entonces, recorre pueblos y ciudades manteniendo viva la alegr├¡a, las tradiciones y las amistades que nos unen.
            </p>

            {/* Value icons */}
            <div className="flex gap-6 flex-wrap">
              {values.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 group cursor-default">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(74,14,143,0.4)] group-hover:scale-110">
                    <Icon className="w-5 h-5 text-[#FFB800]" />
                  </div>
                  <span className="text-white/50 font-nunito font-bold text-[10px] uppercase tracking-widest group-hover:text-white/80 transition-colors">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* RIGHT: Image */}
          <ScrollReveal delay={0.2} className="order-2">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="/images/village-scene.png"
                alt="Pueblo de fiestas ÔÇö donde naci├│ Chisp├¡n"
                className="w-full h-[320px] md:h-[420px] object-cover rounded-3xl"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 rounded-3xl"
                style={{ background: 'linear-gradient(to top, rgba(8,0,18,0.7) 0%, transparent 60%)' }} />
              {/* Quote */}
              <div className="absolute bottom-6 left-6 right-6 flex items-start gap-3">
                <div className="w-1 h-14 rounded-full shrink-0"
                  style={{ background: 'linear-gradient(to bottom, #FFB800, #FF6B00)' }} />
                <p className="font-bangers text-xl md:text-2xl text-[#FFB800] leading-tight">
                  "La chispa nunca se apaga."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
