import type { Entry, EntryFields } from "contentful";

export interface TypeFooterFields {
    socials?: Entry<Record<string, any>>[];
    email?: EntryFields.Symbol;
    location?: EntryFields.RichText;
    title?: EntryFields.Symbol;
    contentfulDisplayName?: EntryFields.Symbol;
}

export type TypeFooter = Entry<TypeFooterFields>;
