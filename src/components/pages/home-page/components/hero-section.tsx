"use client";

import type React from "react";
import { Button } from "@/components/shared/ui/button";
import {
  ArrowRight,
  Code,
  Users,
  Trophy,
  Mouse,
  Sparkles,
  Rocket,
} from "lucide-react";
import Image from "next/image";
import { BackgroundShapes, GeometricRain } from "@/components/shared";
import { useEffect, useState } from "react";
import { contentful } from "@/lib/contentful.config";
import { HeroSectionType } from "@/types/home/hero-section/hero-section";
import homeService from "@/services/home-service";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [heroSectionContent, setHeroSectionContent] =
    useState<HeroSectionType>();

  const router = useRouter();

  useEffect(() => {
    homeService.getHeroSectionContent().then((data) => {
      setHeroSectionContent(data);
    });
  }, []);

  useEffect(() => {
    console.log(heroSectionContent);
  }, [heroSectionContent]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-background"
    >
      <GeometricRain />
      <BackgroundShapes />

      <div className="relative z-10 container mx-auto py-20">
        <div className="flex items-center max-w-7xl mx-auto gap-50">
          {/* Left Content */}
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              .
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white">
                {heroSectionContent?.label ?? "Welcome To"}
              </span>
            </div>

            <div className="space-y-4">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up text-white"
                style={{
                  animationDelay: "0.4s",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                {heroSectionContent?.title
                  .split(" ")
                  .splice(0, heroSectionContent?.title.split(" ").length / 2)
                  .map((word, index) => {
                    return <span key={index}>{word + " "}</span>;
                  })}
                <div className="block ">
                  {heroSectionContent?.title
                    .split(" ")
                    .splice(heroSectionContent?.title.split(" ").length / 2)
                    .map((word, index) => {
                      return (
                        <span key={index} className="text-accent mt-2">
                          {word + " "}
                        </span>
                      );
                    })}
                </div>
              </h1>

              <p
                className="text-xl font-medium sm:text-2xl text-white/90 animate-fade-in-up leading-relaxed"
                style={{
                  animationDelay: "0.6s",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                {heroSectionContent?.subtitle}
              </p>

              <p
                className="text-lg text-white/80 max-w-xl animate-fade-in-up leading-relaxed"
                style={{
                  animationDelay: "0.8s",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                {heroSectionContent?.description}
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg btn-enhanced animate-pulse-glow font-semibold shadow-lg"
                onClick={onCtaPrimaryClick}
              >
                {heroSectionContent?.ctaPrimary.label}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 py-[22px] text-lg btn-enhanced font-semibold bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all"
                style={{
                  borderColor: "#ffffff",
                  borderWidth: "2px",
                  color: "#ffffff",
                }}
              >
                Join Us Today
              </Button>
            </div>

            {/* Stats Row */}
            <div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20 animate-fade-in-up"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="space-y-1">
                <div
                  className="text-3xl font-bold text-white"
                  style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                  200+
                </div>
                <div className="text-sm text-white/70">Active Members</div>
              </div>
              <div className="space-y-1">
                <div
                  className="text-3xl font-bold text-white"
                  style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                  15+
                </div>
                <div className="text-sm text-white/70">Competitions</div>
              </div>
              <div className="space-y-1">
                <div
                  className="text-3xl font-bold text-white"
                  style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                  50+
                </div>
                <div className="text-sm text-white/70">Workshops</div>
              </div>
            </div>
          </div>

          {/* Right Visual Area */}
          <div className="relative lg:block hidden mt-20">
            <div
              className="relative animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              {/* Main Logo */}
              <div className="relative z-10 w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"></div>
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 shadow-2xl">
                  <Image
                    src="/logos/logo-full-white.png"
                    alt="ACM INSAT Logo"
                    width={400}
                    height={400}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* Floating Cards */}
              <div
                className="absolute -left-35 top-1/10 animate-float"
                style={{ animationDelay: "1.4s" }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
                  <Users className="h-8 w-8 text-accent mb-2" />
                  <div className="text-sm font-semibold text-white">
                    Community
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-40 top-1/2 animate-float"
                style={{ animationDelay: "1.6s", animationDuration: "3.5s" }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
                  <Code className="h-8 w-8 text-accent mb-2" />
                  <div className="text-sm font-semibold text-white">
                    Development
                  </div>
                </div>
              </div>

              <div
                className="absolute left-1/10 top-60 animate-float"
                style={{ animationDelay: "1.8s", animationDuration: "4s" }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
                  <Trophy className="h-8 w-8 text-accent mb-2" />
                  <div className="text-sm font-semibold text-white">
                    Competition
                  </div>
                </div>
              </div>

              <div
                className="absolute right-1/8 bottom-10 animate-float"
                style={{ animationDelay: "2s", animationDuration: "3.8s" }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
                  <Rocket className="h-8 w-8 text-accent mb-2" />
                  <div className="text-sm font-semibold text-white">
                    Innovation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Mouse className="w-10 h-14 transition-colors duration-300 text-white/70 hover:text-white" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
