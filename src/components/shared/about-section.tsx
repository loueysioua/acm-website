"use client";

import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import { ArrowRight, Code2, Brain, Cloud, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Code2,
      title: "Competitive Programming",
      description:
        "Master algorithms and data structures through intensive training and competitions.",
      iconColor: "text-primary",
    },
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description:
        "Explore machine learning, deep learning, and AI applications in real-world projects.",
      iconColor: "text-secondary",
    },
    {
      icon: Globe,
      title: "Web Development",
      description:
        "Build modern web applications using cutting-edge technologies and frameworks.",
      iconColor: "text-accent",
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      description:
        "Learn cloud platforms, DevOps practices, and scalable system architecture.",
      iconColor: "text-primary",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 glass rounded-full animate-pulse"></div>
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
              <div className="inline-block px-4 py-2 glass-accent rounded-full mb-6">
                <span className="text-primary font-medium text-sm">
                  Who We Are
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  ACM INSAT
                </span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                The ACM INSAT Student Chapter stands as one of the largest and
                most renowned computer science organizations, celebrated for its
                dedication to mastering coding skills and excelling in
                competitive programming contests. We invite students of all
                backgrounds, interests, and skill levels to become part of our
                vibrant community, where passion for technology and innovation
                knows no bounds.
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
                    <feature.icon
                      className={`h-10 w-10 ${feature.iconColor} mb-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg`}
                    />
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

            <Button className="glass-button text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
