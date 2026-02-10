import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeHeroSectionFields {
    title?: EntryFields.Symbol;
    subtitle?: EntryFields.Symbol;
    background?: Asset;
    ctaPrimary?: Entry<Record<string, any>>;
    ctaSecondary?: Entry<Record<string, any>>;
    label?: EntryFields.Symbol;
    description?: EntryFields.Symbol;
    stats?: Entry<Record<string, any>>[];
    contentfulDisplayName?: EntryFields.Symbol;
}

export type TypeHeroSection = Entry<TypeHeroSectionFields>;
