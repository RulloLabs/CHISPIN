import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';

const faqs = [
  {
    q: '¿Cuándo se fabrica Chispín?',
    a: 'Chispín está en fase de producción. Las primeras unidades se enviarán en aproximadamente 8–10 semanas tras cerrar la campaña de reservas. Te mantendremos informado de cada paso.',
  },
  {
    q: '¿Cuándo recibiré mi Chispín?',
    a: 'Los envíos se realizarán por orden de reserva. Los Fundadores (primeras 5.000 reservas) recibirán sus unidades con prioridad. Tiempo estimado: 8–10 semanas.',
  },
  {
    q: '¿Es una edición limitada?',
    a: 'Sí. Esta primera edición es limitada a 5.000 unidades numeradas como Edición Fundadores. Una vez agotadas, no se volverán a fabricar con este número.',
  },
  {
    q: '¿Habrá más versiones de Chispín?',
    a: '¡Definitivamente! Estamos preparando ediciones especiales temáticas. Los Fundadores tendrán acceso prioritario y precios exclusivos para todas las futuras ediciones.',
  },
  {
    q: '¿Puedo personalizar mi Chispín?',
    a: 'Por ahora no ofrecemos personalización individual. Sin embargo, los Fundadores recibirán un pañuelo exclusivo con su número de edición bordado.',
  },
  {
    q: '¿Qué incluye la reserva?',
    a: 'Tu reserva incluye: 1 Chispín Edición Fundadores numerado, certificado digital de autenticidad, acceso a la comunidad privada y envío prioritario.',
  },
];

function AccordionItem({ item, isOpen, onClick }: { item: typeof faqs[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <div 
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen ? 'border-morado/50 bg-white/[0.03]' : 'border-white/[0.08] bg-white/[0.02]'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
      >
        <span className="font-poppins font-semibold text-white pr-4">{item.q}</span>
        <ChevronDown 
          className={`w-5 h-5 text-morado-light shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '200px' : '0' }}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <p className="text-white/60 leading-relaxed">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative section-padding bg-gris-oscuro">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionLabel text="Preguntas" />
            <h2 className="font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl text-white">
              Todo lo que necesitas saber
            </h2>
          </ScrollReveal>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <AccordionItem 
                item={faq} 
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
