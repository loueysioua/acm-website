"use client";
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Badge } from "@/components/shared/ui/badge";
import { ArrowRight } from "lucide-react";
import { BackgroundShapes } from "@/components/shared";
import { Entry } from "contentful";
import { isResolvedEntry } from "@/lib/api/api.utils";
import { TypeImpactSectionSkeleton } from "@/types/contentful";
import { IconDisplay } from "@/components/shared/icon-display";
import { useRouter } from "next/navigation";
import { getThemeBadgeColor } from "@/utils/theme.util";

interface ImpactProps {
  data: Entry<TypeImpactSectionSkeleton, undefined, string>;
}

export default function ImpactSection({ data }: ImpactProps) {
  const router = useRouter();
  const { title, description, achievements, achievementsLink } = data.fields;
  const impactFieldsResolved =
    achievements?.filter((item) => isResolvedEntry(item)) ?? [];
  const achievementsLinkResolved = isResolvedEntry(achievementsLink)
    ? achievementsLink.fields
    : null;

  const achievementsArray = impactFieldsResolved.map((field, index) => {
    return {
      title: field.fields.label,
      description: field.fields.shortDescription,
      icon: field.fields.iconName,
      badge: field.fields.type,
      badgeStyle: getThemeBadgeColor(index),
    };
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-muted/30">
      <BackgroundShapes />

      <div className="relative container z-10 mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {title.split(" ")[0]}{" "}
            <span className="text-primary">{title.split(" ")[1]}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {achievementsArray.map((achievement, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-500 hover:shadow-lg group hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${achievement.badgeStyle.bg} ${achievement.badgeStyle.text}`}
                  >
                    <IconDisplay name={achievement.icon} className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {achievement.badge}
                  </Badge>
                </div>
                <h3
                  className={`font-semibold  text-foreground mb-3 ${achievement.badgeStyle.hover} transition-colors`}
                >
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            className="glass-button text-primary px-10 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            onClick={() =>
              router.push(achievementsLinkResolved?.url ?? "/achievements")
            }
          >
            {achievementsLinkResolved?.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
