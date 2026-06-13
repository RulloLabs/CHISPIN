import { useState } from 'react';
import { Check } from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useMouseTilt } from '@/hooks/useMouseTilt';
import { useReservation } from '@/context/ReservationContext';

const views = [
  { id: 'front', label: 'Frontal', img: '/images/chispin-front.png' },
  { id: 'back', label: 'Trasera', img: '/images/chispin-back.png' },
  { id: 'side', label: 'Lateral', img: '/images/chispin-side.png' },
  { id: 'detail', label: 'Detalle', img: '/images/chispin-detail.png' },
];

const features = [
  '18 cm de ternura',
  'Ultra suave al tacto',
  'Bordados premium',
  'Cola con llama característica',
  'Pañuelo icónico morado',
  'Edición Fundadores numerada',
];

export function ProductoSection() {
  const [activeView, setActiveView] = useState('front');
  const { ref, tilt } = useMouseTilt(10);
  const { openClawMachine } = useReservation();
  
  const currentImg = views.find(v => v.id === activeView)?.img || views[0].img;

  return (
    <section id="producto" className="relative section-padding bg-negro">
      {/* Purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(107,47,184,0.5) 0%, transparent 70%)' }} />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: 3D Product Showcase */}
          <ScrollReveal>
            <div className="relative">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full gradient-gold text-negro font-inter font-bold text-xs uppercase tracking-wider">
                  Edición Limitada
                </span>
              </div>
              
              {/* Main image with 3D tilt */}
              <div 
                ref={ref}
                className="relative flex justify-center items-center h-[350px] md:h-[450px]"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="transition-transform duration-100 ease-out"
                  style={{
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img 
                    src={currentImg}
                    alt="Chispín desde diferentes ángulos"
                    className="w-72 h-72 md:w-96 md:h-96 object-contain drop-shadow-2xl transition-opacity duration-300"
                  />
                </div>
                
                {/* Glow behind */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <div className="w-[300px] h-[300px] rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.4) 0%, transparent 60%)' }} />
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex justify-center gap-3 mt-6">
                {views.map(view => (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      activeView === view.id 
                        ? 'border-chispa shadow-glow-chispa' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={view.img} alt={view.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
          
          {/* Right: Features */}
          <div>
            <ScrollReveal>
              <SectionLabel text="El Peluche" />
              <h2 className="font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                Diseñado para durar toda la vida
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <ul className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full gradient-fire flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-negro" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-3xl font-poppins font-black text-gradient-fire">
                  39€
                </span>
                <button onClick={openClawMachine} className="btn-primary">
                  QUIERO MI CHISPÍN
                </button>
              </div>
              <p className="text-white/40 text-sm mt-3">
                Envío incluido en toda España
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
