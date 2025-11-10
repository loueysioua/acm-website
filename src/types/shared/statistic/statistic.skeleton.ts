import { Entry, EntrySkeletonType } from "contentful";
import { StatisticType } from "./statistic";

export interface StatisticSkeleton extends EntrySkeletonType {
  contentTypeId: "statistic";
  fields: StatisticType;
}

export type ContentfulStatistic = Entry<
  StatisticSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS"
>;
