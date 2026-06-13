import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Instagram } from 'lucide-react';

const posts = [
  { user: 'maria_fiestas', caption: 'Mi Chispín ya tiene su lugar en la peña! 🔥', color: 'from-morado/30 to-fuego/20' },
  { user: 'juanito_verbena', caption: 'La tradición nunca muere #LaChispaNuncaSeApaga', color: 'from-fuego/20 to-chispa/20' },
  { user: 'las_tradiciones', caption: 'Desde Teruel con amor. Chispín es de todos.', color: 'from-chispa/20 to-morado/30' },
  { user: 'peña_los_amigos', caption: 'Nuestro mascota oficial de las fiestas', color: 'from-rosa/20 to-morado/20' },
  { user: 'pueblo_vivo', caption: 'Las generaciones cambian, la chispa sigue', color: 'from-morado/20 to-rosa/20' },
  { user: 'festejos2024', caption: 'El mejor recuerdo de un verano inolvidable', color: 'from-fuego/30 to-chispa/10' },
];

export function SocialSection() {
  return (
    <section className="relative section-padding bg-negro">
      <div className="container-custom">
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionLabel text="Comunidad" />
            <h2 className="font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              #LaChispaNuncaSeApaga
            </h2>
            <p className="text-white/60 max-w-md mx-auto">
              Así viven la experiencia los miembros de la manada
            </p>
          </ScrollReveal>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br aspect-square flex flex-col justify-end p-4 cursor-pointer hover:-translate-y-1 transition-all duration-300">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${post.color}`} />
                
                {/* Chispin image centered */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <img 
                    src="/images/chispin-front.png" 
                    alt="" 
                    className="w-24 h-24 object-contain"
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Instagram className="w-4 h-4 text-white/60" />
                    <span className="text-white/80 text-xs font-medium">@{post.user}</span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
