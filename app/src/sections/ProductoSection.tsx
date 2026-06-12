import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Image as ImageIcon,
  Video,
  Music,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Check,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Chispin3D } from '@/components/Chispin3D';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const galleryViews = [
  { id: 'front', label: 'Frontal',  img: '/images/chispin-front.png' },
  { id: 'side',  label: 'Lateral',  img: '/images/chispin-side.png'  },
  { id: 'back',  label: 'Trasera',  img: '/images/chispin-back.png'  },
  { id: 'box',   label: 'Caja',     img: '/images/chispin-box.png'   },
];

const videos = [
  { id: 'vid1', label: 'Presentación',     path: '/video.mp4'      },
  { id: 'vid2', label: 'Detalles Peluche', path: '/video (1).mp4'  },
  { id: 'vid3', label: 'Experiencia Peña', path: '/video (2).mp4'  },
];

const features = [
  { label: '18 cm de altura',              icon: '📏' },
  { label: 'Peluche ultra suave',          icon: '🧸' },
  { label: 'Bordados premium',             icon: '✨' },
  { label: 'Cola de fuego característica', icon: '🔥' },
  { label: 'Pañuelo icónico',              icon: '🎀' },
  { label: 'Edición Fundadores numerada',  icon: '🏅' },
];

/* ─── Parallax Tilt (mouse/gyro on desktop info panel) ───────────────────── */

function useParallaxTilt(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      el.style.transform = `perspective(900px) rotateY(${dx * 3}deg) rotateX(${-dy * 2}deg)`;
    };
    const reset = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', handle);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', handle);
      el.removeEventListener('mouseleave', reset);
    };
  }, [ref]);
}

/* ─── Component ──────────────────────────────────────────────────────────── */

type ViewMode = '3d' | 'gallery' | 'video';

export function ProductoSection() {
  const [viewMode, setViewMode]         = useState<ViewMode>('3d');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [videoIndex, setVideoIndex]     = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVolume, setAudioVolume]   = useState(0.45);
  const [touchStartX, setTouchStartX]   = useState<number | null>(null);

  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);

  useParallaxTilt(infoCardRef);

  // Cleanup audio on unmount
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  /* ── Audio ─────────────────────────────────────────────────────────────── */

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/Brisa de Cobre.mp3');
      audioRef.current.loop = true;
    }
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.volume = audioVolume;
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  }, [isPlayingAudio, audioVolume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setAudioVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  /* ── Gallery navigation ─────────────────────────────────────────────────── */

  const nextSlide = useCallback(() => setGalleryIndex(p => (p + 1) % galleryViews.length), []);
  const prevSlide = useCallback(() => setGalleryIndex(p => (p - 1 + galleryViews.length) % galleryViews.length), []);

  /* ── Touch swipe for gallery ────────────────────────────────────────────── */

  const onTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 45) { dx < 0 ? nextSlide() : prevSlide(); }
    setTouchStartX(null);
  };

  /* ──────────────────────────────────────────────────────────────────────── */

  return (
    <section id="producto" className="relative overflow-hidden producto-section-bg">

      {/* ── Full-bleed layered background ───────────────────────────────── */}
      {/* Fire texture */}
      <div
        className="absolute inset-0 bg-cover bg-bottom opacity-20 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: 'url("/images/ChatGPT Image 11 jun 2026, 22_13_08.png")' }}
      />
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0720] via-[#0f0a1e] to-[#080418] pointer-events-none" />
      {/* Radial purple/orange glows */}
      <div
        className="absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        className="absolute -right-32 bottom-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10 py-20 md:py-28 lg:py-32">

        {/* ── Section header ────────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-chispa border border-chispa/30 bg-chispa/5 mb-4">
              El Peluche
            </span>
            <h2 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase italic leading-tight mb-3">
              Conócelo en{' '}
              <span className="text-gradient-fire">todos los ángulos</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto">
              Vista 3D interactiva, multimedia real y galería detallada.
            </p>

            {/* ── Audio pill ────────────────────────────────────────────── */}
            <div className="mt-5 inline-flex items-center gap-3 rounded-full px-4 py-2 audio-pill">
              <button
                id="toggle-ambient-audio"
                onClick={toggleAudio}
                aria-label={isPlayingAudio ? 'Pausar música' : 'Reproducir música'}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-90"
                style={{ background: 'linear-gradient(135deg,#FF7A00,#FFC83D)' }}
              >
                {isPlayingAudio
                  ? <Pause className="w-3.5 h-3.5 text-negro" />
                  : <Play  className="w-3.5 h-3.5 fill-negro text-negro" />}
              </button>
              <div className="flex items-center gap-2">
                <Music className={`w-3.5 h-3.5 text-chispa shrink-0 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                <span className="text-[12px] text-white/65 font-semibold hidden sm:inline">Brisa de Cobre</span>
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={audioVolume}
                  onChange={handleVolumeChange}
                  aria-label="Volumen"
                  className="w-14 sm:w-20 accent-chispa h-1 rounded-lg appearance-none cursor-pointer bg-white/20"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Main grid ─────────────────────────────────────────────────── */}
        {/* ── Main grid ─────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── LEFT: Info ── */}
          <div className="lg:col-span-5 order-2 lg:order-1 lg:pr-6">
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col text-left">
                <h3 className="font-poppins font-black text-4xl md:text-5xl text-white uppercase italic mb-2 tracking-wide leading-none">
                  EL PELUCHE
                </h3>
                <p className="text-white/50 text-sm md:text-base mb-6 leading-relaxed">
                  Cada detalle cuenta una historia. 18 cm de pura ternura española. Cada Chispín Edición Fundadores viene numerado y con certificado de autenticidad.
                </p>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#ff7a00] shrink-0" />
                      <span className="text-white/80 text-sm md:text-base font-semibold">
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  id="producto-reserva-cta"
                  onClick={() => setViewMode('3d')}
                  className="btn-primary w-fit text-sm px-8 py-4 uppercase font-poppins font-black tracking-widest active:scale-[0.97] rounded-xl"
                >
                  VERLO DESDE TODOS LOS ÁNGULOS
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* ── RIGHT: Viewer ── */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ScrollReveal delay={0.1}>

              {/* Mode tabs */}
              <div
                className="inline-flex rounded-xl p-1 gap-0.5 mb-4"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {([
                  { key: '3d'      as ViewMode, label: 'Vista 3D', Icon: Box       },
                  { key: 'gallery' as ViewMode, label: 'Galería',  Icon: ImageIcon },
                  { key: 'video'   as ViewMode, label: 'Vídeo',    Icon: Video     },
                ] as const).map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    id={`viewer-tab-${key}`}
                    onClick={() => setViewMode(key)}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      viewMode === key
                        ? 'bg-gradient-to-r from-chispa to-amber-400 text-negro shadow-lg'
                        : 'text-white/50 hover:text-white active:scale-95'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{label}</span>
                  </button>
                ))}
              </div>

              {/* VIEWER BOX */}
              <div
                id="producto-viewer"
                className="relative w-full rounded-2xl overflow-hidden viewer-box"
                style={{ height: 'clamp(320px, 55vw, 560px)' }}
              >
                {/* Inner glow frame */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 viewer-frame" />

                {/* ── 3-D ─────────────────────────────────────────────── */}
                {viewMode === '3d' && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 viewer-3d-bg" />
                    <Chispin3D
                      showControls
                      autoRotateDefault
                      lightPreset="studio"
                      transparentBg
                    />
                    <div className="absolute top-3 right-3 z-20 hidden sm:flex md:hidden items-center gap-1.5 px-2 py-1 rounded-full text-[10px] text-violet-300/80 border border-violet-400/20"
                      style={{ background: 'rgba(10,5,25,0.75)', backdropFilter: 'blur(8px)' }}>
                      <Smartphone className="w-3 h-3" />
                      Inclina el móvil
                    </div>
                  </div>
                )}

                {/* ── Gallery ─────────────────────────────────────────── */}
                {viewMode === 'gallery' && (
                  <div
                    className="absolute inset-0 flex flex-col bg-[#0b0720]"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                  >
                    <div className="flex-1 relative flex items-center justify-around gap-2 p-5 overflow-hidden">
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,122,0,0.1) 0%, transparent 80%)' }}
                      />
                      
                      {/* Desktop layout: 3 side-by-side */}
                      <div className="hidden sm:flex items-center justify-around w-full h-full gap-4 px-4">
                        {galleryViews.slice(0, 3).map((view) => (
                          <div key={view.id} className="flex-1 flex flex-col items-center justify-center h-full max-h-[400px] relative group">
                            <img
                              src={view.img}
                              alt={view.label}
                              className="max-h-[85%] max-w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                              draggable={false}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Mobile layout: single */}
                      <div className="flex sm:hidden items-center justify-center w-full h-full relative">
                        <img
                          key={galleryIndex}
                          src={galleryViews[galleryIndex].img}
                          alt={galleryViews[galleryIndex].label}
                          className="max-h-[85%] max-w-full object-contain drop-shadow-2xl gallery-img-reveal"
                          draggable={false}
                        />
                        <button onClick={prevSlide} aria-label="Anterior"
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-white/60 bg-black/40 backdrop-blur-sm">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={nextSlide} aria-label="Siguiente"
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-white/60 bg-black/40 backdrop-blur-sm">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Arrow Navigation and Dots */}
                    <div className="flex items-center justify-between px-6 py-3 border-t border-white/5 bg-black/20">
                      <button onClick={prevSlide} className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 text-white/50 hover:text-white flex items-center justify-center transition-all">
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex gap-2.5">
                        {galleryViews.slice(0, 3).map((_, i) => (
                          <span 
                            key={i} 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              i === galleryIndex ? 'bg-chispa w-4' : 'bg-white/20'
                            }`} 
                          />
                        ))}
                      </div>

                      <button onClick={nextSlide} className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 text-white/50 hover:text-white flex items-center justify-center transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Video ───────────────────────────────────────────── */}
                {viewMode === 'video' && (
                  <div className="absolute inset-0 flex flex-col bg-black">
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                      <video
                        key={videoIndex}
                        src={videos[videoIndex].path}
                        controls
                        autoPlay
                        playsInline
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex gap-2 p-2.5 justify-center bg-negro/90 border-t border-white/5 overflow-x-auto scrollbar-hide">
                      {videos.map((vid, idx) => (
                        <button
                          key={vid.id}
                          onClick={() => setVideoIndex(idx)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                            idx === videoIndex
                              ? 'bg-chispa text-negro shadow-md'
                              : 'bg-white/6 text-white/55 hover:bg-white/12 hover:text-white'
                          }`}
                        >
                          {vid.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Hint below viewer */}
              <p className="text-center text-[11px] text-white/25 mt-2.5 h-4 leading-none">
                {viewMode === '3d'      && '🖱️ Arrastra · Pellizca · Inclina'}
                {viewMode === 'gallery' && `${galleryIndex + 1} / ${galleryViews.length} · ${galleryViews[galleryIndex].label}`}
                {viewMode === 'video'   && `▶ ${videos[videoIndex].label}`}
              </p>

            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* CSS keyframes & scoped styles */}
      <style>{`
        .audio-pill {
          background: rgba(15,10,30,0.65);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .viewer-box {
          background: linear-gradient(145deg, rgba(16,9,35,0.98) 0%, rgba(8,4,20,0.99) 100%);
          border: 1px solid rgba(255,122,0,0.12);
          box-shadow:
            0 0 80px rgba(255,122,0,0.06),
            0 0 40px rgba(139,92,246,0.05),
            inset 0 0 60px rgba(0,0,0,0.4);
        }
        .viewer-frame {
          border: 1px solid rgba(255,255,255,0.055);
          border-radius: 1rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.07);
          pointer-events: none;
        }
        .viewer-3d-bg {
          background: radial-gradient(ellipse 80% 70% at 50% 60%,
            rgba(139,92,246,0.08) 0%,
            rgba(255,122,0,0.06) 50%,
            transparent 80%);
        }
        .info-card {
          background: rgba(255,255,255,0.032);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        @keyframes gallery-reveal {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        .gallery-img-reveal {
          animation: gallery-reveal 0.3s ease forwards;
        }
        .chispin-sparkle {
          position: absolute;
          bottom: -10px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,180,50,0.7);
          animation: sparkle-rise linear infinite;
        }
        @keyframes sparkle-rise {
          0%   { transform: translateY(0)   scale(1);   opacity: 0.8; }
          80%  { transform: translateY(-180px) scale(1.5); opacity: 0.5; }
          100% { transform: translateY(-220px) scale(0);   opacity: 0; }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.2s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, 0); }
          50%       { transform: translate(-50%, -6px); }
        }
        /* Mobile: full-width info card, reduced padding */
        @media (max-width: 1023px) {
          .info-card {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: rgba(255,255,255,0.04);
          }
        }
        /* Swipe cursor on gallery */
        [data-gallery-touch] { cursor: grab; }
        [data-gallery-touch]:active { cursor: grabbing; }
      `}</style>
    </section>
  );
}
