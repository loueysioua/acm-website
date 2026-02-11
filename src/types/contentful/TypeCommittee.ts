import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCommitteeMemberSkeleton } from "./TypeCommitteeMember";
import type { TypeLinkSkeleton } from "./TypeLink";

export interface TypeCommitteeFields {
    committeeMembers: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCommitteeMemberSkeleton>>;
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
    callToAction?: EntryFieldTypes.EntryLink<TypeLinkSkeleton>;
}

export type TypeCommitteeSkeleton = EntrySkeletonType<TypeCommitteeFields, "committee">;
export type TypeCommittee<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCommitteeSkeleton, Modifiers, Locales>;
