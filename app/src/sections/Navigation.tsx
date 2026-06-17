import { useState, useEffect } from 'react';
import { Home, BookOpen, Gift, Gamepad2, Users, HelpCircle, Menu, X } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useReservation } from '@/context/ReservationContext';

const navLinks = [
  { label: 'Inicio', href: '#hero', icon: Home },
  { label: 'Historia', href: '#origen', icon: BookOpen },
  { label: 'El Peluche', href: '#producto', icon: Gift },
  { label: 'Experiencia', href: '#experiencia', icon: Gamepad2 },
  { label: 'La Manada', href: '#comunidad', icon: Users },
  { label: 'FAQ', href: '#faq', icon: HelpCircle },
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
            <img src="/images/logo.png" alt="Chisp├¡n" className="h-8 w-auto" />
          </a>

          {/* Desktop Nav */}
          <Tooltip.Provider delayDuration={200}>
            <div className="hidden md:flex items-center gap-3">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <Tooltip.Root key={link.href}>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="p-2.5 text-white/60 hover:text-[#FFB800] transition-colors duration-200 relative group"
                        aria-label={link.label}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FFB800] transition-all duration-300 group-hover:w-full rounded-full" />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="bottom"
                        sideOffset={6}
                        className="bg-[#2D0A5C] text-white text-xs font-nunito font-bold px-3 py-1.5 rounded-md shadow-lg"
                      >
                        {link.label}
                        <Tooltip.Arrow className="fill-[#2D0A5C]" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                );
              })}
            </div>
          </Tooltip.Provider>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={openClawMachine}
              className="hidden md:flex btn-primary text-xs py-2.5 px-5"
            >
              ­ƒöÑ Acepta tu Chisp├¡n
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Men├║"
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
              ­ƒöÑ Acepta tu Chisp├¡n
            </button>
          </div>
        </div>
      )}
    </>
  );
}
