import { THEME_BADGE_STYLES } from "@/constants/theme.constants";

export const getThemeBadgeColor = (index: number) => {
  const themeKey =
    index % 3 === 0 ? "accent" : index % 3 === 1 ? "secondary" : "primary";

  return THEME_BADGE_STYLES[themeKey];
};
