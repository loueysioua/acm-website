import { Entry, EntrySkeletonType } from "contentful";
import { LinkType } from "./link";

export interface LinkSkeleton extends EntrySkeletonType {
  contentTypeId: "link";
  fields: LinkType;
}

export type ContentfulLink = Entry<LinkSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
