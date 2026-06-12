import { ScrollReveal } from '@/components/ScrollReveal';
import { Heart, Home, Music, Users, Star } from 'lucide-react';

export function OrigenSection() {
  return (
    <section id="origen" className="relative section-padding bg-gradient-to-b from-negro to-[#1a1025]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <ScrollReveal>
              <h2 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 uppercase italic">
                <span className="text-gradient-purple">¿QUIÉN ES</span> <span className="text-white">CHISPÍN?</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.15}>
              <p className="text-lg text-white/90 leading-relaxed mb-6 font-medium">
                Chispín nació de una pequeña chispa perdida durante una noche de fiesta en un pueblo de montaña.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.25}>
              <p className="text-base text-white/80 leading-relaxed mb-12">
                Desde entonces, recorre pueblos y ciudades manteniendo viva la alegría, las tradiciones y las amistades que nos unen.
              </p>
            </ScrollReveal>

            {/* Icons row */}
            <ScrollReveal delay={0.35}>
              <div className="grid grid-cols-5 gap-4">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center mb-3 group-hover:border-chispa group-hover:bg-chispa/10 transition-colors">
                    <Heart className="w-6 h-6 text-white group-hover:text-chispa transition-colors" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">AMISTAD</span>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center mb-3 group-hover:border-chispa group-hover:bg-chispa/10 transition-colors">
                    <Home className="w-6 h-6 text-white group-hover:text-chispa transition-colors" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">TRADICIÓN</span>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center mb-3 group-hover:border-chispa group-hover:bg-chispa/10 transition-colors">
                    <Music className="w-6 h-6 text-white group-hover:text-chispa transition-colors" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">DIVERSIÓN</span>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center mb-3 group-hover:border-chispa group-hover:bg-chispa/10 transition-colors">
                    <Users className="w-6 h-6 text-white group-hover:text-chispa transition-colors" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">UNIÓN</span>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center mb-3 group-hover:border-chispa group-hover:bg-chispa/10 transition-colors">
                    <Star className="w-6 h-6 text-white group-hover:text-chispa transition-colors" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">ALEGRÍA</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Image */}
          <ScrollReveal className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden flex justify-center items-center">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-chispa/20 to-purple-600/20 rounded-full blur-3xl opacity-50" />
              <img 
                src="/images/village-scene.png" 
                alt="Chispín de espaldas mirando los fuegos artificiales"
                className="relative z-10 w-full max-w-[500px] h-auto rounded-3xl drop-shadow-[0_0_35px_rgba(255,122,0,0.25)] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
