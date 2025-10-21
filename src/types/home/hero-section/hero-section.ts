import { LinkType } from "../../shared/link/link";

export interface HeroSectionType {
  label?: string;
  title: string;
  subtitle: string;
  background?: string;
  ctaPrimary: LinkType;
  ctaSecondary: LinkType;
  description?: string;
}
