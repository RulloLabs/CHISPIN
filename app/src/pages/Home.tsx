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
      
      {/* Schema.org structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Chispín - Edición Fundadores",
          "description": "Chispín es un pequeño ternero de peluche con una llama en la punta de la cola. Rescata tu Chispín Edición Fundadores y forma parte de la primera generación.",
          "brand": { "@type": "Brand", "name": "Chispín" },
          "offers": {
            "@type": "Offer",
            "price": "39",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          }
        })
      }} />
      {/* Sections */}
      <main id="main-content">
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
