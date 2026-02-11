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
import { useEffect, useRef, useState } from "react";

interface ImpactProps {
  data: Entry<TypeImpactSectionSkeleton, undefined, string>;
}

export default function ImpactSection({ data }: ImpactProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-background via-muted/20 to-background"
    >
      <BackgroundShapes />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative container z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 lg:mb-20 space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-block">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                  Our Achievements
                </span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
              {title.split(" ")[0]}{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">
                {title.split(" ")[1]}
              </span>
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {achievementsArray.map((achievement, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-10 scale-95"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-transparent group-hover:to-accent/10 transition-all duration-500" />

                {/* Animated border */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-br from-primary via-transparent to-accent bg-clip-border animate-gradient-rotate" />
                </div>

                <CardContent className="p-8 relative z-10">
                  {/* Header with icon and badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 ${achievement.badgeStyle.bg} rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                      />
                      <div
                        className={`relative p-4 ${achievement.badgeStyle.bg} rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg`}
                      >
                        <IconDisplay
                          name={achievement.icon}
                          className={`h-7 w-7 ${achievement.badgeStyle.text} drop-shadow-sm`}
                        />
                      </div>
                    </div>

                    <Badge
                      variant="secondary"
                      className="text-xs font-semibold px-3 py-1 bg-secondary/10 backdrop-blur-sm border border-secondary/20 group-hover:bg-secondary/20 transition-colors"
                    >
                      {achievement.badge}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    {achievement.description}
                  </p>

                  {/* Decorative bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </CardContent>

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 w-16 h-16 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-2xl" />
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className={`text-center transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              className="group relative px-12 py-7 text-lg font-bold rounded-2xl overflow-hidden bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary hover:to-accent text-primary hover:text-white border-2 border-primary hover:border-transparent shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
              onClick={() =>
                router.push(achievementsLinkResolved?.url ?? "/achievements")
              }
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-flow" />

              <span className="relative z-10 flex items-center gap-2">
                {achievementsLinkResolved?.label}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out">
                <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              </div>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .animate-gradient-rotate {
          background-size: 200% 200%;
          animation: gradient-rotate 3s ease infinite;
        }

        .animate-gradient-flow {
          animation: gradient-flow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
