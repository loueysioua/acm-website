import type { Entry, EntryFields } from "contentful";
import type { TypeClubFieldFields } from "./TypeClubField";
import type { TypeLinkFields } from "./TypeLink";

export interface TypeHomeAboutFields {
    contentfulDisplayName?: EntryFields.Symbol;
    title: EntryFields.Symbol;
    description: EntryFields.RichText;
    clubFields?: Entry<TypeClubFieldFields>[];
    aboutLink: Entry<TypeLinkFields>;
}

export type TypeHomeAbout = Entry<TypeHomeAboutFields>;
