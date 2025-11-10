"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MemoriesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const memories = [
    {
      image: "/acm-students-at-competitive-programming-contest-tc.jpg",
      title: "TCPC 2024 Winners",
      description:
        "Our team celebrating victory at the Tunisian Collegiate Programming Contest",
    },
    {
      image: "/nvidia-workshop-with-students-learning-ai-and-mach.jpg",
      title: "NVIDIA Workshop 2024",
      description:
        "Hands-on AI and machine learning workshop with industry experts",
    },
    {
      image: "/acm-hackathon-event-with-students-coding-together.jpg",
      title: "Annual Hackathon",
      description: "48-hour coding marathon bringing together the best minds",
    },
    {
      image: "/acm-club-meeting-with-students-discussing-algorith.jpg",
      title: "Algorithm Study Session",
      description:
        "Weekly study sessions to master competitive programming concepts",
    },
    {
      image: "/acm-graduation-ceremony-with-club-members.jpg",
      title: "Graduation Ceremony",
      description: "Celebrating our members achievements and new beginnings",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Memories & <span className="text-primary">Highlights</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Relive the amazing moments from our events, competitions, and
            workshops.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main slider */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-96 overflow-hidden">
                <img
                  src={memories[currentSlide].image || "/placeholder.svg"}
                  alt={memories[currentSlide].title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {memories[currentSlide].title}
                  </h3>
                  <p className="text-white/90 text-pretty">
                    {memories[currentSlide].description}
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
            {memories.map((_, index) => (
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

        {/* Thumbnail strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {memories.map((memory, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 ${
                index === currentSlide
                  ? "ring-2 ring-primary"
                  : "hover:ring-1 hover:ring-primary/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <CardContent className="p-0">
                <div className="relative h-24 overflow-hidden rounded-lg">
                  <img
                    src={memory.image || "/placeholder.svg"}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
