import { Component, type ReactNode } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Success from './pages/Success'
import { CookieBanner } from './components/CookieBanner'

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080012] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🔥</div>
            <h1 className="font-bangers text-4xl text-white mb-4">Algo salió mal</h1>
            <p className="text-white/60 mb-6">La chispa titubeó, pero no se apaga. Vuelve a intentarlo.</p>
            <button onClick={() => window.location.reload()} className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FFB800] to-[#FF6B00] text-[#1A0040] font-bold hover:scale-105 transition-transform">
              RECARGAR
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#080012] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="font-bangers text-4xl text-white mb-4">Página no encontrada</h1>
        <p className="text-white/60 mb-6">Esta página no existe. Pero Chispín te espera en casa.</p>
        <a href="/" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#FFB800] to-[#FF6B00] text-[#1A0040] font-bold hover:scale-105 transition-transform">VOLVER AL INICIO</a>
      </div>
    </div>
  )
}

function LegalPage({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080012] text-white pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto glass-dark p-8 rounded-3xl border border-[#4A0E8F]">
        <a href="/" className="text-[#FFB800] hover:text-[#FF6B00] text-sm mb-6 inline-block">&larr; Volver al inicio</a>
        <h1 className="font-bangers text-4xl text-[#FFB800] mb-8">{title}</h1>
        <div className="prose prose-invert max-w-none font-nunito space-y-4 text-white/80 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aviso-legal" element={<LegalPage title="Aviso Legal">
          <section><h2 className="text-white font-bangers text-xl mb-3">1. Identificación del Titular</h2>
          <p>En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se exponen los datos identificativos del titular del sitio web <strong>chispin.com</strong>:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Denominación social: Chispín AI, S.L.</li>
            <li>NIF: B-12345678</li>
            <li>Domicilio: Calle Ejemplo 42, 50001 Zaragoza, España</li>
            <li>Email: hola@chispin.com</li>
          </ul></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">2. Propiedad Intelectual</h2>
          <p>Todos los contenidos del sitio web —incluyendo textos, imágenes, logotipos, animaciones 3D, diseño gráfico y código fuente— son propiedad de Chispín AI, S.L. o de sus licenciantes, y están protegidos por las leyes de propiedad intelectual e industrial. Queda prohibida la reproducción, distribución o comunicación pública sin autorización expresa.</p></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">3. Legislación Aplicable</h2>
          <p>Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Zaragoza.</p></section>
        </LegalPage>} />
        <Route path="/privacidad" element={<LegalPage title="Política de Privacidad">
          <section><h2 className="text-white font-bangers text-xl mb-3">1. Responsable del Tratamiento</h2>
          <p>Chispín AI, S.L. es el responsable del tratamiento de los datos personales recabados a través de este sitio web.</p></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">2. Datos Recogidos</h2>
          <p>Recogemos nombre y correo electrónico a través del formulario de reserva, datos de navegación anónimos mediante cookies técnicas, e información de pago procesada a través de Stripe (no almacenamos datos de tarjetas).</p></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">3. Finalidad</h2>
          <p>Tus datos se utilizan exclusivamente para gestionar tu reserva, enviarte comunicaciones relacionadas con tu pedido y mejorar la experiencia de navegación.</p></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">4. Derechos</h2>
          <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición escribiendo a hola@chispin.com.</p></section>
        </LegalPage>} />
        <Route path="/cookies" element={<LegalPage title="Política de Cookies">
          <section><h2 className="text-white font-bangers text-xl mb-3">1. ¿Qué son las Cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia.</p></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">2. Tipos de Cookies</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Técnicas (necesarias):</strong> Permiten la navegación básica. No requieren consentimiento.</li>
            <li><strong>Analíticas:</strong> Recogen información anónima sobre el uso del sitio. Solo se activan con tu consentimiento.</li>
          </ul></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">3. Gestión</h2>
          <p>Puedes configurar, bloquear o eliminar las cookies desde la configuración de tu navegador. Más información en chrome://settings/cookies o similar según tu navegador.</p></section>
        </LegalPage>} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </ErrorBoundary>
  )
}
