import type { Entry, EntryFields } from "contentful";
import type { TypeLinkFields } from "./TypeLink";

export interface TypeUpComingEventFields {
    title: EntryFields.Symbol;
    description: EntryFields.Text;
    date?: EntryFields.Date;
    startTime: EntryFields.Date;
    endTime: EntryFields.Date;
    location: EntryFields.Symbol;
    registrationLink?: Entry<TypeLinkFields>;
}

export type TypeUpComingEvent = Entry<TypeUpComingEventFields>;
