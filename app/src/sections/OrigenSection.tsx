import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';

export function OrigenSection() {
  return (
    <section id="origen" className="relative section-padding bg-negro">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <ScrollReveal className="order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden">
              <img 
                src="/images/village-scene.jpg" 
                alt="Pueblo de montaña español de fiesta"
                className="w-full h-[300px] md:h-[400px] object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-negro/60 to-transparent" />
              
              {/* Quote overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-16 gradient-fire rounded-full shrink-0" />
                  <p className="font-poppins font-bold text-xl md:text-2xl text-chispa italic">
                    "La chispa nunca se apaga."
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Text */}
          <div className="order-1 lg:order-2">
            <ScrollReveal>
              <SectionLabel text="Su Historia" />
              <h2 className="font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                ¿Quién es Chispín?
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.15}>
              <p className="text-lg text-white/75 leading-relaxed mb-4">
                Chispín nació de una pequeña chispa perdida durante una noche de fiesta en un pueblo de montaña. Mientras las luces de la verbena parpadeaban y la risa de los amigos llenaba la plaza, esa chispa cobró vida.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.25}>
              <p className="text-base text-white/60 leading-relaxed">
                Desde entonces recorre pueblos y ciudades manteniendo viva la alegría y las tradiciones que nos unen. No pertenece a ninguna peña concreta... pertenece a todos los que creen en la magia de las fiestas.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
