import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';

interface ReservationContextType {
  isClawMachineOpen: boolean;
  openClawMachine: () => void;
  closeClawMachine: () => void;
  reservationCount: number | null;
  founderNumber: number | null;
  setFounderNumber: (num: number) => void;
  completeReservation: (name: string, email: string) => Promise<void>;
}

const ReservationContext = createContext<ReservationContextType | null>(null);

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [isClawMachineOpen, setIsClawMachineOpen] = useState(false);
  const [reservationCount, setReservationCount] = useState<number | null>(null);
  const [founderNumber, setFounderNumber] = useState<number | null>(null);

  // Fetch initial count from Supabase
  useEffect(() => {
    const fetchCount = async () => {
      const sb = getSupabase();
      if (!sb) {
        return;
      }
      const { count } = await sb
        .from('reservations')
        .select('*', { count: 'exact', head: true });
      if (count !== null) {
        setReservationCount(count);
      }
    };
    fetchCount();

    // Set up realtime subscription
    const sb = getSupabase();
    if (sb) {
      const subscription = sb
        .channel('reservations-channel')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reservations' }, () => {
          setReservationCount(prev => prev === null ? null : prev + 1);
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const openClawMachine = useCallback(() => setIsClawMachineOpen(true), []);
  const closeClawMachine = useCallback(() => {
    setIsClawMachineOpen(false);
    setFounderNumber(null);
  }, []);

  const completeReservation = useCallback(async (name: string, email: string) => {
    const sb = getSupabase();
    if (!sb) {
      console.error('Supabase not configured ÔÇö reservation not saved');
      return;
    }
    const { data, error } = await sb
      .from('reservations')
      .insert([{ name, email, status: 'pending' }])
      .select('founder_number')
      .single();
    if (error) {
      console.error('Error saving reservation:', error);
      return;
    }
    if (data?.founder_number) {
      setFounderNumber(data.founder_number);
    }
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
