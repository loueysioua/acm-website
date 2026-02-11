import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeFooterFields {
    socials?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
    email?: EntryFieldTypes.Symbol;
    location?: EntryFieldTypes.RichText;
    title?: EntryFieldTypes.Symbol;
    contentfulDisplayName?: EntryFieldTypes.Symbol;
}

export type TypeFooterSkeleton = EntrySkeletonType<TypeFooterFields, "footer">;
export type TypeFooter<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeFooterSkeleton, Modifiers, Locales>;
