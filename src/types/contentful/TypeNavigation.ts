import type { Entry, EntryFields } from "contentful";

export interface TypeNavigationFields {
    title?: EntryFields.Symbol;
    links?: Entry<Record<string, any>>[];
    contentfulDisplayName?: EntryFields.Symbol;
}

export type TypeNavigation = Entry<TypeNavigationFields>;
