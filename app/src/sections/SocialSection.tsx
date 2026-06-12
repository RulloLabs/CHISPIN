import { ScrollReveal } from '@/components/ScrollReveal';
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

const instagramPhotos = [
  { id: 1, path: '/images/ChatGPT Image 10 jun 2026, 13_29_24.png' },
  { id: 2, path: '/images/ChatGPT Image 10 jun 2026, 13_29_27.png' },
  { id: 3, path: '/images/ChatGPT Image 10 jun 2026, 13_29_31.png' },
  { id: 4, path: '/images/ChatGPT Image 10 jun 2026, 13_29_37.png' },
];

export function SocialSection() {
  return (
    <section className="relative section-padding bg-[#f7f5f0] py-20 border-t border-black/5">
      <div className="container-custom">
        
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12 text-center lg:text-left">
            <h2 className="font-poppins font-black text-4xl md:text-5xl text-[#3d2c5e] uppercase italic mb-2 tracking-wide">
              LA CHISPA NUNCA SE APAGA
            </h2>
            <p className="text-[#3d2c5e]/70 text-sm md:text-base font-semibold">
              Comparte tu Chispín con el mundo <span className="text-[#ff7a00]">#LaChispaNuncaSeApaga</span>
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left/Center: Photo carousel row (lg:col-span-9) */}
          <div className="lg:col-span-9 relative flex items-center">
            {/* Left navigation arrow */}
            <button 
              className="absolute -left-4 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#3d2c5e] border border-black/5 hover:scale-105 transition-transform"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Photos Grid */}
            <div className="w-full overflow-hidden px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {instagramPhotos.map((photo) => (
                  <div 
                    key={photo.id}
                    className="rounded-2xl overflow-hidden aspect-square bg-white shadow-md border border-black/5 transition-transform hover:scale-[1.02] duration-300"
                  >
                    <img 
                      src={photo.path} 
                      alt={`Chispín en Instagram ${photo.id}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right navigation arrow */}
            <button 
              className="absolute -right-4 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#3d2c5e] border border-black/5 hover:scale-105 transition-transform"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Column: Chispín in shipping box & Instagram button (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col items-center text-center">
            <div className="relative w-full max-w-[200px] mb-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff7a00]/10 to-purple-600/10 rounded-full blur-2xl opacity-50" />
              <img 
                src="/images/chispin-box.png" 
                alt="Chispín en caja"
                className="relative z-10 w-full h-auto drop-shadow-xl hover:-translate-y-1 transition-transform duration-300"
              />
            </div>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#8a3ab9] hover:bg-[#722b9c] text-white font-poppins font-black text-xs py-3.5 px-6 rounded-xl uppercase tracking-wider transition-all shadow-md active:scale-95 w-full"
            >
              <Instagram className="w-4 h-4" />
              VER MÁS EN INSTAGRAM
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
