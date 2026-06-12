import { Component, type ReactNode } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import AvisoLegal from './pages/AvisoLegal'
import Privacidad from './pages/Privacidad'
import Cookies from './pages/Cookies'
import Terminos from './pages/Terminos'
import Success from './pages/Success'

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-negro flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🔥</div>
            <h1 className="font-poppins font-black text-3xl text-white mb-4">Algo salió mal</h1>
            <p className="text-white/60 mb-6">La chispa titubeó, pero no se apaga. Vuelve a intentarlo.</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
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
    <div className="min-h-screen bg-negro flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="font-poppins font-black text-3xl text-white mb-4">Página no encontrada</h1>
        <p className="text-white/60 mb-6">Esta página no existe. Pero Chispín te espera en casa.</p>
        <a href="/" className="btn-primary inline-block">VOLVER AL INICIO</a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  )
}
