import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const photos = [
  '/images/social-1.jpg',
  '/images/social-2.jpg',
  '/images/social-3.jpg',
  '/images/social-4.jpg',
];

export function SocialSection() {
  return (
    <section id="social" className="relative section-padding overflow-hidden"
      style={{ background: '#080012' }}>

      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="section-label">La Chispa Nunca Se Apaga</div>
          <h2 className="font-bangers text-4xl md:text-5xl lg:text-6xl text-white mb-2 leading-tight">
            COMPARTE TU CHISPÍN<br />CON EL MUNDO
          </h2>
          <p className="text-[#FF6B00] font-nunito font-bold text-lg md:text-xl mb-10">
            #LaChispaNuncaSeApaga
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* LEFT: Photo Grid/Carousel */}
          <ScrollReveal className="w-full lg:w-2/3">
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 shrink-0">
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                {photos.map((src, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden group">
                    <img
                      src={src}
                      alt="Chispín en el mundo"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>

              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 shrink-0">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </ScrollReveal>

          {/* RIGHT: Floating Chispín + CTA */}
          <ScrollReveal delay={0.15} className="w-full lg:w-1/3 flex flex-col items-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
              {/* Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(123,47,190,0.3) 0%, transparent 70%)' }} />
              </div>
              <img
                src="/images/chispin-box.png"
                alt="Chispín en su caja"
                className="relative w-full h-full object-contain animate-float drop-shadow-2xl"
              />
            </div>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="btn-secondary text-xs px-8 py-4 flex items-center gap-2 w-full max-w-[280px]">
              <Instagram className="w-4 h-4" />
              VER MÁS EN INSTAGRAM
            </a>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
