import { useState, useEffect } from 'react';
import { Menu, X, Flame } from 'lucide-react';
import { useReservation } from '@/context/ReservationContext';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const navLinks = [
  { label: 'Origen', href: '#origen' },
  { label: 'Producto', href: '#producto' },
  { label: 'Fundadores', href: '#fundadores' },
  { label: 'Comunidad', href: '#comunidad' },
  { label: 'FAQ', href: '#faq' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScrollDirection();
  const { openClawMachine } = useReservation();
  const isScrolled = scrollY > 50;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
          isScrolled 
            ? 'bg-negro/90 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
        style={{ height: isScrolled ? 60 : 72 }}
      >
        <div className="container-custom h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Flame className="w-6 h-6 text-chispa group-hover:scale-110 transition-transform" />
            <span className="font-poppins font-extrabold text-xl text-chispa tracking-tight">
              CHISPÍN
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/70 hover:text-chispa text-sm font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-chispa transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button onClick={openClawMachine} className="hidden md:block btn-primary text-xs py-2.5 px-6">
              RESERVAR
            </button>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-gris-oscuro/95 backdrop-blur-xl p-6 pt-20">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-white/80 hover:text-chispa text-lg font-medium text-left py-2 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button onClick={() => { setMobileOpen(false); openClawMachine(); }} className="btn-primary mt-4 text-center">
                RESERVAR MI CHISPÍN
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
