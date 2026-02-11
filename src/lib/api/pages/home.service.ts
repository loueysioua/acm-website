import { contentful } from "@/lib/contentful.config";
import {
  TypeCommitteeSkeleton,
  TypeHeroSectionSkeleton,
  TypeHomeAboutSkeleton,
  TypeImpactSectionSkeleton,
  TypeMemoriesSectionSkeleton,
  TypeStatisticsSectionSkeleton,
  TypeUpComingEventSectionSkeleton,
} from "@/types/contentful";
import { fetchFirst } from "../api.utils";

export const HomeService = {
  async getHomePageData() {
    const [hero, about, upcoming, statistics, memories, impact, committee] =
      await Promise.all([
        this.getHero(),
        this.getAbout(),
        this.getUpcomingEventSection(),
        this.getStatistics(),
        this.getMemories(),
        this.getImpact(),
        this.getCommittee(),
      ]);

    return { hero, about, upcoming, statistics, memories, impact, committee };
  },

  async getHero() {
    return fetchFirst(
      contentful.getEntries<TypeHeroSectionSkeleton>({
        content_type: "heroSection",
      }),
    );
  },

  async getAbout() {
    return fetchFirst(
      contentful.getEntries<TypeHomeAboutSkeleton>({
        content_type: "homeAbout",
      }),
    );
  },

  async getUpcomingEventSection() {
    return fetchFirst(
      contentful.getEntries<TypeUpComingEventSectionSkeleton>({
        content_type: "upComingEventSection",
        include: 4,
      }),
    );
  },

  async getStatistics() {
    return fetchFirst(
      contentful.getEntries<TypeStatisticsSectionSkeleton>({
        content_type: "statisticsSection",
      }),
    );
  },

  async getMemories() {
    return fetchFirst(
      contentful.getEntries<TypeMemoriesSectionSkeleton>({
        content_type: "memoriesSection",
      }),
    );
  },

  async getImpact() {
    return fetchFirst(
      contentful.getEntries<TypeImpactSectionSkeleton>({
        content_type: "impactSection",
      }),
    );
  },

  async getCommittee() {
    return fetchFirst(
      contentful.getEntries<TypeCommitteeSkeleton>({
        content_type: "committee",
      }),
    );
  },
};
