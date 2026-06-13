import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Sparkles, Share2, Copy, Check } from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';
import confetti from 'canvas-confetti';

type Phase = 'idle' | 'grabbing' | 'celebrating' | 'form' | 'success';

export function ClawMachineModal() {
  const { isClawMachineOpen, closeClawMachine, completeReservation, founderNumber } = useReservation();
  const [phase, setPhase] = useState<Phase>('idle');
  const [clawX, setClawX] = useState(50);
  const [clawY, setClawY] = useState(10);
  const [clawOpen, setClawOpen] = useState(true);
  const [hasChispin, setHasChispin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const directionRef = useRef(1);
  const animRef = useRef<number | null>(null);

  // Claw oscillation in idle phase
  useEffect(() => {
    if (phase !== 'idle') return;
    
    const animate = () => {
      setClawX(prev => {
        const next = prev + directionRef.current * 0.4;
        if (next >= 80) directionRef.current = -1;
        if (next <= 20) directionRef.current = 1;
        return next;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [phase]);

  const fireConfetti = useCallback(() => {
    const colors = ['#6B2FB8', '#FF7A00', '#FFC83D', '#FF6B9D', '#FFFFFF'];
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      disableForReducedMotion: true,
    });
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.7, x: 0.3 },
        colors,
        disableForReducedMotion: true,
      });
    }, 200);
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.7, x: 0.7 },
        colors,
        disableForReducedMotion: true,
      });
    }, 400);
  }, []);

  const handleGrab = async () => {
    if (phase !== 'idle') return;
    setPhase('grabbing');
    
    // Stop oscillation
    if (animRef.current) cancelAnimationFrame(animRef.current);
    
    // Descend
    setClawOpen(true);
    await animateClawY(10, 65, 1500);
    
    // Grab
    setClawOpen(false);
    setHasChispin(true);
    await sleep(500);
    
    // Ascend
    await animateClawY(65, 15, 1500);
    
    // Move to tray
    await animateClawX(clawX, 85, 1000);
    
    // Drop
    setClawOpen(true);
    setHasChispin(false);
    await sleep(300);
    
    // Celebrate
    setPhase('celebrating');
    fireConfetti();
    await sleep(2000);
    
    setPhase('form');
  };

  const animateClawY = (from: number, to: number, duration: number) => {
    return new Promise<void>(resolve => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        setClawY(from + (to - from) * eased);
        if (progress < 1) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
  };

  const animateClawX = (from: number, to: number, duration: number) => {
    return new Promise<void>(resolve => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        setClawX(from + (to - from) * eased);
        if (progress < 1) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
  };

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    completeReservation(name, email);
    setPhase('success');
    fireConfetti();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`¡Soy el Fundador Nº ${String(founderNumber).padStart(4, '0')} de Chispín! #LaChispaNuncaSeApaga`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `¡Soy el Fundador Nº ${String(founderNumber).padStart(4, '0')} de Chispín! #LaChispaNuncaSeApaga`;
    if (navigator.share) {
      navigator.share({ title: 'Chispín', text, url: window.location.href });
    } else {
      handleCopy();
    }
  };

  if (!isClawMachineOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={phase === 'idle' || phase === 'form' ? closeClawMachine : undefined}
      />
      
      {/* Close button */}
      <button
        onClick={closeClawMachine}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        
        {/* PHASE: IDLE or GRABBING — The Machine */}
        {(phase === 'idle' || phase === 'grabbing') && (
          <div className="text-center">
            <h2 className="font-poppins font-black text-3xl md:text-4xl text-white mb-2">
              ¡Rescata tu Chispín!
            </h2>
            <p className="text-white/60 mb-6">Pulsa el botón cuando el gancho esté en posición</p>
            
            {/* Machine */}
            <div className="relative mx-auto w-full max-w-md h-[400px] md:h-[450px]">
              {/* Machine body */}
              <div className="absolute inset-0 rounded-3xl border-4 animate-arcade-light overflow-hidden"
                style={{ background: 'linear-gradient(180deg, rgba(107,47,184,0.2) 0%, rgba(26,26,46,0.9) 100%)' }}>
                
                {/* Glass effect */}
                <div className="absolute inset-2 rounded-2xl bg-gradient-to-b from-white/5 to-transparent" />
                
                {/* Chispines pile */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <img
                      key={i}
                      src="/images/chispin-front.png"
                      alt=""
                      className="w-14 h-14 md:w-16 md:h-16 object-contain opacity-80"
                      style={{ 
                        transform: `rotate(${Math.random() * 30 - 15}deg)`,
                        filter: hasChispin && i === 6 ? 'brightness(1.3)' : 'none',
                      }}
                    />
                  ))}
                </div>
                
                {/* Claw */}
                <div 
                  className="absolute transition-none"
                  style={{ 
                    left: `${clawX}%`, 
                    top: `${clawY}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {/* Claw line */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-[100px] bg-gradient-to-b from-transparent to-gray-400" 
                    style={{ height: `${clawY * 3}px` }} />
                  
                  {/* Claw body */}
                  <div className="relative">
                    <div className="w-8 h-6 bg-gradient-to-b from-gray-300 to-gray-500 rounded-t-lg mx-auto" />
                    <div className="flex justify-center -mt-1">
                      <div 
                        className={`w-1.5 h-8 bg-gray-400 rounded-full transition-transform duration-300 origin-top ${clawOpen ? '-rotate-12' : 'rotate-0'}`} 
                      />
                      <div 
                        className={`w-1.5 h-8 bg-gray-400 rounded-full transition-transform duration-300 origin-top ml-4 ${clawOpen ? 'rotate-12' : 'rotate-0'}`} 
                      />
                    </div>
                    {/* Grabbed Chispin */}
                    {hasChispin && (
                      <img 
                        src="/images/chispin-front.png" 
                        alt="" 
                        className="w-12 h-12 object-contain mx-auto -mt-2 animate-float"
                      />
                    )}
                  </div>
                </div>
                
                {/* Prize tray */}
                <div className="absolute bottom-0 right-0 w-24 h-16 bg-gradient-to-t from-fuego/30 to-transparent rounded-tl-2xl border-l-2 border-t-2 border-fuego/50" />
              </div>
            </div>
            
            {/* Grab Button */}
            <button
              onClick={handleGrab}
              disabled={phase !== 'idle'}
              className="btn-primary mt-6 text-lg px-12 py-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {phase === 'idle' ? '¡ATRÁPALO!' : '...'}
            </button>
          </div>
        )}

        {/* PHASE: CELEBRATING */}
        {phase === 'celebrating' && (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 text-chispa mx-auto mb-4 animate-pulse" />
            <h2 className="font-poppins font-black text-4xl md:text-5xl text-gradient-fire mb-2">
              ¡ENHORABUENA!
            </h2>
            <p className="text-white/80 text-xl">Has rescatado tu Chispín</p>
          </div>
        )}

        {/* PHASE: FORM */}
        {phase === 'form' && (
          <div className="glass rounded-3xl p-8 md:p-10 max-w-md mx-auto">
            <div className="text-center mb-6">
              <img src="/images/chispin-hero.png" alt="Chispín" className="w-24 h-24 mx-auto mb-4 animate-float" />
              <h3 className="font-poppins font-bold text-2xl text-white">Completa tu reserva</h3>
              <p className="text-white/60 text-sm mt-1">Edición Fundadores - Unidad exclusiva</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-morado focus:ring-2 focus:ring-morado/30 transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-morado focus:ring-2 focus:ring-morado/30 transition-all"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full text-center justify-center">
                CONFIRMAR RESERVA
              </button>
            </form>
            
            <p className="text-white/40 text-xs text-center mt-4">
              No se realizará ningún cargo ahora. Te avisaremos cuando esté listo.
            </p>
          </div>
        )}

        {/* PHASE: SUCCESS */}
        {phase === 'success' && founderNumber && (
          <div className="text-center py-10">
            <div className="mb-6">
              <img src="/images/chispin-hero.png" alt="Chispín" className="w-32 h-32 mx-auto animate-float" />
            </div>
            
            <h2 className="font-poppins font-black text-3xl md:text-4xl text-white mb-2">
              ¡Bienvenido a la Manada!
            </h2>
            <p className="text-white/60 mb-6">Has rescatado tu Chispín con éxito</p>
            
            <div className="glass rounded-2xl p-6 max-w-xs mx-auto mb-8 border-2 border-chispa/50">
              <span className="text-white/60 text-sm uppercase tracking-wider">Edición Fundadores</span>
              <div className="text-gradient-gold font-poppins font-black text-5xl mt-2">
                Nº {String(founderNumber).padStart(4, '0')}
              </div>
            </div>
            
            <p className="text-chispa mb-6">#LaChispaNuncaSeApaga</p>
            
            <div className="flex gap-3 justify-center">
              <button onClick={handleShare} className="btn-secondary flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
              <button onClick={handleCopy} className="btn-secondary flex items-center gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
