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

export default function Home() {
  return (
    <ReservationProvider>
      <ParticleCanvas />
      <Navigation />
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
      <ClawMachineModal />
    </ReservationProvider>
  );
}
