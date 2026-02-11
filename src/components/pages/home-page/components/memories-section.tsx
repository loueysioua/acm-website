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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % memoriesResolved.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + memoriesResolved.length) % memoriesResolved.length,
    );
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {title.split("&")[0]} &{" "}
            <span className="text-primary">{title.split("&")[1]}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Relive the amazing moments from our events, competitions, and
            workshops.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main slider */}
          <Card className="overflow-hidden p-0">
            <CardContent className="p-0 ">
              <div className="relative h-150 overflow-hidden">
                <img
                  src={
                    memoriesResolved[currentSlide].image || "/placeholder.svg"
                  }
                  alt={memoriesResolved[currentSlide].title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {memoriesResolved[currentSlide].title}
                  </h3>
                  <p className="text-white/90 text-pretty">
                    {memoriesResolved[currentSlide].description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {memoriesResolved.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
