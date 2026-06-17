import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const faqs = [
  { q: '┬┐CU├üNDO SE FABRICA?', a: 'Comenzaremos la producci├│n en masa una vez alcancemos el objetivo de reservas para la Edici├│n Fundadores.' },
  { q: '┬┐HABR├ü M├üS VERSIONES?', a: 'S├¡, pero la Edici├│n Fundadores con este certificado y numeraci├│n es ├║nica e irrepetible.' },
  { q: '┬┐CU├üNDO RECIBIR├ë MI CHISP├ìN?', a: 'Las entregas est├ín previstas para principios del pr├│ximo a├▒o. Te mantendremos informado de cada paso de la fabricaci├│n.' },
  { q: '┬┐PUEDO PERSONALIZARLO PARA MI PE├æA?', a: 'Actualmente no, pero estamos trabajando en accesorios como pa├▒uelos de diferentes colores para el futuro.' },
  { q: '┬┐ES UNA EDICI├ôN LIMITADA?', a: 'S├¡, la Edici├│n Fundadores est├í estrictamente limitada a las primeras 10.000 unidades.' },
  { q: '┬┐C├ôMO FUNCIONA LA RESERVA?', a: 'Al hacer tu reserva aseguras tu unidad. Solo te cobraremos cuando la producci├│n est├® lista para enviarse.' },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative section-padding" style={{ background: '#F5F5F7' }}>
      <div className="container-custom relative z-10">
        
        <ScrollReveal>
          <div className="section-label" style={{ background: 'rgba(255,184,0,0.15)', borderColor: '#FFB800', color: '#FF6B00' }}>
            Dudas
          </div>
          <h2 className="font-bangers text-4xl md:text-5xl lg:text-6xl text-[#1A0040] mb-12">
            PREGUNTAS FRECUENTES
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: Accordion */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={i} 
                    className="bg-white rounded-2xl overflow-hidden transition-all duration-300"
                    style={{ 
                      boxShadow: isOpen ? '0 10px 30px rgba(74,14,143,0.08)' : '0 2px 10px rgba(0,0,0,0.02)',
                      border: isOpen ? '2px solid rgba(74,14,143,0.1)' : '2px solid transparent'
                    }}>
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                    >
                      <span className={`font-nunito font-bold text-sm md:text-base pr-4 ${isOpen ? 'text-[#FF6B00]' : 'text-[#1A0040]'}`}>
                        {faq.q}
                      </span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#FF6B00]' : 'bg-gray-100'}`}>
                        {isOpen 
                          ? <Minus className="w-3.5 h-3.5 text-white" /> 
                          : <Plus className="w-3.5 h-3.5 text-gray-500" />
                        }
                      </div>
                    </button>
                    
                    <div 
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: isOpen ? '200px' : '0' }}
                    >
                      <div className="px-6 pb-5 text-gray-600 font-nunito text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* RIGHT: Image */}
          <ScrollReveal delay={0.2} className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Decorative elements behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.15) 0%, transparent 70%)' }} />
              
              <img 
                src="/images/chispin-box.png" 
                alt="Chisp├¡n en su caja"
                className="relative w-[400px] object-contain animate-float drop-shadow-xl"
              />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
