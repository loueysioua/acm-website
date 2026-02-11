import { contentful } from "@/lib/contentful.config";
import { TypeNavigationSkeleton } from "@/types/contentful";
import { fetchFirst } from "../api.utils";
export const NavbarService = {
  async getNavbarData() {
    return fetchFirst(contentful.getEntries<TypeNavigationSkeleton>());
  },
};
