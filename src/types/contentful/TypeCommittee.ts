import type { Entry, EntryFields } from "contentful";
import type { TypeCommitteeMemberFields } from "./TypeCommitteeMember";
import type { TypeLinkFields } from "./TypeLink";

export interface TypeCommitteeFields {
    committeeMembers: Entry<TypeCommitteeMemberFields>[];
    title: EntryFields.Symbol;
    description: EntryFields.Symbol;
    callToAction?: Entry<TypeLinkFields>;
}

export type TypeCommittee = Entry<TypeCommitteeFields>;
