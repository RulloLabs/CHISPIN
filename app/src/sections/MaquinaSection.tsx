import { ScrollReveal } from '@/components/ScrollReveal';
import { useReservation } from '@/context/ReservationContext';

export function MaquinaSection() {
  const { openClawMachine } = useReservation();

  const steps = [
    'Entras en la máquina',
    'Eliges tu momento',
    '¡Atrápalo!',
    'Chispín es tuyo',
    'Recibes tu certificado'
  ];

  return (
    <section id="maquina" className="relative section-padding bg-[#f4e8d8]">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <div>
            <ScrollReveal>
              <h2 className="font-poppins font-black text-4xl md:text-5xl text-[#3d2c5e] mb-4 uppercase italic">
                UNA EXPERIENCIA<br/>QUE NO OLVIDARÁS
              </h2>
              <p className="text-xl md:text-2xl text-[#3d2c5e] font-medium leading-relaxed mb-8">
                <span className="text-[#6b2fb8]">No es solo una reserva.</span><br/>
                <span className="text-[#ff7a00]">Es rescatar a tu Chispín.</span>
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.15}>
              <ul className="space-y-4 mb-10">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#3d2c5e] text-white font-poppins font-bold flex items-center justify-center shrink-0 shadow-lg">
                      {index + 1}
                    </div>
                    <span className="text-[#3d2c5e] font-medium text-lg">{step}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            
            <ScrollReveal delay={0.25}>
              <button 
                onClick={openClawMachine}
                className="btn-primary text-sm px-10 py-4 shadow-[0_4px_20px_rgba(255,122,0,0.3)]"
              >
                VER EXPERIENCIA
              </button>
            </ScrollReveal>
          </div>
          
          {/* Right: Machine Preview & Popup */}
          <ScrollReveal delay={0.2}>
            <div className="relative">
              {/* Machine background */}
              <div 
                className="rounded-3xl overflow-hidden border-8 border-[#2d1b4e] shadow-2xl relative cursor-pointer group"
                onClick={openClawMachine}
              >
                <img 
                  src="/images/claw-machine.jpg" 
                  alt="Máquina arcade"
                  className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dark overlay to simulate the arcade screen */}
                <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/40 to-negro/20" />
                
                {/* 3D Title "ATRÁPALO" simulated text */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full text-center">
                   <h3 className="font-poppins font-black text-4xl text-gradient-gold drop-shadow-[0_0_15px_rgba(255,200,61,0.8)] tracking-widest uppercase">ATRÁPALO</h3>
                </div>

                {/* The "Popup" simulated inside the machine */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[320px]">
                  <div className="bg-[#150a21] border border-white/10 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden">
                    {/* Confetti simulation */}
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    
                    <h4 className="font-poppins font-black text-2xl text-gradient-gold mb-2 relative z-10">¡ENHORABUENA!</h4>
                    <p className="text-white/90 text-sm font-medium mb-6 relative z-10">Has rescatado tu Chispín</p>
                    
                    <div className="mb-6 relative z-10">
                      <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">EDICIÓN FUNDADORES</p>
                      <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-2">UNIDAD Nº</p>
                      <div className="bg-white text-negro font-poppins font-black text-3xl py-2 px-6 rounded-lg inline-block shadow-inner">
                        247
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-[#ffc83d] to-[#ff9f43] text-negro font-bold text-xs py-3 rounded-lg uppercase tracking-wider relative z-10 hover:brightness-110 transition-all">
                      DESCARGAR CERTIFICADO
                    </button>
                  </div>
                </div>

              </div>
              
              {/* Decorative sparks */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-chispa rounded-full opacity-60 animate-pulse blur-md" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-fuego rounded-full opacity-40 animate-ping blur-xl" />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
