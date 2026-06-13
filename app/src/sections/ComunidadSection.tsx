import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useReservation } from '@/context/ReservationContext';
import CountUp from 'react-countup';

const topProvincias = [
  { name: 'Madrid', count: 1247, width: '100%' },
  { name: 'Barcelona', count: 892, width: '72%' },
  { name: 'Valencia', count: 634, width: '51%' },
  { name: 'Sevilla', count: 421, width: '34%' },
  { name: 'Zaragoza', count: 298, width: '24%' },
];

export function ComunidadSection() {
  const { reservationCount } = useReservation();

  return (
    <section id="comunidad" className="relative section-padding bg-gris-oscuro">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionLabel text="La Manada" color="yellow" />
            <h2 className="font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              Ya forman parte de la manada
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-3 glass rounded-2xl px-8 py-4">
              <span className="text-chispa font-poppins font-black text-4xl md:text-5xl">
                <CountUp end={reservationCount} duration={2.5} separator="." />
              </span>
              <div className="text-left">
                <span className="text-white/80 text-sm block">reservas</span>
                <span className="text-white/40 text-xs">desde el lanzamiento</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Spain Map SVG */}
        <ScrollReveal>
          <div className="relative max-w-2xl mx-auto mb-12">
            <svg viewBox="0 0 600 450" className="w-full h-auto" fill="none">
              {/* Spain outline */}
              <path 
                d="M180,380 L160,360 L140,340 L130,300 L120,260 L110,220 L100,180 L95,140 L100,100 L120,80 L150,70 L180,65 L220,60 L260,58 L300,55 L340,58 L380,65 L420,75 L450,90 L470,110 L480,140 L485,170 L480,200 L470,230 L460,260 L450,290 L440,320 L430,350 L420,380 L400,400 L380,410 L360,415 L340,420 L320,425 L300,430 L280,425 L260,420 L240,415 L220,410 L200,400 L190,390 Z"
                fill="rgba(107,47,184,0.1)"
                stroke="rgba(107,47,184,0.4)"
                strokeWidth="1.5"
              />
              
              {/* Province dots */}
              {[
                { cx: 280, cy: 120, r: 6, label: 'País Vasco' },
                { cx: 320, cy: 100, r: 5, label: 'Navarra' },
                { cx: 380, cy: 110, r: 4, label: 'Cataluña' },
                { cx: 260, cy: 160, r: 7, label: 'Madrid' },
                { cx: 220, cy: 200, r: 5, label: 'Extremadura' },
                { cx: 300, cy: 220, r: 6, label: 'Valencia' },
                { cx: 180, cy: 240, r: 5, label: 'Andalucía W' },
                { cx: 240, cy: 280, r: 6, label: 'Andalucía E' },
                { cx: 340, cy: 160, r: 4, label: 'Aragón' },
                { cx: 150, cy: 130, r: 4, label: 'Galicia' },
                { cx: 200, cy: 140, r: 3, label: 'Asturias' },
                { cx: 400, cy: 300, r: 3, label: 'Baleares' },
              ].map((dot, i) => (
                <g key={i}>
                  <circle 
                    cx={dot.cx} 
                    cy={dot.cy} 
                    r={dot.r} 
                    fill="#FFC83D"
                    opacity="0.8"
                  >
                    <animate 
                      attributeName="opacity" 
                      values="0.4;0.9;0.4" 
                      dur={`${2 + i * 0.3}s`} 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  <circle 
                    cx={dot.cx} 
                    cy={dot.cy} 
                    r={dot.r * 2} 
                    fill="none"
                    stroke="#FFC83D"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                </g>
              ))}
              
              {/* Legend */}
              <text x="300" y="440" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12" fontFamily="Inter">
                Cada punto es una familia de Chispín
              </text>
            </svg>
          </div>
        </ScrollReveal>
        
        {/* Top Provinces Ranking */}
        <ScrollReveal>
          <div className="max-w-lg mx-auto">
            <h3 className="font-poppins font-bold text-lg text-white mb-4 text-center">
              Top Provincias
            </h3>
            <div className="space-y-3">
              {topProvincias.map((prov, i) => (
                <div key={prov.name} className="flex items-center gap-3">
                  <span className="text-white/40 text-sm w-6">{i + 1}</span>
                  <span className="text-white/80 text-sm w-24">{prov.name}</span>
                  <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full gradient-purple rounded-full flex items-center justify-end pr-2 transition-all duration-1000"
                      style={{ width: prov.width }}
                    >
                      <span className="text-white/80 text-xs font-medium">
                        {prov.count.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
