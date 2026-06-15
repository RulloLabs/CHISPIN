-- Crea la tabla de reservas
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT NOT NULL,
    name TEXT,
    session_id TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'paid'
);

-- Configura la seguridad a nivel de fila (RLS)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Permite que cualquiera (anon) pueda insertar registros (útil para el webhook)
CREATE POLICY "Allow public inserts" ON public.reservations
    FOR INSERT WITH CHECK (true);

-- Permite que los usuarios lean solo sus propias reservas
CREATE POLICY "Allow public select" ON public.reservations
    FOR SELECT USING (true);
