import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Historia', href: '#origen' },
  { label: 'El Peluche', href: '#producto' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'La Manada', href: '#comunidad' },
  { label: 'FAQ', href: '#faq' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openClawMachine } = useReservation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080012]/95 backdrop-blur-xl shadow-lg shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-[68px]">

          {/* Logo */}
          <a href="#hero" onClick={e => { e.preventDefault(); scrollTo('#hero'); }}
            className="flex items-center gap-2 group">
            <img src="/images/logo.png" alt="Chispín" className="h-8 w-auto" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/70 hover:text-white text-sm font-nunito font-700 uppercase tracking-wider transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#FFB800] transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={openClawMachine}
              className="hidden md:flex btn-primary text-xs py-2.5 px-5"
            >
              🔥 Acepta tu Chispín
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#0E0030]/98 backdrop-blur-xl p-6 pt-20 flex flex-col gap-5">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/80 hover:text-[#FFB800] font-nunito font-bold text-base uppercase tracking-wider text-left py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); openClawMachine(); }}
              className="btn-primary mt-4 w-full"
            >
              🔥 Acepta tu Chispín
            </button>
          </div>
        </div>
      )}
    </>
  );
}
