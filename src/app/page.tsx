import {
  AboutSection,
  EventsSection,
  HeroSection,
  ImpactSection,
  MemoriesSection,
  PartnersSection,
  StatsSection,
  TeamSection,
} from "@/components/pages/home-page/components";
import { LocationSection } from "@/components/shared/location-section";
import { Navigation } from "@/components/shared/navigation";
import { Footer } from "react-day-picker";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <TeamSection />
      <StatsSection />
      <EventsSection />
      <MemoriesSection />
      <PartnersSection />
      <LocationSection />
      <Footer />
    </main>
  );
}
