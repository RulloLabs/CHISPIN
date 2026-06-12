import { Link } from 'react-router';

const cookieTypes = [
  {
    type: 'Técnicas',
    icon: '⚙️',
    required: true,
    desc: 'Permiten la navegación básica y el funcionamiento de la web. No requieren consentimiento.',
    color: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/20',
    badge: 'bg-emerald-500/20 text-emerald-300',
  },
  {
    type: 'Analíticas',
    icon: '📊',
    required: false,
    desc: 'Recogen información anónima sobre el uso del sitio para mejorarlo. Solo se activan con tu consentimiento.',
    color: 'from-morado/20 to-morado/10',
    border: 'border-morado/20',
    badge: 'bg-morado/20 text-morado-light',
  },
  {
    type: 'Terceros (Stripe)',
    icon: '💳',
    required: false,
    desc: 'Stripe establece cookies propias durante el proceso de pago. Consulta la política de Stripe para más información.',
    color: 'from-chispa/10 to-chispa/5',
    border: 'border-chispa/20',
    badge: 'bg-chispa/20 text-chispa',
  },
];

const browsers = [
  { name: 'Chrome', path: 'Configuración → Privacidad → Cookies' },
  { name: 'Firefox', path: 'Opciones → Privacidad → Cookies' },
  { name: 'Safari', path: 'Preferencias → Privacidad → Cookies' },
  { name: 'Edge', path: 'Configuración → Cookies' },
];

export default function Cookies() {
  return (
    <div className="min-h-screen bg-negro text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-chispa/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-morado/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-12 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-chispa transition-colors mb-12 group">
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
          Volver al inicio
        </Link>

        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-chispa/10 border border-chispa/20 rounded-full px-4 py-1.5 text-xs text-chispa font-semibold uppercase tracking-widest mb-6">
            <span>🍪</span> Gestión de Cookies
          </div>
          <h1 className="font-poppins font-black text-5xl md:text-6xl text-white mb-4 uppercase italic">
            Política de <span className="text-gradient-gold">Cookies</span>
          </h1>
          <p className="text-white/50 text-sm">Última actualización: junio 2026</p>
        </div>

        {/* What are cookies */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 mb-6">
          <div className="flex gap-5 items-start">
            <span className="font-poppins font-black text-4xl text-morado/30 shrink-0 leading-none mt-1">01</span>
            <div>
              <h2 className="font-poppins font-bold text-lg text-white mb-3">¿Qué son las Cookies?</h2>
              <p className="text-white/60 text-sm leading-relaxed">Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia de navegación.</p>
            </div>
          </div>
        </div>

        {/* Cookie types */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 mb-6">
          <div className="flex gap-5 items-start mb-6">
            <span className="font-poppins font-black text-4xl text-morado/30 shrink-0 leading-none mt-1">02</span>
            <div>
              <h2 className="font-poppins font-bold text-lg text-white mb-1">Tipos de Cookies que Utilizamos</h2>
              <p className="text-white/40 text-xs">Detalle de cada categoría</p>
            </div>
          </div>
          <div className="grid gap-4 ml-0 md:ml-14">
            {cookieTypes.map((c) => (
              <div key={c.type} className={`rounded-xl border ${c.border} bg-gradient-to-br ${c.color} p-5`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.icon}</span>
                    <span className="font-poppins font-bold text-white text-sm">{c.type}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${c.badge}`}>
                    {c.required ? 'Obligatoria' : 'Opcional'}
                  </span>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Manage cookies */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 mb-6">
          <div className="flex gap-5 items-start mb-6">
            <span className="font-poppins font-black text-4xl text-morado/30 shrink-0 leading-none mt-1">03</span>
            <div>
              <h2 className="font-poppins font-bold text-lg text-white mb-1">Gestión de Cookies</h2>
              <p className="text-white/40 text-xs">Cómo bloquearlas desde tu navegador</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ml-0 md:ml-14">
            {browsers.map((b) => (
              <div key={b.name} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="font-poppins font-bold text-white text-sm mb-1">{b.name}</p>
                <p className="text-white/40 text-[10px] leading-relaxed">{b.path}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7">
          <div className="flex gap-5 items-start">
            <span className="font-poppins font-black text-4xl text-morado/30 shrink-0 leading-none mt-1">04</span>
            <div>
              <h2 className="font-poppins font-bold text-lg text-white mb-3">¿Más Preguntas?</h2>
              <p className="text-white/60 text-sm leading-relaxed">Si tienes dudas sobre nuestra política de cookies, escríbenos a <strong className="text-white">hola@chispin.com</strong>. Respondemos en menos de 48h.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© 2026 Chispín AI, S.L. — La Chispa Nunca Se Apaga.</span>
          <div className="flex gap-4">
            <Link to="/aviso-legal" className="hover:text-white/60 transition-colors">Aviso Legal</Link>
            <Link to="/privacidad" className="hover:text-white/60 transition-colors">Privacidad</Link>
            <Link to="/terminos" className="hover:text-white/60 transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
