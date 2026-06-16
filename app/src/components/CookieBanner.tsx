import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('chispin_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('chispin_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('chispin_cookie_consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#080012] border-t border-[#4A0E8F] z-50 p-4 shadow-[0_-10px_40px_rgba(74,14,143,0.3)] text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-white/80 flex-1">
          Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación.
        </div>
        <div className="flex gap-3">
          <button onClick={handleReject} className="px-4 py-2 text-sm rounded-full border border-white/20 hover:bg-white/10 transition-colors">
            Rechazar
          </button>
          <button onClick={handleAccept} className="px-6 py-2 text-sm rounded-full bg-gradient-to-r from-[#FFB800] to-[#FF6B00] text-[#1A0040] font-bold hover:scale-105 transition-transform">
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
