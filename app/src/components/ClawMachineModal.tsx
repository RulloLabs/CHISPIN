import { X } from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';

export function ClawMachineModal() {
  const { isClawMachineOpen, closeClawMachine } = useReservation();

  if (!isClawMachineOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      {/* Close button */}
      <button
        onClick={closeClawMachine}
        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors border border-white/20"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Game iframe */}
      <iframe 
        src="/juego/index.html" 
        className="w-full h-full border-none"
        title="Juego Máquina de Peluches Chispín"
        allow="fullscreen; autoplay"
      />
    </div>
  );
}
