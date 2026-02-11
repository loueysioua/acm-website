"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TypeMemoriesSectionSkeleton } from "@/types/contentful";
import { Entry } from "contentful";
import {
  getAssetDescription,
  getAssetTitle,
  getAssetUrl,
} from "@/lib/api/api.utils";

interface MemoriesProps {
  data: Entry<TypeMemoriesSectionSkeleton, undefined, string>;
}

export default function MemoriesSection({ data }: MemoriesProps) {
  const { title, memories } = data.fields;
  const memoriesResolved = memories?.map((memo) => {
    return {
      image: getAssetUrl(memo),
      title: getAssetTitle(memo),
      description: getAssetDescription(memo),
    };
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % memoriesResolved.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(
      (prev) => (prev - 1 + memoriesResolved.length) % memoriesResolved.length,
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/20 via-background to-muted/30 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20 space-y-6">
            <div className="inline-block">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                  Our Journey
                </span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
              {title.split("&")[0]} &{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">
                {title.split("&")[1]}
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Relive the amazing moments from our events, competitions, and
              workshops.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Main Slider */}
            <div className="relative overflow-hidden rounded-3xl group">
              <Card className="overflow-hidden border-2 border-border/50 shadow-2xl group-hover:shadow-3xl transition-all duration-500 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* Image with zoom effect */}
                    <img
                      src={
                        memoriesResolved[currentSlide].image ||
                        "/placeholder.svg"
                      }
                      alt={memoriesResolved[currentSlide].title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isTransitioning
                          ? "scale-100 opacity-90"
                          : "scale-105 opacity-100"
                      } group-hover:scale-110`}
                    />

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
                      <div
                        className={`space-y-4 transition-all duration-700 ${
                          isTransitioning
                            ? "opacity-0 translate-y-4"
                            : "opacity-100 translate-y-0"
                        }`}
                      >
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white drop-shadow-2xl">
                          {memoriesResolved[currentSlide].title}
                        </h3>
                        <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow-lg">
                          {memoriesResolved[currentSlide].description}
                        </p>

                        {/* Decorative line */}
                        <div className="w-24 h-1.5 bg-gradient-to-r from-accent via-primary to-transparent rounded-full" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 text-white shadow-2xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
                onClick={prevSlide}
                disabled={isTransitioning}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 text-white shadow-2xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
                onClick={nextSlide}
                disabled={isTransitioning}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center mt-8 gap-3 flex-wrap">
              {memoriesResolved.map((memory, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`group/thumb relative overflow-hidden rounded-xl transition-all duration-500 ${
                    index === currentSlide
                      ? "ring-4 ring-primary shadow-xl shadow-primary/30 scale-110"
                      : "ring-2 ring-border/50 hover:ring-primary/50 hover:scale-105 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Thumbnail image */}
                  <div className="w-20 h-14 sm:w-24 sm:h-16 overflow-hidden bg-muted">
                    <img
                      src={memory.image || "/placeholder.svg"}
                      alt={memory.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                    />
                  </div>

                  {/* Overlay for active state */}
                  {index === currentSlide && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  )}
                </button>
              ))}
            </div>

            {/* Progress Dots (Alternative indicator) */}
            <div className="flex justify-center mt-6 gap-2">
              {memoriesResolved.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`transition-all duration-500 rounded-full ${
                    index === currentSlide
                      ? "w-12 h-3 bg-primary shadow-lg shadow-primary/50"
                      : "w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-125"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-background/50 backdrop-blur-sm rounded-full border border-border/50">
                <span className="text-2xl font-black text-primary tabular-nums">
                  {String(currentSlide + 1).padStart(2, "0")}
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                <span className="text-sm font-medium text-muted-foreground tabular-nums">
                  {String(memoriesResolved.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Keyboard hint */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Use{" "}
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono border border-border">
                ←
              </kbd>{" "}
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono border border-border">
                →
              </kbd>{" "}
              arrow keys to navigate
            </p>
          </div>
        </div>
      </div>

      {/* Keyboard navigation */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('keydown', (e) => {
              if (e.key === 'ArrowLeft') document.querySelector('[data-nav="prev"]')?.click();
              if (e.key === 'ArrowRight') document.querySelector('[data-nav="next"]')?.click();
            });
          `,
        }}
      />
    </section>
  );
}
