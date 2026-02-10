import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeMemoriesSectionFields {
    memories: Asset[];
    title: EntryFields.Symbol;
}

export type TypeMemoriesSection = Entry<TypeMemoriesSectionFields>;
