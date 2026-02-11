import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLinkFields {
    label: EntryFieldTypes.Symbol;
    url: EntryFieldTypes.Symbol;
    openInNewTab?: EntryFieldTypes.Boolean;
    icon?: EntryFieldTypes.AssetLink;
    contentfulDisplayName?: EntryFieldTypes.Symbol;
}

export type TypeLinkSkeleton = EntrySkeletonType<TypeLinkFields, "link">;
export type TypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLinkSkeleton, Modifiers, Locales>;
