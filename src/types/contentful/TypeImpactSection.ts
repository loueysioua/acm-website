import type { Entry, EntryFields } from "contentful";
import type { TypeAchievementFields } from "./TypeAchievement";
import type { TypeLinkFields } from "./TypeLink";

export interface TypeImpactSectionFields {
    achievements: Entry<TypeAchievementFields>[];
    achievementsLink: Entry<TypeLinkFields>;
    contentfulDisplayName: EntryFields.Symbol;
    title: EntryFields.Symbol;
    description?: EntryFields.Text;
}

export type TypeImpactSection = Entry<TypeImpactSectionFields>;
