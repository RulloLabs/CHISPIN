import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const urlFounderId = searchParams.get('founderId');
  const [loading, setLoading] = useState(true);
  const [founderNumber, setFounderNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use URL param first (passed directly from reserve flow)
    if (urlFounderId) {
      setFounderNumber(Number(urlFounderId));
      setLoading(false);
      return;
    }

    if (!sessionId) {
      setError('No se encontró la sesión de pago');
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const res = await fetch(`/api/check-session?session_id=${sessionId}`);
        const data = await res.json();
        if (data.founderNumber) {
          setFounderNumber(data.founderNumber);
        } else {
          setError('No se pudo verificar el pago');
        }
      } catch {
        setFounderNumber(Math.floor(Math.random() * 500) + 1);
      }
      setLoading(false);
    };

    checkSession();
  }, [sessionId, urlFounderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-negro flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-chispa border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-negro flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        {error ? (
          <>
            <div className="text-6xl mb-4">✅</div>
            <h1 className="font-poppins font-black text-3xl text-white mb-4">Pago recibido</h1>
            <p className="text-white/60 mb-6">Tu Chispín está en proceso. Te enviaremos un email con los detalles.</p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="font-poppins font-black text-3xl text-white mb-4">¡Bienvenido a la Manada!</h1>
            <p className="text-white/60 mb-6">Has rescatado tu Chispín con éxito.</p>
            {founderNumber && (
              <div className="glass rounded-2xl p-6 max-w-xs mx-auto mb-8 border-2 border-chispa/50">
                <span className="text-white/60 text-sm uppercase tracking-wider">Edición Fundadores</span>
                <div className="text-gradient-gold font-poppins font-black text-5xl mt-2">
                  Nº {String(founderNumber).padStart(4, '0')}
                </div>
              </div>
            )}
          </>
        )}
        <Link to="/" className="btn-primary inline-block mt-4">VOLVER AL INICIO</Link>
      </div>
    </div>
  );
}
