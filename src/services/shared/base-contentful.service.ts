// @/services/BaseContentfulService.ts
import { contentful } from "@/lib/contentful.config";
import { Entry, EntrySkeletonType } from "contentful";

export class BaseContentfulService {
  /**
   * Fetches a single Contentful entry and maps it to a target type.
   */
  protected async getAndMapEntry<TSkeleton extends EntrySkeletonType, TTarget>(
    entryId: string,
    mapper: (entry: Entry<TSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">) => TTarget
  ): Promise<TTarget> {
    const entry = await contentful.getEntry<TSkeleton>(entryId);
    return mapper(entry as Entry<TSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">);
  }

  /**
   * Fetches a collection of Contentful entries and maps them.
   */
  protected async getAndMapEntries<
    TSkeleton extends EntrySkeletonType,
    TTarget
  >(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: any, // Your Contentful query object
    mapper: (entry: Entry<TSkeleton>) => TTarget
  ): Promise<TTarget[]> {
    const collection = await contentful.getEntries<TSkeleton>(query);
    return collection.items.map(mapper);
  }
}
