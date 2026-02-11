"use client";
import { IconDisplay } from "@/components/shared/icon-display";
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import { isResolvedEntry } from "@/lib/api/api.utils";
import { TypeHomeAboutSkeleton } from "@/types/contentful";
import { Entry } from "contentful";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface AboutProps {
  data: Entry<TypeHomeAboutSkeleton, undefined, string>;
}

export default function AboutSection({ data }: AboutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const { title, description, clubFields, aboutLink } = data.fields;
  const clubFieldsResolved =
    clubFields?.filter((item) => isResolvedEntry(item)) ?? [];
  const aboutLinkResolved = isResolvedEntry(aboutLink)
    ? aboutLink.fields
    : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = clubFieldsResolved.map((field, index) => ({
    title: field.fields.name,
    description: field.fields.description,
    icon: field.fields.iconName || "code",
    colorIndex: index % 3,
  }));

  const getIconColor = (index: number) => {
    const colors = [
      "text-primary",
      "text-secondary",
      "text-accent",
    ];
    return colors[index];
  };

  const getCardGradient = (index: number) => {
    const gradients = [
      "from-primary/10 to-transparent",
      "from-secondary/10 to-transparent",
      "from-accent/10 to-transparent",
    ];
    return gradients[index];
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-48 -left-48 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient-slow"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div
            className={`space-y-6 mb-16 lg:mb-20 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-block">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Who We Are
                </span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.1] max-w-4xl">
              {title.split(" ")[0]}{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary">
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Animated gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(
                    feature.colorIndex
                  )} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                <CardContent className="p-8 relative z-10">
                  {/* Icon with animated background */}
                  <div className="relative mb-6 inline-block">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(
                        feature.colorIndex
                      )} rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity`}
                    />
                    <div className="relative p-4 bg-background/80 backdrop-blur-sm rounded-2xl border border-border group-hover:scale-110 transition-transform duration-300">
                      <IconDisplay
                        name={feature.icon}
                        className={`h-8 w-8 ${getIconColor(
                          feature.colorIndex
                        )} drop-shadow-lg transition-all duration-300 group-hover:scale-110`}
                      />
                    </div>
                  </div>

                  <h3 className="font-bold text-foreground text-xl mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className={`flex justify-center transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              className="group relative px-10 py-7 text-lg font-bold rounded-2xl overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary hover:to-primary/90 text-primary hover:text-white border-2 border-primary shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              onClick={() => router.push(aboutLinkResolved?.url ?? "/about")}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative z-10 flex items-center gap-2">
                {aboutLinkResolved?.label}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700">
                <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </div>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-gradient-slow {
          animation: gradient-slow 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
