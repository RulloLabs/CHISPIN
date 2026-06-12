import { ReservationProvider } from '@/context/ReservationContext';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import { ClawMachineModal } from '@/components/ClawMachineModal';
import { Navigation } from '@/sections/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { OrigenSection } from '@/sections/OrigenSection';
import { ProblemaSection } from '@/sections/ProblemaSection';
import { ProductoSection } from '@/sections/ProductoSection';
import { FundadoresSection } from '@/sections/FundadoresSection';
import { MaquinaSection } from '@/sections/MaquinaSection';
import { ComunidadSection } from '@/sections/ComunidadSection';
import { SocialSection } from '@/sections/SocialSection';
import { FAQSection } from '@/sections/FAQSection';
import { FinalCTASection } from '@/sections/FinalCTASection';
import { useKonamiCode } from '@/hooks/useKonamiCode';

function KonamiOverlay() {
  const activated = useKonamiCode();
  if (!activated) return null;
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center">
      <div className="text-center animate-pulse-golden">
        <div className="text-6xl mb-4">✨</div>
        <p className="font-poppins font-black text-4xl text-gradient-fire">MODO FUNDADOR DORADO</p>
        <p className="text-chispa text-lg mt-2">#LaChispaNuncaSeApaga</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ReservationProvider>
      {/* Global floating particles */}
      <ParticleCanvas />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main>
        <HeroSection />
        <OrigenSection />
        <ProblemaSection />
        <ProductoSection />
        <FundadoresSection />
        <MaquinaSection />
        <ComunidadSection />
        <SocialSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      
      {/* Claw Machine Modal */}
      <ClawMachineModal />

      {/* Konami Code Easter Egg */}
      <KonamiOverlay />
    </ReservationProvider>
  );
}
