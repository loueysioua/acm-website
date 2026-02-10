import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeCommitteeMemberFields {
    name: EntryFields.Symbol;
    position: EntryFields.Symbol;
    email: EntryFields.Symbol;
    picture: Asset;
    facebookLink: EntryFields.Symbol;
}

export type TypeCommitteeMember = Entry<TypeCommitteeMemberFields>;
