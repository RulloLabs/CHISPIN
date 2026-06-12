import { Link } from 'react-router';

const sections = [
  {
    number: '01',
    title: 'Responsable del Tratamiento',
    content: (
      <p>Chispín AI, S.L. (en adelante, "Chispín") es el responsable del tratamiento de los datos personales recabados a través de este sitio web, con domicilio en Calle Ejemplo 42, 50001 Zaragoza, España. Contacto: <strong className="text-white">hola@chispin.com</strong></p>
    ),
  },
  {
    number: '02',
    title: 'Datos Recogidos',
    content: (
      <>
        <p>Recogemos la siguiente información cuando interactúas con nuestra web:</p>
        <ul className="mt-3 space-y-2">
          {[
            'Nombre y dirección de correo electrónico (a través del formulario de reserva)',
            'Datos de navegación anónimos mediante cookies técnicas y analíticas',
            'Información de pago procesada a través de Stripe (no almacenamos datos de tarjetas)',
          ].map((item, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="text-chispa mt-0.5 shrink-0">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: '03',
    title: 'Finalidad del Tratamiento',
    content: (
      <>
        <p>Tus datos se utilizan exclusivamente para:</p>
        <ul className="mt-3 space-y-2">
          {[
            'Gestionar tu reserva de Chispín',
            'Enviarte comunicaciones relacionadas con tu pedido',
            'Mejorar la experiencia de navegación en la web',
          ].map((item, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="text-chispa mt-0.5 shrink-0">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: '04',
    title: 'Base Legal',
    content: (
      <p>El tratamiento se basa en tu consentimiento explícito al enviar el formulario de reserva y en la ejecución del contrato de compraventa, de conformidad con el RGPD (UE) 2016/679.</p>
    ),
  },
  {
    number: '05',
    title: 'Cesión de Datos',
    content: (
      <p>No cedemos tus datos a terceros salvo obligación legal. Los pagos se procesan a través de Stripe, que actúa como encargado de tratamiento con sus propias políticas de privacidad disponibles en <span className="text-chispa">stripe.com/privacy</span>.</p>
    ),
  },
  {
    number: '06',
    title: 'Tus Derechos',
    content: (
      <>
        <p>Puedes ejercer en cualquier momento tus derechos de:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
          {['Acceso', 'Rectificación', 'Supresión', 'Limitación', 'Portabilidad', 'Oposición'].map((d) => (
            <span key={d} className="text-center py-1.5 px-3 rounded-lg bg-morado/10 border border-morado/20 text-morado-light text-xs font-semibold">{d}</span>
          ))}
        </div>
        <p className="mt-3">Escríbenos a <strong className="text-white">hola@chispin.com</strong></p>
      </>
    ),
  },
];

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-negro text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-morado/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-chispa/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-12 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-chispa transition-colors mb-12 group">
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
          Volver al inicio
        </Link>

        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-morado/20 border border-morado/30 rounded-full px-4 py-1.5 text-xs text-morado-light font-semibold uppercase tracking-widest mb-6">
            <span>🔒</span> Protección de Datos
          </div>
          <h1 className="font-poppins font-black text-5xl md:text-6xl text-white mb-4 uppercase italic">
            Política de <span className="text-gradient-purple">Privacidad</span>
          </h1>
          <p className="text-white/50 text-sm">Última actualización: junio 2026 · Cumple con el RGPD y la LOPDGDD</p>
        </div>

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
                <div className="flex-1">
                  <h2 className="font-poppins font-bold text-lg text-white mb-3">{sec.title}</h2>
                  <div className="text-white/60 text-sm leading-relaxed">{sec.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© 2026 Chispín AI, S.L. — La Chispa Nunca Se Apaga.</span>
          <div className="flex gap-4">
            <Link to="/aviso-legal" className="hover:text-white/60 transition-colors">Aviso Legal</Link>
            <Link to="/cookies" className="hover:text-white/60 transition-colors">Cookies</Link>
            <Link to="/terminos" className="hover:text-white/60 transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
