import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeStatisticSkeleton } from "./TypeStatistic";

export interface TypeStatisticsSectionFields {
    statistics: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeStatisticSkeleton>>;
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
}

export type TypeStatisticsSectionSkeleton = EntrySkeletonType<TypeStatisticsSectionFields, "statisticsSection">;
export type TypeStatisticsSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeStatisticsSectionSkeleton, Modifiers, Locales>;
