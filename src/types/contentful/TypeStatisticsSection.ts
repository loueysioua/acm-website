import type { Entry, EntryFields } from "contentful";
import type { TypeStatisticFields } from "./TypeStatistic";

export interface TypeStatisticsSectionFields {
    statistics: Entry<TypeStatisticFields>[];
    title: EntryFields.Symbol;
    description: EntryFields.Symbol;
}

export type TypeStatisticsSection = Entry<TypeStatisticsSectionFields>;
