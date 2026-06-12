import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface ReservationContextType {
  isClawMachineOpen: boolean;
  openClawMachine: () => void;
  closeClawMachine: () => void;
  reservationCount: number;
  founderNumber: number | null;
  setFounderNumber: (num: number) => void;
  completeReservation: (name: string, email: string) => void;
}

const ReservationContext = createContext<ReservationContextType | null>(null);

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [isClawMachineOpen, setIsClawMachineOpen] = useState(false);
  const [reservationCount, setReservationCount] = useState(4753);
  const [founderNumber, setFounderNumber] = useState<number | null>(null);

  // Simulate live reservations
  useEffect(() => {
    const interval = setInterval(() => {
      setReservationCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const openClawMachine = useCallback(() => setIsClawMachineOpen(true), []);
  const closeClawMachine = useCallback(() => {
    setIsClawMachineOpen(false);
    setFounderNumber(null);
  }, []);

  const completeReservation = useCallback((_name: string, _email: string) => {
    const num = Math.floor(Math.random() * 500) + 1;
    setFounderNumber(num);
    setReservationCount(prev => prev + 1);
  }, []);

  return (
    <ReservationContext.Provider value={{
      isClawMachineOpen,
      openClawMachine,
      closeClawMachine,
      reservationCount,
      founderNumber,
      setFounderNumber,
      completeReservation,
    }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) throw new Error('useReservation must be used within ReservationProvider');
  return context;
}
