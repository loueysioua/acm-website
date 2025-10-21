import { LinkSkeleton } from "@/types/shared/link/link-skeleton";
import { Entry, EntrySkeletonType } from "contentful";

export interface HeroSectionSkeleton extends EntrySkeletonType {
  contentTypeId: "heroSection";
  fields: {
    label?: string;
    title: string;
    subtitle: string;
    background?: string;
    ctaPrimary: Entry<LinkSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
    ctaSecondary: Entry<LinkSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
    description?: string;
  };
}
