import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Required: disable body parsing so Stripe can verify the raw body signature
export const config = {
  api: {
    bodyParser: false,
  },
};

function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    console.error('[Webhook] STRIPE_WEBHOOK_SECRET is not set');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error('[Webhook] Signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  console.log(`[Webhook] Event received: ${event.type}`);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email || session.metadata?.email || '';
    const name = session.metadata?.name || '';
    const sessionId = session.id;
    const founderId = parseInt(session.metadata?.founderId || '0', 10);

    console.log(`[Webhook] ✅ Payment completed — ${name} <${email}> | Session: ${sessionId}`);

    // Save reservation to Supabase
    if (supabaseUrl && supabaseKey) {
      try {
        const sb = createClient(supabaseUrl, supabaseKey);
        const { error } = await sb.from('reservations').insert({
          email,
          name,
          session_id: sessionId,
          status: 'paid',
          founder_number: founderId || null,
        });
        if (error) {
          console.error('[Webhook] Supabase insert error:', error.message);
        } else {
          console.log('[Webhook] Reservation saved to Supabase');
        }
      } catch (err: any) {
        console.error('[Webhook] Supabase error:', err.message);
      }
    }

    // Send confirmation email
    if (resend && email) {
      try {
        await resend.emails.send({
          from: 'Chispín <hola@chispin.com>',
          to: email,
          subject: '🎉 ¡Has rescatado a tu Chispín!',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #FFB800;">¡Bienvenido a la Manada, ${name}!</h1>
              <p>Tu Chispín Edición Fundadores está reservado.</p>
              ${founderId ? `<p style="font-size: 24px; font-weight: bold;">Nº ${String(founderId).padStart(4, '0')}</p>` : ''}
              <p>Recibirás un email con los detalles de envío pronto.</p>
              <hr style="border-color: #333;" />
              <p style="color: #888; font-size: 12px;">Chispín · La Chispa Nunca Se Apaga</p>
            </div>
          `,
        });
        console.log('[Webhook] Confirmation email sent');
      } catch (err: any) {
        console.error('[Webhook] Resend email error:', err.message);
      }
    }
  }

  if (event.type === 'checkout.session.expired') {
    console.log('[Webhook] Session expired:', event.data.object.id);
  }

  return res.status(200).json({ received: true });
}
