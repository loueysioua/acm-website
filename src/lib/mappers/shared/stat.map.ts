import { StatisticType } from "@/types/shared/statistic/statistic";
import { ContentfulStatistic } from "@/types/shared/statistic/statistic.skeleton";

// Mapper for a Statistic
export const mapStatistic = (entry: ContentfulStatistic): StatisticType => {
  return {
    name: entry.fields.name,
    value: entry.fields.value,
    icon: entry.fields.icon,
  };
};
