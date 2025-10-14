import { HeroSection } from "@/components/pages/home-page/components/hero-section";
import { AboutSection } from "@/components/shared/about-section";
import { EventsSection } from "@/components/shared/events-section";
import { ImpactSection } from "@/components/shared/impact-section";
import { LocationSection } from "@/components/shared/location-section";
import { MemoriesSection } from "@/components/shared/memories-section";
import { Navigation } from "@/components/shared/navigation";
import { PartnersSection } from "@/components/shared/partners-section";
import { StatsSection } from "@/components/shared/stats-section";
import { TeamSection } from "@/components/shared/team-section";
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
