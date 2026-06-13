import { ReservationProvider } from '@/context/ReservationContext';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import { ClawMachineModal } from '@/components/ClawMachineModal';
import { Navigation } from '@/sections/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { OrigenSection } from '@/sections/OrigenSection';
import { ProductoSection } from '@/sections/ProductoSection';
import { MaquinaSection } from '@/sections/MaquinaSection';
import { ComunidadSection } from '@/sections/ComunidadSection';
import { SocialSection } from '@/sections/SocialSection';
import { FAQSection } from '@/sections/FAQSection';
import { FinalCTASection } from '@/sections/FinalCTASection';

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
        <ProductoSection />
        <MaquinaSection />
        <ComunidadSection />
        <SocialSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      
      {/* Claw Machine Modal */}
      <ClawMachineModal />
    </ReservationProvider>
  );
}
