# Chispín Landing — Technical Specification

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | DOM renderer |
| gsap | ^3.12 | Core animation engine, timelines, ScrollTrigger |
| canvas-confetti | ^1.9 | Confetti burst on claw machine win |
| react-countup | ^6.5 | Animated number counters (reservas, fundadores) |
| lucide-react | ^0.400 | Icons (check, star, heart, clock, flame, etc.) |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.4 | React Fast Refresh |
| tailwindcss | ^4.0 | Utility CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| typescript | ^5.7 | Type safety |
| @types/react | ^19.0 | React type defs |
| @types/react-dom | ^19.0 | ReactDOM type defs |

### Fonts (Google Fonts via CDN)

- Poppins (700, 800, 900)
- Inter (400, 500, 600, 700)

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| Navigation | Custom | 1 | Fixed glassmorphism bar, scroll-aware height |
| MobileMenu | Custom | 1 | Slide-in panel from right |
| Footer | Custom | 1 | Final CTA + links |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Two-col, particle canvas bg, floating Chispin |
| OrigenSection | Custom | Two-col inverted, village image, quote |
| ProblemaSection | Custom | Centered text + 3 feature cards |
| ProductoSection | Custom | 3D tilt image, thumbnail switcher, feature list |
| FundadoresSection | Custom | Founder card, progress bar, 3 benefit cards |
| MaquinaSection | Custom | Preview section + triggers modal |
| ComunidadSection | Custom | Spain SVG map, province dots, ranking bars |
| SocialSection | Custom | Masonry-style UGC grid |
| FAQSection | Custom | 6 accordion items |
| FinalCTASection | Custom | Full-viewport gradient, fireworks canvas |

### Interactive / Complex

| Component | Source | Notes |
|-----------|--------|-------|
| ClawMachineModal | Custom | Full-screen modal, 4-phase game loop |
| ClawMachineGame | Custom | Canvas or DOM-based claw animation |
| ParticleCanvas | Custom | Fixed full-page spark particles (Canvas 2D) |
| FireworksCanvas | Custom | Celebration fireworks (Canvas 2D) |
| ConfettiEffect | Custom | Wrapper around canvas-confetti |

### Reusable

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| ScrollReveal | Custom | All sections | GSAP ScrollTrigger wrapper for scroll-triggered entrance |
| TextReveal | Custom | Hero, Origen, Fundadores, FinalCTA | Char-by-char GSAP reveal |
| AnimatedCounter | react-countup | Hero, Fundadores, Comunidad | Number count-up animation |
| SectionLabel | Custom | All sections | Orange uppercase label with letter-spacing |
| GradientButton | Custom | Everywhere | Primary (fire gradient pill) + Secondary (bordered) + Ghost |
| FeatureCard | Custom | Problema, Fundadores | Glassmorphism card with icon |
| AccordionItem | Custom | FAQ | Animated height + rotate icon |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollDirection | Detect scroll up/down for navbar compression |
| useMouseTilt | 3D tilt effect on Producto image |
| useKonamiCode | Easter egg detection |
| useReducedMotion | Respect prefers-reduced-motion |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Particle canvas (global sparks) | Canvas 2D + rAF | Custom ParticleCanvas component. 40-60 circles with sinusoidal horizontal drift, upward velocity, pulsing opacity. Pause via IntersectionObserver. | Medium |
| ScrollReveal (global pattern) | GSAP + ScrollTrigger | Reusable ScrollReveal component. batch() for groups, stagger 0.1s, translateY(40px)→0 + opacity. Trigger at 20% viewport. | Low |
| TextReveal (char-by-char) | GSAP + ScrollTrigger | Split text into spans, stagger opacity+translateY per char. Used in 4 sections. | Medium |
| Hero entrance sequence | GSAP timeline | Sequential timeline: badge scale→headline TextReveal→image fade-in from right→counter animate→CTAs fade-up. Total ~2.5s. | Medium |
| Chispín float | CSS animation | translateY(-10px↔10px), 3s infinite ease-in-out. Pure CSS keyframes. | Low |
| Navbar scroll compress | GSAP | ScrollTrigger on body, toggle class for 72px→60px transition. useScrollDirection hook. | Low |
| Producto 3D tilt | Custom hook | useMouseTilt: track mouse position over image, map to rotateX(±10°) rotateY(±10°) with lerp smoothing. | Medium |
| Producto image switch | Framer Motion | AnimatePresence with fade transition between 4 product views on thumbnail click. | Low |
| Claw machine game loop | GSAP timeline | Multi-phase timeline: (1) claw oscillating left-right, (2) stop + descend 1.5s, (3) grab close, (4) ascend 1.5s, (5) move to tray + drop. User input triggers phase transition. | High |
| Arcade lights | CSS animation | Border-color cycling through purple/orange/yellow, 0.5s intervals. Pure CSS keyframes. | Low |
| Confetti celebration | canvas-confetti | Two rafagas: 150 particles, custom colors, 3s total. Triggered on claw drop completion. | Low |
| Fireworks canvas | Canvas 2D + rAF | Custom FireworksCanvas. Particles explode from point, gravity-affected fall, fade out. Triggered during celebration + ambient in FinalCTA. | Medium |
| Counter animations | react-countup | AnimatedCounter wrapper. Duration 2s, easing. Triggered on scroll into view. | Low |
| Progress bar fill | GSAP + ScrollTrigger | Animate width from 0% to 95% on scroll trigger. | Low |
| FAQ accordion | Framer Motion | AnimatePresence for height animation, CSS rotate for chevron. | Low |
| Map province dots | GSAP + ScrollTrigger | Staggered fade-in + scale for each dot, sequential 0.1s delay. | Low |
| Ranking bars width | GSAP + ScrollTrigger | Animate width from 0 to final value on scroll trigger. | Low |
| Easter egg: Konami | useKonamiCode hook | Key sequence detection (↑↑↓↓←→←→BA), then trigger golden Chispín float animation. | Low |
| Easter egg: tail spark | React state | onDoubleClick on product image tail area, trigger mini particle burst locally. | Low |
| Mobile menu slide | Framer Motion | AnimatePresence, slide from right with backdrop fade. | Low |

---

## State & Logic Plan

### Claw Machine State Machine

The claw machine is the most complex interactive element. Managed via a 4-phase state machine within ClawMachineModal:

```
PHASE_IDLE     → Claw oscillating, waiting for user click
PHASE_GRABBING → User clicked: claw stops, descends, grabs
PHASE_CELEBRATE → Claw rises, drops Chispín → trigger confetti + fireworks
PHASE_FORM     → Show reservation form (name + email)
PHASE_SUCCESS  → Confirmation screen with founder number
```

Transitions are one-way (no going back). Each phase drives the visual state of ClawMachineGame and the overlay content.

### Global State (React Context)

Minimal global state — most is local:

- `isClawMachineOpen: boolean` — Controls modal open/close
- `reservationCount: number` — Global counter (simulated real-time with random increments)
- `founderNumber: number | null` — Assigned on successful reservation

### Reservation Counter Simulation

- Start at 4753 (from design)
- Every 30s, add random(1,3) to simulate live reservations
- Displayed across Hero, Fundadores, Comunidad sections
- All read from shared context

### Founder Number Assignment

- On successful form submission: generate random int 1–5000
- Format as "Nº XXXX" with zero-padding
- Store in context for display in success screen

### Product Image View State

- Local state in ProductoSection: `activeView: 'front' | 'back' | 'side' | 'detail'`
- Thumbnail click updates state, AnimatePresence handles crossfade

---

## Other Key Decisions

### Claw Machine Rendering: DOM vs Canvas

Use DOM-based rendering, not Canvas. The machine is a styled container with absolutely-positioned elements (claw as div with transforms, Chispines as repeated img elements). Reasons:

- Simpler integration with GSAP timelines (GSAP excels at DOM animation)
- Easier responsive behavior
- The visual complexity is low enough for DOM (moving rectangle + image swap)
- Canvas would add unnecessary complexity for this use case

### Spain Map: SVG inline

The Spain map is an inline SVG with province paths. This allows:
- Direct styling of provinces via CSS
- Interactive dots positioned with percentage coordinates
- No external image dependency for the map structure

### Particle Strategy: Two Separate Canvas Instances

1. **ParticleCanvas** — Fixed full-page, low-opacity sparks (z-index: -1). Runs continuously.
2. **FireworksCanvas** — Only rendered during celebration phases and in FinalCTA. Positioned absolutely within those containers.

Both use Canvas 2D with requestAnimationFrame. ParticleCanvas pauses when not visible via IntersectionObserver.

### Sound

No audio implementation in v1. The design references "sonido de premio" but audio requires user interaction context and adds complexity. If needed later, Web Audio API with user-gated initialization.

### Image Assets Strategy

- Chispín plush images: Generate as PNG with transparent background
- Claw machine, village scene, certificate: Generate as opaque images
- Spain map: SVG inline (no generation needed)
- UGC social images: Use placeholder gradient cards with user avatars (no real UGC to generate)

### Responsive Breakpoints

- Mobile-first approach with Tailwind
- Key breakpoints: md(768px), lg(1024px), xl(1280px)
- Claw machine: Simplified layout on mobile (smaller machine, fewer particles)
