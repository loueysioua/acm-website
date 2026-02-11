import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAchievementFields {
    label: EntryFieldTypes.Symbol;
    shortDescription?: EntryFieldTypes.Symbol;
    longDescription?: EntryFieldTypes.Text;
    contentfulDisplayName?: EntryFieldTypes.Symbol;
    type?: EntryFieldTypes.Symbol<"Annual Event" | "Milestone" | "Recent">;
    iconName: EntryFieldTypes.Symbol;
}

export type TypeAchievementSkeleton = EntrySkeletonType<TypeAchievementFields, "achievement">;
export type TypeAchievement<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAchievementSkeleton, Modifiers, Locales>;
