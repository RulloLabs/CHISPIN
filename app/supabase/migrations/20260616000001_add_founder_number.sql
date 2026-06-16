-- Añade columna founder_number a la tabla de reservas
ALTER TABLE public.reservations
ADD COLUMN IF NOT EXISTS founder_number INTEGER;

-- Índice para búsqueda rápida por session_id (check-session endpoint)
CREATE INDEX IF NOT EXISTS idx_reservations_session_id
ON public.reservations (session_id);
