import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeLinkSkeleton } from "./TypeLink";

export interface TypeUpComingEventFields {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    date?: EntryFieldTypes.Date;
    startTime: EntryFieldTypes.Date;
    endTime: EntryFieldTypes.Date;
    location: EntryFieldTypes.Symbol;
    registrationLink?: EntryFieldTypes.EntryLink<TypeLinkSkeleton>;
}

export type TypeUpComingEventSkeleton = EntrySkeletonType<TypeUpComingEventFields, "upComingEvent">;
export type TypeUpComingEvent<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeUpComingEventSkeleton, Modifiers, Locales>;
