# Chispín — La Chispa Nunca Se Apaga

Experiencia interactiva de máquina de gancho 3D para la reserva del peluche Chispín (Edición Fundadores).

## Stack
- Three.js r128 (CDN) — escena 3D con GLTFLoader
- GSAP 3 (CDN) — animaciones fluidas
- HTML/CSS/JS vanilla — sin bundler, deploy directo

## Estructura
```
chispin/
├── index.html          ← App completa (SPA)
├── vercel.json         ← Config headers/cache
├── public/
│   ├── models/
│   │   ├── chispin.glb   ← Modelo Chispín original (Meshy)
│   │   ├── plush.glb     ← Versión plush
│   │   └── arcade.glb    ← Máquina arcade
│   └── assets/
│       ├── certificate.jpg
│       ├── spain-map.png
│       ├── victory.mp4
│       └── machine-bg.png
```

## Deploy

### Vercel (automático vía GitHub)
1. Push a `main` en GitHub
2. Vercel detecta el proyecto y despliega

### Manual
```bash
npx vercel --prod
```

## Flujo de experiencia
1. Loading → carga modelos GLB
2. Intro → selección de modelo + CTA
3. Máquina 3D → 3 intentos, timer regresivo (60/45/30s)
4. Near-miss en fallos → captura garantizada en último intento
5. Vídeo victoria
6. Certificado fundador con número único
7. Mapa nacional con provincia +1
8. Compartir en redes

## Rareza
- Normal: base
- Festivalero: 1/250
- Dorado: 1/500  
- Fuego Azul: 1/1000
- Unidad ×100: Chispín Especial (captura en intento 1)
