import { Link } from 'react-router';

const sections = [
  {
    number: '01',
    title: 'Objeto',
    content: (
      <p>Los presentes Términos y Condiciones regulan la compra de productos y servicios a través del sitio web <strong className="text-white">chispin.com</strong>, titularidad de Chispín AI, S.L. Al completar una reserva, el usuario acepta íntegramente estas condiciones.</p>
    ),
  },
  {
    number: '02',
    title: 'Proceso de Compra',
    content: (
      <p>Para adquirir un Chispín, el usuario completa el formulario de reserva en la Máquina de Chispines. Al confirmar, se redirige a Stripe para el pago seguro. Tras el pago, se asigna un número de Chispín único y se envía confirmación por email.</p>
    ),
  },
  {
    number: '03',
    title: 'Precio y Pagos',
    content: (
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-gradient-to-br from-chispa/20 to-fuego/20 border border-chispa/30 px-6 py-4 text-center shrink-0">
          <p className="font-poppins font-black text-3xl text-chispa">39€</p>
          <p className="text-white/50 text-xs">IVA incluido</p>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">El pago se realiza íntegramente a través de Stripe. No aceptamos otros métodos de pago. El cargo se realiza en el momento de la reserva.</p>
      </div>
    ),
  },
  {
    number: '04',
    title: 'Envíos y Plazos',
    content: (
      <p>Los Chispines se entregarán en la dirección indicada durante el proceso de compra. Los plazos estimados son de <strong className="text-white">8–10 semanas</strong> tras el cierre de la campaña de reservas. Los Fundadores tienen envío prioritario. Te notificaremos por email en cada etapa.</p>
    ),
  },
  {
    number: '05',
    title: 'Devoluciones y Reembolsos',
    content: (
      <>
        <p>Dispones de <strong className="text-white">14 días naturales</strong> desde la recepción del producto para ejercer tu derecho de desistimiento, conforme a la normativa vigente.</p>
        <p className="mt-2">Para gestionar una devolución, contacta con <strong className="text-white">hola@chispin.com</strong>. El reembolso se procesará en un plazo máximo de 14 días desde que recibamos el producto en perfectas condiciones.</p>
      </>
    ),
  },
  {
    number: '06',
    title: 'Garantía del Producto',
    content: (
      <p>Todos los Chispines cuentan con garantía legal de 2 años conforme a la normativa europea. En caso de defecto de fabricación, lo sustituiremos sin coste adicional.</p>
    ),
  },
  {
    number: '07',
    title: 'Modificaciones',
    content: (
      <p>Chispín se reserva el derecho de modificar estos términos en cualquier momento. Los cambios se publicarán en esta página y, si son sustanciales, se notificarán a los usuarios registrados con 30 días de antelación.</p>
    ),
  },
];

export default function Terminos() {
  return (
    <div className="min-h-screen bg-negro text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-fuego/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-morado/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-12 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-chispa transition-colors mb-12 group">
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
          Volver al inicio
        </Link>

        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-fuego/10 border border-fuego/20 rounded-full px-4 py-1.5 text-xs text-fuego-light font-semibold uppercase tracking-widest mb-6">
            <span>📜</span> Contrato de Compra
          </div>
          <h1 className="font-poppins font-black text-5xl md:text-6xl text-white mb-4 uppercase italic">
            Términos & <span className="text-gradient-fire">Condiciones</span>
          </h1>
          <p className="text-white/50 text-sm">Última actualización: junio 2026 · Al reservar, aceptas estas condiciones</p>
        </div>

        <div className="space-y-6">
          {sections.map((sec) => (
            <div
              key={sec.number}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 hover:border-fuego/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex gap-5 items-start">
                <span className="font-poppins font-black text-4xl text-fuego/20 group-hover:text-fuego/40 transition-colors shrink-0 leading-none mt-1">
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

        {/* Contact CTA */}
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-fuego/10 to-morado/10 border border-white/10 p-8 text-center">
          <p className="text-white/70 text-sm mb-4">¿Tienes dudas sobre tu reserva o los términos de compra?</p>
          <a
            href="mailto:hola@chispin.com"
            className="btn-primary inline-block text-sm"
          >
            CONTACTAR CON NOSOTROS
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© 2026 Chispín AI, S.L. — La Chispa Nunca Se Apaga.</span>
          <div className="flex gap-4">
            <Link to="/aviso-legal" className="hover:text-white/60 transition-colors">Aviso Legal</Link>
            <Link to="/privacidad" className="hover:text-white/60 transition-colors">Privacidad</Link>
            <Link to="/cookies" className="hover:text-white/60 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
