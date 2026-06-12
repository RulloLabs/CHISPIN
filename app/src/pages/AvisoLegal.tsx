import { Link } from 'react-router';

const sections = [
  {
    number: '01',
    title: 'Identificación del Titular',
    content: (
      <>
        <p>En cumplimiento del artículo 10 de la Ley 34/2002 (LSSI-CE), se exponen los datos del titular del sitio web <strong className="text-white">chispin.com</strong>:</p>
        <ul className="mt-4 space-y-2">
          {[
            ['Denominación social', 'Chispín AI, S.L.'],
            ['NIF', 'B-12345678'],
            ['Domicilio', 'Calle Ejemplo 42, 50001 Zaragoza, España'],
            ['Email', 'hola@chispin.com'],
          ].map(([k, v]) => (
            <li key={k} className="flex gap-2 items-baseline">
              <span className="text-chispa font-semibold shrink-0">{k}:</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: '02',
    title: 'Propiedad Intelectual e Industrial',
    content: (
      <>
        <p>Todos los contenidos del sitio —textos, imágenes, logotipos, animaciones 3D, diseño gráfico y código fuente— son propiedad de Chispín AI, S.L. o de sus licenciantes, protegidos por las leyes de propiedad intelectual e industrial.</p>
        <p className="mt-3">Queda prohibida su reproducción, distribución o transformación sin autorización expresa del titular.</p>
      </>
    ),
  },
  {
    number: '03',
    title: 'Exención de Responsabilidad',
    content: (
      <p>El titular no se responsabiliza de los daños que pudieran derivarse del uso indebido del sitio web ni de la información contenida en el mismo. El usuario asume toda responsabilidad derivada de su uso.</p>
    ),
  },
  {
    number: '04',
    title: 'Legislación Aplicable',
    content: (
      <p>Las presentes condiciones se rigen por la legislación española. Para cualquier controversia derivada del acceso o uso del sitio web, las partes se someten a los juzgados y tribunales de Zaragoza.</p>
    ),
  },
];

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-negro text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-morado/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-fuego/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-12 py-16">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-chispa transition-colors mb-12 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-morado/20 border border-morado/30 rounded-full px-4 py-1.5 text-xs text-morado-light font-semibold uppercase tracking-widest mb-6">
            <span>📋</span> Documento Legal
          </div>
          <h1 className="font-poppins font-black text-5xl md:text-6xl text-white mb-4 uppercase italic">
            Aviso <span className="text-gradient-purple">Legal</span>
          </h1>
          <p className="text-white/50 text-sm">Última actualización: junio 2026</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((sec) => (
            <div
              key={sec.number}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 hover:border-morado/30 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex gap-5 items-start">
                <span className="font-poppins font-black text-4xl text-morado/30 group-hover:text-morado/50 transition-colors shrink-0 leading-none mt-1">
                  {sec.number}
                </span>
                <div>
                  <h2 className="font-poppins font-bold text-lg text-white mb-3">{sec.title}</h2>
                  <div className="text-white/60 text-sm leading-relaxed">{sec.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© 2026 Chispín AI, S.L. — La Chispa Nunca Se Apaga.</span>
          <div className="flex gap-4">
            <Link to="/privacidad" className="hover:text-white/60 transition-colors">Privacidad</Link>
            <Link to="/cookies" className="hover:text-white/60 transition-colors">Cookies</Link>
            <Link to="/terminos" className="hover:text-white/60 transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
