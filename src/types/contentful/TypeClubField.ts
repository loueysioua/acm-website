import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeClubFieldFields {
    name: EntryFieldTypes.Symbol;
    contentfulDisplayName?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Symbol;
    iconName?: EntryFieldTypes.Symbol;
}

export type TypeClubFieldSkeleton = EntrySkeletonType<TypeClubFieldFields, "clubField">;
export type TypeClubField<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeClubFieldSkeleton, Modifiers, Locales>;
