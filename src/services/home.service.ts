// Your service file, now extending the base service
import { HeroSectionSkeleton } from "@/types/home/hero-section/hero-section.skeleton";
import { HeroSectionType } from "@/types/home/hero-section/hero-section";
import { BaseContentfulService } from "./shared/base-contentful.service";
import { mapHeroSection } from "@/lib/mappers/section-mappers/hero-section.map";

class HomeService extends BaseContentfulService {
  async getHeroSectionContent(): Promise<HeroSectionType> {
    return this.getAndMapEntry<HeroSectionSkeleton, HeroSectionType>(
      "251FZLXd5rePTBcCvsLcfp",
      mapHeroSection
    );
  }
}

const homeService = new HomeService();
export default homeService;
