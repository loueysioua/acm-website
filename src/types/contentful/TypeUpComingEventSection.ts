import type { Entry, EntryFields } from "contentful";
import type { TypeLinkFields } from "./TypeLink";
import type { TypeUpComingEventFields } from "./TypeUpComingEvent";

export interface TypeUpComingEventSectionFields {
    title: EntryFields.Symbol;
    description: EntryFields.Symbol;
    upcomingEvent: Entry<TypeUpComingEventFields>;
    eventsLink: Entry<TypeLinkFields>;
}

export type TypeUpComingEventSection = Entry<TypeUpComingEventSectionFields>;
