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
            <div className="text-6xl mb-4">­ƒöÑ</div>
            <h1 className="font-bangers text-4xl text-white mb-4">Algo sali├│ mal</h1>
            <p className="text-white/60 mb-6">La chispa titube├│, pero no se apaga. Vuelve a intentarlo.</p>
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
        <div className="text-6xl mb-4">­ƒöì</div>
        <h1 className="font-bangers text-4xl text-white mb-4">P├ígina no encontrada</h1>
        <p className="text-white/60 mb-6">Esta p├ígina no existe. Pero Chisp├¡n te espera en casa.</p>
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
          <section><h2 className="text-white font-bangers text-xl mb-3">1. Identificaci├│n del Titular</h2>
          <p>En cumplimiento con el deber de informaci├│n recogido en el art├¡culo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Informaci├│n y del Comercio Electr├│nico, a continuaci├│n se exponen los datos identificativos del titular del sitio web <strong>chispin.com</strong>:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Denominaci├│n social: Chisp├¡n AI, S.L.</li>
            <li>NIF: B-12345678</li>
            <li>Domicilio: Calle Ejemplo 42, 50001 Zaragoza, Espa├▒a</li>
            <li>Email: hola@chispin.com</li>
          </ul></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">2. Propiedad Intelectual</h2>
          <p>Todos los contenidos del sitio web ÔÇöincluyendo textos, im├ígenes, logotipos, animaciones 3D, dise├▒o gr├ífico y c├│digo fuenteÔÇö son propiedad de Chisp├¡n AI, S.L. o de sus licenciantes, y est├ín protegidos por las leyes de propiedad intelectual e industrial. Queda prohibida la reproducci├│n, distribuci├│n o comunicaci├│n p├║blica sin autorizaci├│n expresa.</p></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">3. Legislaci├│n Aplicable</h2>
          <p>Las presentes condiciones se rigen por la legislaci├│n espa├▒ola. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Zaragoza.</p></section>
        </LegalPage>} />
        <Route path="/privacidad" element={<LegalPage title="Pol├¡tica de Privacidad">
          <section><h2 className="text-white font-bangers text-xl mb-3">1. Responsable del Tratamiento</h2>
          <p>Chisp├¡n AI, S.L. es el responsable del tratamiento de los datos personales recabados a trav├®s de este sitio web.</p></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">2. Datos Recogidos</h2>
          <p>Recogemos nombre y correo electr├│nico a trav├®s del formulario de reserva, datos de navegaci├│n an├│nimos mediante cookies t├®cnicas, e informaci├│n de pago procesada a trav├®s de Stripe (no almacenamos datos de tarjetas).</p></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">3. Finalidad</h2>
          <p>Tus datos se utilizan exclusivamente para gestionar tu reserva, enviarte comunicaciones relacionadas con tu pedido y mejorar la experiencia de navegaci├│n.</p></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">4. Derechos</h2>
          <p>Puedes ejercer tus derechos de acceso, rectificaci├│n, supresi├│n, limitaci├│n, portabilidad y oposici├│n escribiendo a hola@chispin.com.</p></section>
        </LegalPage>} />
        <Route path="/cookies" element={<LegalPage title="Pol├¡tica de Cookies">
          <section><h2 className="text-white font-bangers text-xl mb-3">1. ┬┐Qu├® son las Cookies?</h2>
          <p>Las cookies son peque├▒os archivos de texto que se almacenan en tu navegador cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia.</p></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">2. Tipos de Cookies</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>T├®cnicas (necesarias):</strong> Permiten la navegaci├│n b├ísica. No requieren consentimiento.</li>
            <li><strong>Anal├¡ticas:</strong> Recogen informaci├│n an├│nima sobre el uso del sitio. Solo se activan con tu consentimiento.</li>
          </ul></section>
          <section><h2 className="text-white font-bangers text-xl mb-3">3. Gesti├│n</h2>
          <p>Puedes configurar, bloquear o eliminar las cookies desde la configuraci├│n de tu navegador. M├ís informaci├│n en chrome://settings/cookies o similar seg├║n tu navegador.</p></section>
        </LegalPage>} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </ErrorBoundary>
  )
}
