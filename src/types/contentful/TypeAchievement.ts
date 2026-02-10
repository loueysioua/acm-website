import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeAchievementFields {
    label: EntryFields.Symbol;
    shortDescription?: EntryFields.Symbol;
    longDescription?: EntryFields.Text;
    contentfulDisplayName?: EntryFields.Symbol;
    icon?: Asset;
    type?: "Annual Event" | "Milestone" | "Recent";
}

export type TypeAchievement = Entry<TypeAchievementFields>;
