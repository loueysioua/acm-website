import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeClubFieldSkeleton } from "./TypeClubField";
import type { TypeLinkSkeleton } from "./TypeLink";

export interface TypeHomeAboutFields {
    contentfulDisplayName?: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    clubFields?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeClubFieldSkeleton>>;
    aboutLink: EntryFieldTypes.EntryLink<TypeLinkSkeleton>;
    description: EntryFieldTypes.Text;
}

export type TypeHomeAboutSkeleton = EntrySkeletonType<TypeHomeAboutFields, "homeAbout">;
export type TypeHomeAbout<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHomeAboutSkeleton, Modifiers, Locales>;
