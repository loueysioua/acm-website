import { ContentfulLink } from "@/types/shared/link/link.skeleton";
import { LinkType } from "@/types/shared/link/link";

// Mapper for a Link
export const mapLink = (entry: ContentfulLink): LinkType => {
  return {
    label: entry.fields.label,
    url: entry.fields.url,
    openInNewTab: entry.fields.openInNewTab,
  };
};
