import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import { CookieBanner } from './components/CookieBanner'

function LegalPage({ title, content }: { title: string, content: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080012] text-white pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto glass-dark p-8 rounded-3xl border border-[#4A0E8F]">
        <h1 className="font-bangers text-4xl text-[#FFB800] mb-8">{title}</h1>
        <div className="prose prose-invert max-w-none font-nunito space-y-4">
          {content}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aviso-legal" element={<LegalPage title="Aviso Legal" content={<p>Texto de Aviso Legal por defecto. (Debe ser completado con los datos de RulloLabs).</p>} />} />
        <Route path="/privacidad" element={<LegalPage title="Política de Privacidad" content={<p>Texto de Política de Privacidad por defecto.</p>} />} />
        <Route path="/cookies" element={<LegalPage title="Política de Cookies" content={<p>Texto de Política de Cookies por defecto.</p>} />} />
      </Routes>
      <CookieBanner />
    </>
  )
}
