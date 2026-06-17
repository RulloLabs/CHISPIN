import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useReservation } from '@/context/ReservationContext';

const views = [
  { label: 'Frontal', img: '/images/chispin-front.png' },
  { label: 'Trasera', img: '/images/chispin-back.png' },
  { label: 'Lateral', img: '/images/chispin-side.png' },
];

const features = [
  '18 cm de ternura',
  'Peluche ultra suave',
  'Bordados premium',
  'Cola de fuego caracter├¡stica',
  'Pa├▒uelo ic├│nico morado',
  'Edici├│n Fundadores numerada',
];

export function ProductoSection() {
  const [idx, setIdx] = useState(0);
  const { openClawMachine } = useReservation();

  const prev = () => setIdx(i => (i - 1 + views.length) % views.length);
  const next = () => setIdx(i => (i + 1) % views.length);

  return (
    <section id="producto" className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0025 0%, #080012 100%)' }}>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(74,14,143,0.2) 0%, transparent 70%)' }} />

      <div className="container-custom relative z-10">
        <ScrollReveal className="text-center mb-12">
          <div className="section-label">El Peluche</div>
          <h2 className="font-bangers text-4xl md:text-5xl lg:text-6xl text-white">
            Cada detalle cuenta una historia
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT: Carousel */}
          <ScrollReveal>
            <div className="relative flex flex-col items-center">
              {/* Main image */}
              <div className="relative w-full flex items-center justify-center h-[320px] md:h-[420px]">
                {/* Glow behind */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.25) 0%, transparent 65%)' }} />
                </div>

                <img
                  key={idx}
                  src={views[idx].img}
                  alt={`Chisp├¡n ÔÇö ${views[idx].label}`}
                  className="relative h-full object-contain drop-shadow-2xl transition-all duration-300 animate-float"
                />
              </div>

              {/* Nav arrows */}
              <div className="flex items-center gap-6 mt-4">
                <button onClick={prev}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {views.map((_, i) => (
                    <button key={i} onClick={() => setIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === idx ? 'bg-[#FFB800] w-6' : 'bg-white/30'
                      }`} />
                  ))}
                </div>

                <button onClick={next}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Features */}
          <ScrollReveal delay={0.15}>
            <ul className="space-y-3 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg,#FFB800,#FF6B00)' }}>
                    <Check className="w-3 h-3 text-[#1A0040]" strokeWidth={3} />
                  </div>
                  <span className="text-white/80 font-nunito text-sm md:text-base">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 mb-4">
              <span className="font-bangers text-5xl" style={{
                background: 'linear-gradient(135deg,#FFB800,#FF6B00)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>39Ôé¼</span>
              <span className="text-white/40 font-nunito text-sm">Env├¡o incluido en Espa├▒a</span>
            </div>

            <button onClick={openClawMachine} className="btn-primary text-sm px-8 py-3.5">
              VER TODOS LOS ├üNGULOS
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
