import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ReservationContextType {
  isClawMachineOpen: boolean;
  openClawMachine: () => void;
  closeClawMachine: () => void;
  reservationCount: number;
  founderNumber: number | null;
  setFounderNumber: (num: number) => void;
  completeReservation: (name: string, email: string) => Promise<void>;
}

const ReservationContext = createContext<ReservationContextType | null>(null);

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [isClawMachineOpen, setIsClawMachineOpen] = useState(false);
  const [reservationCount, setReservationCount] = useState(0);
  const [founderNumber, setFounderNumber] = useState<number | null>(null);

  // Fetch initial count from Supabase
  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true });
      if (count !== null) {
        setReservationCount(count + 247); // +247 como offset inicial base
      }
    };
    fetchCount();

    // Set up realtime subscription
    const subscription = supabase
      .channel('reservations-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reservations' }, () => {
        setReservationCount(prev => prev + 1);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openClawMachine = useCallback(() => setIsClawMachineOpen(true), []);
  const closeClawMachine = useCallback(() => {
    setIsClawMachineOpen(false);
    setFounderNumber(null);
  }, []);

  const completeReservation = useCallback(async (name: string, email: string) => {
    // Generar un número de fundador
    const num = reservationCount + 1;
    
    // Insert into Supabase
    const { error } = await supabase.from('reservations').insert([
      { name, email, founder_number: num, status: 'pending' }
    ]);
    
    if (error) {
      console.error('Error saving reservation:', error);
      return;
    }

    setFounderNumber(num);
  }, [reservationCount]);

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
