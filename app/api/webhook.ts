import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('[Webhook] STRIPE_SECRET_KEY is required');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-05-27.dahlia',
});

const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '').trim();

if (!process.env.RESEND_API_KEY) {
  console.error('[Webhook] RESEND_API_KEY is not configured ÔÇö confirmation emails will not be sent');
}

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

  // Validate critical configuration at runtime
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('[Webhook] STRIPE_WEBHOOK_SECRET is not configured');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('[Webhook] STRIPE_SECRET_KEY is not configured');
    return res.status(500).json({ error: 'Stripe secret key not configured' });
  }

  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

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

    console.log(`[Webhook] Ô£à Payment completed ÔÇö ${name} <${email}> | Session: ${sessionId}`);

    if (!email) {
      console.error('[Webhook] No email in session ÔÇö skipping reservation save and email');
    }

    // Assign sequential founder number and save reservation
    let founderNumber = 0;
    if (supabaseUrl && supabaseKey) {
      try {
        const sb = createClient(supabaseUrl, supabaseKey);

        // Get next founder number
        const { count } = await sb
          .from('reservations')
          .select('*', { count: 'exact', head: true });
        founderNumber = (count ?? 0) + 1;

        const { error } = await sb.from('reservations').insert({
          email,
          name,
          session_id: sessionId,
          status: 'paid',
          founder_number: founderNumber,
        });
        if (error) {
          console.error('[Webhook] Supabase insert error:', error.message);
        } else {
          console.log(`[Webhook] Reservation saved ÔÇö founder #${founderNumber}`);
        }
      } catch (err: any) {
        console.error('[Webhook] Supabase error:', err.message);
      }
    } else {
      console.warn('[Webhook] Supabase not configured ÔÇö reservation not persisted');
    }

    // Build certificate download URL
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const certificateUrl = `${baseUrl}/api/certificate?session_id=${sessionId}`;

    // Save certificate_url to reservation
    if (supabaseUrl && supabaseKey && email) {
      try {
        const sb = createClient(supabaseUrl, supabaseKey);
        await sb.from('reservations').update({ certificate_url: certificateUrl }).eq('session_id', sessionId);
      } catch (err: any) {
        console.error('[Webhook] Failed to save certificate_url:', err.message);
      }
    }

    // Send confirmation email
    if (resend) {
      if (email) {
        const milestoneLabel = founderNumber === 1 ? '­ƒææ Rey Fundador' : '';
        const milestoneHtml = milestoneLabel
          ? `<p style="color: #FFB800; font-size: 16px; margin-top: 8px;">${milestoneLabel}</p>`
          : '';
        try {
          await resend.emails.send({
            from: 'Chisp├¡n <hola@chispin.com>',
            to: email,
            subject: '­ƒÄë ┬íHas rescatado a tu Chisp├¡n!',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #FFB800;">┬íBienvenido a la Manada, ${name}!</h1>
                <p>Tu Chisp├¡n Edici├│n Fundadores est├í reservado.</p>
                <p style="font-size: 24px; font-weight: bold;">N┬║ ${String(founderNumber).padStart(4, '0')}</p>
                ${milestoneHtml}
                <p style="margin: 24px 0;">
                  <a href="${certificateUrl}"
                     style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FFB800, #FF6B00); color: #1A0040; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">
                    ­ƒôä DESCARGAR CERTIFICADO PDF
                  </a>
                </p>
                <p style="color: #aaa; font-size: 14px;">Recibir├ís un email con los detalles de env├¡o pronto.</p>
                <hr style="border-color: #333;" />
                <p style="color: #888; font-size: 12px;">Chisp├¡n ┬À La Chispa Nunca Se Apaga</p>
              </div>
            `,
          });
          console.log('[Webhook] Confirmation email sent');
        } catch (err: any) {
          console.error('[Webhook] Resend email error:', err.message);
        }
      } else {
        console.warn('[Webhook] No email address ÔÇö confirmation email skipped');
      }
    } else {
      console.warn('[Webhook] RESEND_API_KEY not configured ÔÇö confirmation email skipped');
    }
  }

  if (event.type === 'checkout.session.expired') {
    console.log('[Webhook] Session expired:', event.data.object.id);
  }

  return res.status(200).json({ received: true });
}
