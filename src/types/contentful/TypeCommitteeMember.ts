import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCommitteeMemberFields {
    name: EntryFieldTypes.Symbol;
    position: EntryFieldTypes.Symbol;
    email: EntryFieldTypes.Symbol;
    picture: EntryFieldTypes.AssetLink;
    facebookLink: EntryFieldTypes.Symbol;
}

export type TypeCommitteeMemberSkeleton = EntrySkeletonType<TypeCommitteeMemberFields, "committeeMember">;
export type TypeCommitteeMember<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCommitteeMemberSkeleton, Modifiers, Locales>;
