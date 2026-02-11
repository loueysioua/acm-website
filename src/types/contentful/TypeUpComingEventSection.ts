import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeLinkSkeleton } from "./TypeLink";
import type { TypeUpComingEventSkeleton } from "./TypeUpComingEvent";

export interface TypeUpComingEventSectionFields {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
    upcomingEvent: EntryFieldTypes.EntryLink<TypeUpComingEventSkeleton>;
    eventsLink: EntryFieldTypes.EntryLink<TypeLinkSkeleton>;
}

export type TypeUpComingEventSectionSkeleton = EntrySkeletonType<TypeUpComingEventSectionFields, "upComingEventSection">;
export type TypeUpComingEventSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeUpComingEventSectionSkeleton, Modifiers, Locales>;
