import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

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
    console.error('[CheckSession] Supabase not configured');
    return res.status(503).json({ error: 'Service unavailable. Please try again later.' });
  }

  try {
    const sb = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await sb
      .from('reservations')
      .select('founder_number, name, email')
      .eq('session_id', sessionId)
      .single();

    if (error || !data) {
      console.error('[CheckSession] Session not found:', sessionId, error?.message);
      return res.status(404).json({ error: 'Session not found' });
    }

    return res.json({
      founderNumber: data.founder_number,
      name: data.name,
      email: data.email,
    });
  } catch (err: any) {
    console.error('[CheckSession] Unexpected error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
