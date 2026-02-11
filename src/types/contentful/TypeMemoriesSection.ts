import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMemoriesSectionFields {
    memories: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    title: EntryFieldTypes.Symbol;
}

export type TypeMemoriesSectionSkeleton = EntrySkeletonType<TypeMemoriesSectionFields, "memoriesSection">;
export type TypeMemoriesSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMemoriesSectionSkeleton, Modifiers, Locales>;
