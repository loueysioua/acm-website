"use client";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { TypeStatisticsSectionSkeleton } from "@/types/contentful";
import { Entry } from "contentful";
import { isResolvedEntry } from "@/lib/api/api.utils";
import { IconDisplay } from "@/components/shared/icon-display";
import { getThemeBadgeColor } from "@/utils/theme.util";

interface StatsProps {
  data: Entry<TypeStatisticsSectionSkeleton, undefined, string>;
}

export default function StatsSection({ data }: StatsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { title, description, statistics } = data.fields;

  const statisticsResolved = statistics?.filter((item) =>
    isResolvedEntry(item),
  );

  const stats = statisticsResolved.map((stat, index) => {
    const st = stat.fields;
    return {
      icon: st.iconName,
      value: st.value,
      label: st.name,
      suffix: st.suffix,
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
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats-section"
      className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  By The Numbers
                </span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
              {title.split(" ")[0]}{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary">
                {title.split(" ")[1]}
              </span>
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Numbers that showcase our growth and impact in the computer science
              community.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Radial gradient on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-radial from-${
                    stat.badgeStyle.bg.includes("primary")
                      ? "primary"
                      : stat.badgeStyle.bg.includes("secondary")
                      ? "secondary"
                      : "accent"
                  } to-transparent`}
                />

                <CardContent className="p-8 text-center relative z-10">
                  {/* Icon container with glow effect */}
                  <div className="mb-8 flex justify-center">
                    <div className="relative">
                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 ${stat.badgeStyle.bg} rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                      />
                      <div
                        className={`relative p-5 ${stat.badgeStyle.bg} rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                      >
                        <IconDisplay
                          name={stat.icon}
                          className={`h-10 w-10 lg:h-12 lg:w-12 ${stat.badgeStyle.text} drop-shadow-sm group-hover:scale-110 transition-transform duration-300`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Animated counter */}
                  <div className="relative mb-4">
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                      {isVisible ? (
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      ) : (
                        <span>
                          0<span className="text-primary">{stat.suffix}</span>
                        </span>
                      )}
                    </div>
                    {/* Subtle glow under number */}
                    <div className="absolute inset-x-0 -bottom-2 h-8 bg-gradient-to-t from-primary/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Label */}
                  <p className="text-muted-foreground font-semibold text-sm lg:text-base leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </p>

                  {/* Bottom accent line with animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </CardContent>

                {/* Corner glow decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
              </Card>
            ))}
          </div>

          {/* Decorative bottom section */}
          <div
            className={`mt-16 lg:mt-20 text-center transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 backdrop-blur-sm rounded-full border border-primary/10">
              <div className="flex -space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <div
                  className="w-3 h-3 rounded-full bg-secondary animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-3 h-3 rounded-full bg-accent animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Growing stronger every day
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              hsl(var(--border)) 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="inline-block">
      <span className="tabular-nums">{count}</span>
      <span className="text-primary ml-1">{suffix}</span>
    </span>
  );
}
