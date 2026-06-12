import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Chispín - Edición Fundadores',
              description: 'Unidad exclusiva de la primera generación de Chispín',
              images: [`${process.env.NEXT_PUBLIC_URL || 'https://app-blue-theta-23.vercel.app'}/images/chispin-hero.png`],
            },
            unit_amount: 3900,
          },
          quantity: 1,
        },
      ],
      metadata: {
        name: name || '',
        email,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://app-blue-theta-23.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://app-blue-theta-23.vercel.app'}/`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return res.status(500).json({ error: err.message });
  }
}
