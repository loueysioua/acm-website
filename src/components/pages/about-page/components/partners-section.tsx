"use client";

import { Card, CardContent } from "@/components/shared/ui/card";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PartnersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const partners = [
    {
      name: "NVIDIA",
      logo: "/shapes/nvidia-badge.svg",
      description: "AI and GPU Computing Partner",
    },
    {
      name: "INSAT",
      logo: "/insat-university-logo.jpg",
      description: "Academic Institution",
    },
    {
      name: "Microsoft",
      logo: "/microsoft-logo.png",
      description: "Technology Partner",
    },
    {
      name: "Google",
      logo: "/google-logo.png",
      description: "Cloud Platform Partner",
    },
    {
      name: "GitHub",
      logo: "/github-logo.png",
      description: "Development Platform",
    },
    {
      name: "JetBrains",
      logo: "/jetbrains-logo.jpg",
      description: "IDE Partner",
    },
  ];

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
      className="py-24 lg:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
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
              <div className="flex items-center gap-3 px-5 py-2.5 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                  Trusted By Leaders
                </span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
              Our Partners &{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">
                Sponsors
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We&apos;re proud to collaborate with industry leaders and academic
              institutions.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-16">
            {partners.map((partner, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-10 scale-95"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500" />

                <CardContent className="p-6 text-center relative z-10">
                  {/* Logo container */}
                  <div className="relative w-full h-20 mb-4 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        fill
                        className="object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Partner info */}
                  <h3 className="font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </CardContent>

                {/* Corner decoration */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            ))}
          </div>

          {/* Animated Logo Marquee */}
          <div
            className={`overflow-hidden rounded-3xl bg-gradient-to-r from-background/50 via-muted/50 to-background/50 backdrop-blur-sm p-8 lg:p-12 border border-border/50 shadow-xl transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Gradient overlays for fade effect */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background/80 to-transparent z-10 pointer-events-none" />

            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-smooth gap-16 items-center">
                {/* Double the partners for seamless loop */}
                {[...partners, ...partners, ...partners].map((partner, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-32 h-20 relative opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                  >
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div
            className={`mt-12 lg:mt-16 flex justify-center gap-12 flex-wrap transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {[
              { value: "6+", label: "Trusted Partners" },
              { value: "100%", label: "Commitment" },
              { value: "5+", label: "Years Together" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl sm:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-smooth {
          animation: scroll-smooth 30s linear infinite;
        }

        .animate-scroll-smooth:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
