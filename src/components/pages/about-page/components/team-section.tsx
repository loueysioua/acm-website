"use client";
import { Button } from "@/components/shared/ui/button";
import { ArrowRight, Hexagon } from "lucide-react";
import { TypeCommitteeSkeleton } from "@/types/contentful";
import { Entry } from "contentful";
import { getAssetUrl, isResolvedEntry } from "@/lib/api/api.utils";
import { useEffect, useRef, useState } from "react";

interface TeamProps {
  data: Entry<TypeCommitteeSkeleton, undefined, string>;
}

export default function TeamSection({ data }: TeamProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { title, description, committeeMembers, callToAction } = data.fields;
  const committeeMembersResolved =
    committeeMembers?.filter((item) => isResolvedEntry(item)) ?? [];
  const callToActionResolved = isResolvedEntry(callToAction)
    ? callToAction.fields
    : null;

  const teamMembers = committeeMembersResolved.map((member, index) => {
    return {
      id: index + 1,
      name: member.fields.name,
      role: member.fields.position,
      image: getAssetUrl(member.fields.picture) || "placeholder-user.jpg",
      facebook: member.fields.facebookLink,
      email: member.fields.email,
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

  const getHiveRows = (members: typeof teamMembers) => {
    const rows = [];
    let i = 0;
    let rowIndex = 0;
    const pattern = [5, 4];

    while (i < members.length) {
      const rowSize = pattern[rowIndex % pattern.length];
      const chunk = members.slice(i, i + rowSize);
      rows.push(chunk);
      i += rowSize;
      rowIndex++;
    }
    return rows;
  };

  const rows = getHiveRows(teamMembers);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        {/* Hexagon pattern background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="hexagons"
                x="0"
                y="0"
                width="100"
                height="87"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="50,0 93.3,25 93.3,62 50,87 6.7,62 6.7,25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                  Meet The Team
                </span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
              {title.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">
                {title.split(" ")[2]}
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Hexagon Grid */}
          <div className="flex flex-col items-center w-full mb-16 lg:mb-20">
            {rows.map((rowMembers, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={`flex justify-center items-center flex-wrap gap-4 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  marginTop: rowIndex > 0 ? -45 : 0,
                  zIndex: 10 - rowIndex,
                  width: "100%",
                  transitionDelay: `${rowIndex * 100}ms`,
                }}
              >
                {rowMembers.map((member, memberIndex) => (
                  <div
                    key={member.id}
                    className="relative transition-all duration-500 hover:z-50"
                    style={{
                      transitionDelay: `${(rowIndex * 5 + memberIndex) * 50}ms`,
                    }}
                  >
                    <Hexagon member={member} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className={`text-center transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href={callToActionResolved?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="group relative px-12 py-7 text-lg font-bold rounded-2xl overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary hover:to-primary/90 text-primary hover:text-white border-2 border-primary shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 flex items-center gap-2">
                  {callToActionResolved?.label}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                  <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                </div>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
