import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeLinkFields {
    label: EntryFields.Symbol;
    url: EntryFields.Symbol;
    openInNewTab?: EntryFields.Boolean;
    icon?: Asset;
    contentfulDisplayName?: EntryFields.Symbol;
}

export type TypeLink = Entry<TypeLinkFields>;
