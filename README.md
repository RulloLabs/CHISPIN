# CHISPÍN — Landing Page + Juego 3D

> 🕹️ Máquina de garra arcade interactiva con pago Stripe y edición Fundadores.

## Stack
- **Frontend:** Vite + React 19 + TypeScript + Tailwind CSS
- **3D:** Three.js + @react-three/fiber + @react-three/drei + GSAP
- **Pagos:** Stripe Checkout + Webhooks
- **Backend:** Supabase (reservas) + Resend (emails)
- **Deploy:** Vercel (SPA + Serverless Functions)

## Estructura
```
app/                        ← Aplicación principal
├── src/
│   ├── components/game/    ← Juego 3D (escena, HUD, pantallas)
│   ├── pages/              ← Home, Success
│   ├── sections/           ← Landing sections
│   └── context/            ← ReservationContext (Supabase + estado global)
├── api/                    ← Vercel Serverless Functions
│   ├── create-checkout-session.ts  ← Stripe Checkout (39€)
│   ├── webhook.ts                   ← Stripe events + Supabase + Resend
│   └── check-session.ts             ← Verificar pago post-checkout
├── public/
│   ├── models/             ← 3D GLB (gancho.glb, chispin.glb)
│   └── images/             ← SVGs máquina, social placeholders
└── supabase/migrations/    ← SQL migrations
```

## Setup local
```bash
cd app
cp ../.env.example .env
npm install
npm run dev
```

## Variables de entorno
| Variable | Uso |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe server |
| `STRIPE_WEBHOOK_SECRET` | Webhook verification |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Webhook (bypass RLS) |
| `RESEND_API_KEY` | Confirmation emails |
| `NEXT_PUBLIC_URL` | App base URL |

## Deploy
```bash
cd app
vercel --prod
```
