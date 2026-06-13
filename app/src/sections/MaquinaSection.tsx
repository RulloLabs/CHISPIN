import { useState } from 'react';
import { Gamepad2, Download, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useReservation } from '@/context/ReservationContext';

const steps = [
  'Entra en la máquina',
  'Elige tu momento',
  'Atrapa tu Chispín',
  'Recibe tu certificado',
];

export function MaquinaSection() {
  const { openClawMachine, founderNumber } = useReservation();
  const [showSuccess] = useState(false);

  const displayNumber = founderNumber ?? 247;

  return (
    <section id="experiencia" className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080012 0%, #0E0030 100%)' }}>

      {/* Purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(74,14,143,0.25) 0%, transparent 70%)' }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-center">

          {/* LEFT: Description */}
          <ScrollReveal className="lg:col-span-1">
            <div className="section-label">La Experiencia</div>
            <h2 className="font-bangers text-4xl md:text-5xl text-white mb-4 leading-tight">
              UNA EXPERIENCIA QUE NO OLVIDARÁS
            </h2>
            <p className="text-white/60 font-nunito text-sm leading-relaxed mb-6">
              No es solo una reserva. Es rescatar a tu Chispín.
            </p>

            <ol className="space-y-3 mb-8">
              {steps.map((step, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bangers text-sm"
                    style={{ background: 'linear-gradient(135deg,#4A0E8F,#7B2FBE)', color: '#FFB800' }}>
                    {i + 1}
                  </div>
                  <span className="text-white/70 font-nunito text-sm">{step}</span>
                </li>
              ))}
            </ol>

            <button onClick={openClawMachine} className="btn-secondary flex items-center gap-2 text-sm px-6 py-3">
              <Gamepad2 className="w-4 h-4" />
              VER EXPERIENCIA
            </button>
          </ScrollReveal>

          {/* CENTER: Arcade Machine */}
          <ScrollReveal delay={0.1} className="lg:col-span-1">
            <div className="relative flex flex-col items-center">
              {/* Machine box */}
              <div className="relative w-full max-w-sm mx-auto">
                {/* ATRÁPALO label */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-6 py-1.5 rounded-full font-bangers text-xl tracking-widest"
                  style={{
                    background: 'linear-gradient(135deg,#FFB800,#FF6B00)',
                    color: '#1A0040',
                    boxShadow: '0 0 20px rgba(255,184,0,0.5)',
                  }}>
                  ATRÁPALO
                </div>

                <div className="relative rounded-2xl overflow-hidden border-4 cursor-pointer group"
                  style={{ borderColor: '#4A0E8F', animation: 'arcade-light 1.5s linear infinite' }}
                  onClick={openClawMachine}>
                  <img
                    src="/images/claw-machine.jpg"
                    alt="Máquina arcade de Chispín"
                    className="w-full h-[300px] md:h-[360px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(8,0,18,0.7) 0%, transparent 50%)' }} />

                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="glass rounded-full px-6 py-3 flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-[#FFB800]" />
                      <span className="font-bangers text-lg text-white tracking-wider">JUGAR AHORA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Success panel */}
          <ScrollReveal delay={0.2} className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 border"
              style={{ borderColor: 'rgba(255,184,0,0.3)', boxShadow: '0 0 40px rgba(255,184,0,0.1)' }}>

              <div className="text-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#FFB800] mx-auto mb-2" />
                <div className="font-bangers text-2xl text-white leading-tight">¡ENHORABUENA!</div>
                <p className="text-white/60 font-nunito text-sm mt-1">Has rescatado tu Chispín</p>
              </div>

              {/* Certificate preview */}
              <div className="rounded-xl overflow-hidden mb-4 relative"
                style={{ border: '2px solid rgba(255,184,0,0.4)' }}>
                <img src="/images/certificate.jpg" alt="Certificado" className="w-full h-32 object-cover opacity-80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white/40 font-nunito font-bold text-[10px] uppercase tracking-widest">Edición Fundadores</span>
                  <span className="font-bangers text-[#FFB800] text-3xl tracking-widest">{displayNumber}</span>
                </div>
              </div>

              <button onClick={openClawMachine}
                className="w-full btn-primary text-xs py-3 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                DESCARGAR CERTIFICADO
              </button>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
