import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAchievementSkeleton } from "./TypeAchievement";
import type { TypeLinkSkeleton } from "./TypeLink";

export interface TypeImpactSectionFields {
    achievements: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeAchievementSkeleton>>;
    achievementsLink: EntryFieldTypes.EntryLink<TypeLinkSkeleton>;
    contentfulDisplayName: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
}

export type TypeImpactSectionSkeleton = EntrySkeletonType<TypeImpactSectionFields, "impactSection">;
export type TypeImpactSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeImpactSectionSkeleton, Modifiers, Locales>;
