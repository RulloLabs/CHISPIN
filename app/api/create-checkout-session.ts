import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { rateLimit } from './_rate-limit.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

const APP_URL =
  process.env.NEXT_PUBLIC_URL ||
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` ||
  'https://chispin.vercel.app';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', APP_URL);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limit by IP
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ?? 'unknown';
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' });
  }

  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      locale: 'es',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Chisp├¡n ÔÇö Edici├│n Fundadores',
              description: 'Unidad exclusiva numerada de la primera generaci├│n. Env├¡o garantizado.',
              images: [`${APP_URL}/images/chispin-hero.png`],
            },
            unit_amount: 3900, // Ôé¼39.00
          },
          quantity: 1,
        },
      ],
      metadata: {
        name: name || '',
        email,
        edition: 'fundadores',
      },
      success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('[Stripe] create-checkout-session error:', err);
    return res.status(500).json({ error: err.message });
  }
}
