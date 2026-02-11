import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeStatisticFields {
    name: EntryFieldTypes.Symbol;
    value: EntryFieldTypes.Number;
    contentfulDisplayName?: EntryFieldTypes.Symbol;
    iconName: EntryFieldTypes.Symbol;
    suffix: EntryFieldTypes.Symbol;
}

export type TypeStatisticSkeleton = EntrySkeletonType<TypeStatisticFields, "statistic">;
export type TypeStatistic<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeStatisticSkeleton, Modifiers, Locales>;
