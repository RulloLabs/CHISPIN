import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Download } from 'lucide-react';

const MILESTONES: Record<number, string> = {
  1: '­ƒææ Rey Fundador',
  25: '­ƒöÑ Vanguardia',
  50: '­ƒÅå Campe├│n',
  100: 'Ô£¿ Leyenda',
  150: '­ƒøí´©Å Guardi├ín',
  200: 'ÔÜÆ´©Å Forjador',
  250: '­ƒö« Gran Maestro',
  300: 'ÔÜö´©Å Comandante',
  333: '­ƒîƒ Chispa Sagrada',
  360: '­ƒîì Fundador Global',
  400: '­ƒªà Se├▒or del F├®nix',
  450: 'Ô¡É H├®roe de la Llama Eterna',
  500: '­ƒææ­ƒöÑ Chisp├¡n Supremo',
};

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [founderNumber, setFounderNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No se encontr├│ la sesi├│n de pago');
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const res = await fetch(`/api/check-session?session_id=${sessionId}`);
        if (!res.ok) {
          setError('No se pudo verificar el pago');
          return;
        }
        const data = await res.json();
        if (data.founderNumber) {
          setFounderNumber(data.founderNumber);
        } else {
          setError('No se pudo verificar el pago');
        }
      } catch {
        setError('Error de conexi├│n. Contacta con soporte.');
      }
      setLoading(false);
    };

    checkSession();
  }, [sessionId]);

  const milestone = founderNumber ? MILESTONES[founderNumber] : null;

  const certUrl = sessionId ? `/api/certificate?session_id=${sessionId}` : null;

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
            <div className="text-6xl mb-4">Ô£à</div>
            <h1 className="font-poppins font-black text-3xl text-white mb-4">Pago recibido</h1>
            <p className="text-white/60 mb-6">Tu Chisp├¡n est├í en proceso. Te enviaremos un email con los detalles.</p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">­ƒÄë</div>
            <h1 className="font-poppins font-black text-3xl text-white mb-4">┬íBienvenido a la Manada!</h1>
            <p className="text-white/60 mb-6">Has rescatado tu Chisp├¡n con ├®xito.</p>
            {founderNumber && (
              <div className="glass rounded-2xl p-6 max-w-xs mx-auto mb-8 border-2 border-chispa/50">
                <span className="text-white/60 text-sm uppercase tracking-wider">Edici├│n Fundadores</span>
                <div className="text-gradient-gold font-poppins font-black text-5xl mt-2">
                  N┬║ {String(founderNumber).padStart(4, '0')}
                </div>
                {milestone && (
                  <div className="mt-3 text-sm font-nunito font-bold text-[#FFB800] border border-[#FFB800]/30 rounded-full px-4 py-1.5 inline-block">
                    {milestone}
                  </div>
                )}
              </div>
            )}

            {certUrl && (
              <a
                href={certUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all font-nunito font-bold text-sm mb-4"
              >
                <Download className="w-4 h-4" />
                DESCARGAR CERTIFICADO PDF
              </a>
            )}
          </>
        )}
        <Link to="/" className="btn-primary inline-block mt-4">VOLVER AL INICIO</Link>
      </div>
    </div>
  );
}
