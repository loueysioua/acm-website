import { HeroSectionSkeleton } from "@/types/home/hero-section/hero-section-skeleton";
import { contentful } from "@/lib/contentful.config";
import { HeroSectionType } from "@/types/home/hero-section/hero-section";
import { LinkSkeleton } from "@/types/shared/link/link-skeleton";
import { Entry } from "contentful";

class HomeService {
  async getHeroSectionContent(): Promise<HeroSectionType> {
    const response = await contentful.getEntry<HeroSectionSkeleton>(
      "251FZLXd5rePTBcCvsLcfp"
    );

    // Type assertion to help TypeScript
    const ctaPrimary = response.fields.ctaPrimary as Entry<
      LinkSkeleton,
      "WITHOUT_UNRESOLVABLE_LINKS",
      string
    >;
    const ctaSecondary = response.fields.ctaSecondary as Entry<
      LinkSkeleton,
      "WITHOUT_UNRESOLVABLE_LINKS",
      string
    >;

    const content: HeroSectionType = {
      title: response.fields.title,
      subtitle: response.fields.subtitle,
      background: response.fields.background,
      ctaPrimary: {
        label: ctaPrimary.fields.label,
        url: ctaPrimary.fields.url,
        openInNewTab: ctaPrimary.fields.openInNewTab,
      },
      ctaSecondary: {
        label: ctaSecondary.fields.label,
        url: ctaSecondary.fields.url,
        openInNewTab: ctaSecondary.fields.openInNewTab,
      },
      description: response.fields.description,
    };

    return content;
  }
}

const homeService = new HomeService();
export default homeService;
