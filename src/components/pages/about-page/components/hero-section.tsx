"use client";
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
import { useRouter } from "next/navigation";
import { Entry } from "contentful";
import { TypeHeroSectionSkeleton } from "@/types/contentful";
import { isResolvedEntry } from "@/lib/api/api.utils";
import { useEffect, useState } from "react";

interface HeroProps {
  data: Entry<TypeHeroSectionSkeleton, undefined, string>;
}

export default function HeroSection({ data }: HeroProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const {
    title,
    subtitle,
    description,
    ctaPrimary,
    ctaSecondary,
    label,
    stats,
  } = data.fields;

  const ctaPrimaryResolved = isResolvedEntry(ctaPrimary)
    ? ctaPrimary.fields
    : null;
  const ctaSecondaryResolved = isResolvedEntry(ctaSecondary)
    ? ctaSecondary.fields
    : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const onCtaClick = (path: string) => {
    router.push(path);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-background"
    >
      <GeometricRain />
      <BackgroundShapes />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient-shift pointer-events-none" />

      <div className="relative z-10 container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-8 max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-semibold text-white tracking-wide">
                {label ?? "Welcome To"}
              </span>
            </div>

            <div className="space-y-6">
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] transition-all duration-700 delay-100 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <span className="block text-white drop-shadow-2xl">
                  {title
                    ?.split(" ")
                    .slice(0, Math.ceil(title.split(" ").length / 2))
                    .join(" ")}
                </span>
                <span className="block text-accent drop-shadow-2xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent to-primary">
                  {title
                    ?.split(" ")
                    .slice(Math.ceil(title.split(" ").length / 2))
                    .join(" ")}
                </span>
              </h1>

              <p
                className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-white/95 leading-relaxed drop-shadow-lg transition-all duration-700 delay-200 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {subtitle}
              </p>

              <p
                className={`text-base sm:text-lg text-white/85 max-w-xl leading-relaxed drop-shadow-md transition-all duration-700 delay-300 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {description}
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                className="group bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-7 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                onClick={() => onCtaClick(ctaPrimaryResolved?.url ?? "")}
              >
                <span className="relative z-10 flex items-center">
                  {ctaPrimaryResolved?.label}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              <Button
                size="lg"
                className="group px-8 py-7 text-lg font-bold rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                onClick={() => onCtaClick(ctaSecondaryResolved?.url ?? "")}
              >
                {ctaSecondaryResolved?.label}
                <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats Row with Enhanced Design */}
            <div
              className={`grid grid-cols-3 gap-6 pt-10 mt-2 border-t border-white/20 transition-all duration-700 delay-500 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {[
                { value: "200+", label: "Active Members" },
                { value: "15+", label: "Competitions" },
                { value: "50+", label: "Workshops" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg group-hover:text-accent transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Area - Enhanced */}
          <div
            className={`relative flex-1 max-w-xl transition-all duration-1000 delay-200 ${
              mounted
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-90 rotate-6"
            }`}
          >
            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-primary/20 to-transparent rounded-full blur-3xl animate-pulse" />

              {/* Main Logo Container */}
              <div className="relative z-10 w-full aspect-square max-w-md mx-auto lg:block hidden">
                <div className="relative bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 border border-white/10 shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]" />
                  <Image
                    src="/logos/logo-full-white.png"
                    alt="ACM INSAT Logo"
                    width={400}
                    height={400}
                    className="object-contain w-full h-full relative z-10 drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Floating Cards with Improved Design */}
              <div
                className="absolute -left-24 sm:-left-32 lg:-left-36 top-[10%] animate-float lg:block hidden"
                style={{ animationDelay: "0s", animationDuration: "3s" }}
              >
                <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl hover:shadow-accent/30 hover:scale-110 transition-all duration-300 hover:bg-white/20">
                  <Users className="h-10 w-10 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-base font-bold text-white">Community</div>
                </div>
              </div>

              <div
                className="absolute -right-28 sm:-right-36 lg:-right-40 top-1/2 -translate-y-1/2 animate-float lg:block hidden"
                style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
              >
                <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl hover:shadow-primary/30 hover:scale-110 transition-all duration-300 hover:bg-white/20">
                  <Code className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-base font-bold text-white">
                    Development
                  </div>
                </div>
              </div>

              <div
                className="absolute left-[10%] bottom-16 animate-float lg:block hidden"
                style={{ animationDelay: "1s", animationDuration: "4s" }}
              >
                <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl hover:shadow-accent/30 hover:scale-110 transition-all duration-300 hover:bg-white/20">
                  <Trophy className="h-10 w-10 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-base font-bold text-white">
                    Competition
                  </div>
                </div>
              </div>

              <div
                className="absolute right-[12%] bottom-10 animate-float lg:block hidden"
                style={{ animationDelay: "1.5s", animationDuration: "3.8s" }}
              >
                <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl hover:shadow-primary/30 hover:scale-110 transition-all duration-300 hover:bg-white/20">
                  <Rocket className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-base font-bold text-white">Innovation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <Mouse className="w-8 h-12 text-white/70 hover:text-white transition-colors cursor-pointer" />
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full" />
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

        @keyframes gradient-shift {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
