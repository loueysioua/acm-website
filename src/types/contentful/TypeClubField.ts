import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeClubFieldFields {
    name: EntryFields.Symbol;
    contentfulDisplayName?: EntryFields.Symbol;
    description?: EntryFields.Symbol;
    icon?: Asset;
}

export type TypeClubField = Entry<TypeClubFieldFields>;
