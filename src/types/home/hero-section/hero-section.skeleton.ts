import { ContentfulLink } from "@/types/shared/link/link.skeleton";
import { ContentfulStatistic } from "@/types/shared/statistic/statistic.skeleton";
import { Entry, EntrySkeletonType } from "contentful";

export interface HeroSectionSkeleton extends EntrySkeletonType {
  contentTypeId: "heroSection";
  fields: {
    label?: string;
    title: string;
    subtitle: string;
    background?: string;
    ctaPrimary: ContentfulLink;
    ctaSecondary: ContentfulLink;
    description?: string;
    statistics?: ContentfulStatistic[];
  };
}

export type ContentfulHeroSection = Entry<
  HeroSectionSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS"
>;
