import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeStatisticFields {
    name: EntryFields.Symbol;
    value: EntryFields.Number;
    icon?: Asset;
    contentfulDisplayName?: EntryFields.Symbol;
}

export type TypeStatistic = Entry<TypeStatisticFields>;
