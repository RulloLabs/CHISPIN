import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const faqs = [
  {
    q: '¿CUÁNDO SE FABRICA?',
    a: 'Chispín está en fase de producción. Las primeras unidades se enviarán en aproximadamente 8–10 semanas tras cerrar la campaña de reservas. Te mantendremos informado de cada paso.',
  },
  {
    q: '¿CUÁNDO RECIBIRÉ MI CHISPÍN?',
    a: 'Los envíos se realizarán por orden de reserva. Los Fundadores (primeras 500 reservas) recibirán sus unidades con prioridad. Tiempo estimado: 8–10 semanas.',
  },
  {
    q: '¿ES UNA EDICIÓN LIMITADA?',
    a: 'Sí. Esta primera edición es limitada a 500 unidades numeradas como Edición Fundadores. Una vez agotadas, no se volverán a fabricar con este número.',
  },
  {
    q: '¿HABRÁ MÁS VERSIONES?',
    a: '¡Definitivamente! Estamos preparando ediciones especiales temáticas. Los Fundadores tendrán acceso prioritario y precios exclusivos para todas las futuras ediciones.',
  },
  {
    q: '¿PUEDO PERSONALIZARLO PARA MI PEÑA?',
    a: 'Por ahora no ofrecemos personalización individual. Sin embargo, los Fundadores recibirán un pañuelo exclusivo con su número de edición bordado.',
  },
  {
    q: '¿CÓMO FUNCIONA LA RESERVA?',
    a: 'La reserva es muy sencilla: haces clic en "Reserva tu Chispín", juegas en la máquina arcade para rescatarlo, descargas tu certificado de Edición Fundadores y finalizas la reserva a través de Stripe de manera segura.',
  },
];

function AccordionItem({ item, isOpen, onClick }: { item: typeof faqs[0]; isOpen: boolean; onClick: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div 
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen ? 'border-[#6b2fb8]/30 bg-white shadow-sm' : 'border-[#3d2c5e]/8 bg-[#3d2c5e]/3'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left text-[#3d2c5e]"
      >
        <span className="font-poppins font-black text-xs md:text-sm tracking-wide">{item.q}</span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-[#ff7a00] text-white' : 'bg-[#3d2c5e]/10 text-[#3d2c5e]/60'}`}>
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? `${height}px` : '0' }}
      >
        <div ref={contentRef} className="px-5 pb-5 text-xs md:text-sm text-[#3d2c5e]/70 leading-relaxed font-medium">
          {item.a}
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Split FAQs into two columns of 3 items
  const col1 = faqs.slice(0, 3);
  const col2 = faqs.slice(3, 6);

  return (
    <section id="faq" className="relative section-padding bg-[#f7f5f0] py-20 overflow-hidden border-t border-black/5">
      <div className="container-custom relative z-10">
        
        {/* Title */}
        <ScrollReveal>
          <div className="mb-12 text-center lg:text-left">
            <h2 className="font-poppins font-black text-4xl md:text-5xl text-[#3d2c5e] uppercase italic mb-2 tracking-wide">
              PREGUNTAS FRECUENTES
            </h2>
          </div>
        </ScrollReveal>

        {/* 3-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1 (span 5) */}
          <div className="lg:col-span-5 space-y-4">
            {col1.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <AccordionItem 
                  item={faq} 
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Column 2 (span 5) */}
          <div className="lg:col-span-5 space-y-4">
            {col2.map((faq, i) => {
              const idx = i + 3;
              return (
                <ScrollReveal key={idx} delay={i * 0.1 + 0.15}>
                  <AccordionItem 
                    item={faq} 
                    isOpen={openIndex === idx}
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  />
                </ScrollReveal>
              );
            })}
          </div>

          {/* Column 3 (span 2): Image peaking */}
          <div className="lg:col-span-2 flex justify-center items-center lg:pt-10">
            <ScrollReveal delay={0.4} className="relative w-full max-w-[150px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff7a00]/5 to-purple-600/5 rounded-full blur-2xl opacity-50" />
              <img 
                src="/images/chispin-box.png" 
                alt="Chispín asomando"
                className="relative z-10 w-full h-auto drop-shadow-lg"
              />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
