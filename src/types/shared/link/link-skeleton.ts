import { EntrySkeletonType } from "contentful";
import { LinkType } from "./link";

export interface LinkSkeleton extends EntrySkeletonType {
  contentTypeId: "link";
  fields: LinkType;
}
