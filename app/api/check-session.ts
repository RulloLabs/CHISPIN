import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

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
    // Fallback: dev mode without Supabase
    return res.json({ founderNumber: Math.floor(Math.random() * 500) + 1 });
  }

  try {
    const sb = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await sb
      .from('reservations')
      .select('founder_number, name, email')
      .eq('session_id', sessionId)
      .single();

    if (error || !data) {
      return res.json({ founderNumber: Math.floor(Math.random() * 500) + 1 });
    }

    return res.json({
      founderNumber: data.founder_number,
      name: data.name,
      email: data.email,
    });
  } catch {
    return res.json({ founderNumber: Math.floor(Math.random() * 500) + 1 });
  }
}
