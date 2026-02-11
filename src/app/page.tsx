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
import { HomeService } from "@/lib/api/pages/home.service";

export default async function HomePage() {
  const { hero, about, statistics, impact, committee, upcoming, memories } =
    await HomeService.getHomePageData();

  return (
    <main className="min-h-screen">
      <HeroSection data={hero!} />
      <AboutSection data={about!} />
      <ImpactSection data={impact!} />
      <TeamSection data={committee!} />
      <StatsSection data={statistics!} />
      <EventsSection data={upcoming!} />
      <MemoriesSection data={memories!} />
      <PartnersSection />
    </main>
  );
}
