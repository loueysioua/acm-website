import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeLinkSkeleton } from "./TypeLink";
import type { TypeStatisticSkeleton } from "./TypeStatistic";

export interface TypeHeroSectionFields {
    title: EntryFieldTypes.Symbol;
    subtitle?: EntryFieldTypes.Symbol;
    background?: EntryFieldTypes.AssetLink;
    ctaPrimary?: EntryFieldTypes.EntryLink<TypeLinkSkeleton>;
    ctaSecondary?: EntryFieldTypes.EntryLink<TypeLinkSkeleton>;
    label?: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
    stats?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeStatisticSkeleton>>;
    contentfulDisplayName?: EntryFieldTypes.Symbol;
}

export type TypeHeroSectionSkeleton = EntrySkeletonType<TypeHeroSectionFields, "heroSection">;
export type TypeHeroSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHeroSectionSkeleton, Modifiers, Locales>;
