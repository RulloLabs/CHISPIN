import { Flame, Map } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useReservation } from '@/context/ReservationContext';
import CountUp from 'react-countup';

const provinces = [
  { name: 'Zaragoza', count: 892 },
  { name: 'Madrid', count: 741 },
  { name: 'Valencia', count: 612 },
  { name: 'Barcelona', count: 589 },
  { name: 'Teruel', count: 487, highlight: true },
];

export function ComunidadSection() {
  const { reservationCount } = useReservation();

  return (
    <section id="comunidad" className="relative section-padding overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1A0540 0%, #080012 70%)' }}>

      <div className="container-custom relative z-10">
        <ScrollReveal className="text-center mb-12">
          <div className="section-label">La Manada</div>
          <h2 className="font-bangers text-4xl md:text-5xl lg:text-6xl text-white">
            LA MANADA<br />
            <span style={{
              background: 'linear-gradient(135deg,#FFB800,#FF6B00)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              DE CHISPÍN
            </span>
          </h2>
          <p className="text-white/55 font-nunito mt-3">Cada día somos más. ¿Desde dónde nos acompañas?</p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT: Map + Counter */}
          <ScrollReveal>
            <div className="relative">
              {/* Counter badge */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="glass rounded-full px-6 py-3 flex items-center gap-3"
                  style={{ border: '1.5px solid rgba(255,184,0,0.4)' }}>
                  <Flame className="w-5 h-5 text-[#FF6B00]" />
                  <span className="font-bangers text-3xl text-[#FFB800] tracking-wider">
                    <CountUp end={reservationCount} duration={2} separator="." />
                  </span>
                  <span className="text-white/70 font-nunito font-bold text-sm uppercase tracking-wide">
                    Chispines Rescatados
                  </span>
                </div>
              </div>

              {/* Map */}
              <div className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 0 60px rgba(74,14,143,0.4)' }}>
                <img
                  src="/images/spain-map-3d.png"
                  alt="Mapa de España — La Manada de Chispín"
                  className="w-full object-contain rounded-2xl"
                />
                <div className="absolute inset-0 rounded-2xl"
                  style={{ background: 'linear-gradient(to top, rgba(8,0,18,0.3) 0%, transparent 60%)' }} />
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Top Provinces */}
          <ScrollReveal delay={0.15}>
            <div className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(255,184,0,0.15)' }}>
              <h3 className="font-bangers text-xl text-[#FFB800] tracking-wider mb-5 uppercase">
                Top Provincias
              </h3>

              <div className="space-y-3">
                {provinces.map((p, i) => (
                  <div key={p.name}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all ${
                      p.highlight
                        ? 'bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.3)]'
                        : 'border border-transparent hover:border-white/10'
                    }`}>
                    {/* Rank */}
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-nunito font-black text-xs"
                      style={{
                        background: i === 0 ? 'linear-gradient(135deg,#FFB800,#FF6B00)' : 'rgba(74,14,143,0.5)',
                        color: i === 0 ? '#1A0040' : '#C8A5FF',
                      }}>
                      {i + 1}
                    </div>
                    {/* Name */}
                    <span className={`flex-1 font-nunito font-bold text-sm ${p.highlight ? 'text-[#FF6B00]' : 'text-white/70'}`}>
                      {p.name}{p.highlight ? ' 🔥' : ''}
                    </span>
                    {/* Count */}
                    <span className={`font-nunito font-black text-sm ${p.highlight ? 'text-[#FF6B00]' : 'text-[#FFB800]'}`}>
                      {p.count.toLocaleString('es-ES')}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 btn-outline text-xs py-3 flex items-center justify-center gap-2">
                <Map className="w-4 h-4" />
                VER MAPA COMPLETO
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
