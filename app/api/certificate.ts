import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { generateCertificatePDF } from './lib/certificate.js';

const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '').trim();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionId = req.query.session_id as string;
  if (!sessionId) {
    return res.status(400).json({ error: 'session_id is required' });
  }

  if (!supabaseUrl || !supabaseKey) {
    console.error('[Certificate] Supabase not configured');
    return res.status(503).json({ error: 'Service unavailable' });
  }

  try {
    const sb = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await sb
      .from('reservations')
      .select('name, founder_number, created_at')
      .eq('session_id', sessionId)
      .single();

    if (error || !data) {
      console.error('[Certificate] Reservation not found:', sessionId, error?.message);
      return res.status(404).json({ error: 'Reservation not found' });
    }

    const name = data.name || 'Fundador';
    const founderId = data.founder_number || 0;
    const date = data.created_at ? new Date(data.created_at) : new Date();

    const pdfBytes = await generateCertificatePDF(name, founderId, date);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="certificado-chispin-${String(founderId).padStart(6, '0')}.pdf"`);
    res.status(200).send(Buffer.from(pdfBytes));
  } catch (err: any) {
    console.error('[Certificate] Error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
