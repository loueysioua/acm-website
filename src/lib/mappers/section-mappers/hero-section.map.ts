// @/lib/mappers.ts (continued)

import { HeroSectionType } from "@/types/home/hero-section/hero-section";
import { ContentfulHeroSection } from "@/types/home/hero-section/hero-section.skeleton";
import { ContentfulLink } from "@/types/shared/link/link.skeleton";
import { ContentfulStatistic } from "@/types/shared/statistic/statistic.skeleton";
import { mapLink } from "../shared/link.map";
import { mapStatistic } from "../shared/stat.map";

// Mapper for the Hero Section
export const mapHeroSection = (
  entry: ContentfulHeroSection
): HeroSectionType => {
  // The type assertions are needed here,
  // but they are now isolated to this one mapping function.
  const ctaPrimary = entry.fields.ctaPrimary as ContentfulLink;
  const ctaSecondary = entry.fields.ctaSecondary as ContentfulLink;
  const statistics = entry.fields.statistics as
    | ContentfulStatistic[]
    | undefined;

  return {
    title: entry.fields.title,
    subtitle: entry.fields.subtitle,
    background: entry.fields.background,
    description: entry.fields.description,

    ctaPrimary: mapLink(ctaPrimary),
    ctaSecondary: mapLink(ctaSecondary),
    statistics: statistics?.map(mapStatistic),
  };
};
