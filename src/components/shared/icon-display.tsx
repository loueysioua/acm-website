import { cn } from "@/lib/cn-util";
import {
  Brain,
  Code2,
  Globe,
  Cloud,
  Trophy,
  Users,
  Rocket,
  LucideIcon,
  CalendarCheck2,
  Heart,
  BookOpen,
} from "lucide-react";

// 1. Define available icons
const ICON_MAP: Record<string, LucideIcon> = {
  ai: Brain,
  code: Code2,
  web: Globe,
  cloud: Cloud,
  trophy: Trophy,
  users: Users,
  rocket: Rocket,
  event: CalendarCheck2,
  follow: Heart,
  workshop: BookOpen,
};

interface IconDisplayProps {
  name: string;
  className?: string;
}

export const IconDisplay = ({ name, className }: IconDisplayProps) => {
  const IconComponent = ICON_MAP[name.toLowerCase()] || Code2;

  return <IconComponent className={cn("shrink-0", className)} />;
};
