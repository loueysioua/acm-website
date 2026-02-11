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
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = clubFieldsResolved.map((field, index) => ({
    title: field.fields.name,
    description: field.fields.description,

    icon: (
      <IconDisplay
        name={field.fields.iconName || "code"}
        className={`h-10 w-10 ${
          index % 3 === 0
            ? "text-primary"
            : index % 3 === 1
            ? "text-secondary"
            : "text-accent"
        } mb-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg`}
      />
    ),
  }));

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
      style={{
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 glass-button rounded-full animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 glass-accent rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="gap-16 items-center">
          {/* Left side - Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                {title.split(" ")[0] + " "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {title.split(" ")[1] + " " + title.split(" ")[2]}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed w-250">
                {description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`glass-card border-white/20 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl group ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {feature.icon}
                    {/* <feature.icon
                      className={`h-10 w-10 ${feature.iconColor} mb-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg`}
                    /> */}
                    <h3 className="font-bold text-foreground mb-3 text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              className="text-primary glass-button px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group "
              onClick={() => router.push(aboutLinkResolved?.url ?? "/about")}
            >
              {aboutLinkResolved?.label}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
