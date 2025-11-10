import { LinkType } from "@/types/shared/link/link";
import { StatisticType } from "@/types/shared/statistic/statistic";

export interface HeroSectionType {
  label?: string;
  title: string;
  subtitle: string;
  background?: string;
  ctaPrimary: LinkType;
  ctaSecondary: LinkType;
  description?: string;
  statistics?: StatisticType[];
}
