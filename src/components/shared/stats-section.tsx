"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Users, Trophy, BookOpen, Heart } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix: string;
  iconColor: string;
  backgroundColor: string;
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats: StatItem[] = [
    {
      icon: Users,
      value: 200,
      label: "Members Enrolled",
      suffix: "+",
      iconColor: "text-primary",
      backgroundColor: "bg-primary/10",
    },
    {
      icon: Trophy,
      value: 15,
      label: "Competitions Participated In",
      suffix: "+",
      iconColor: "text-accent",
      backgroundColor: "bg-accent/10",
    },
    {
      icon: BookOpen,
      value: 50,
      label: "Workshops Conducted",
      suffix: "+",
      iconColor: "text-secondary",
      backgroundColor: "bg-secondary/10",
    },
    {
      icon: Heart,
      value: 6,
      label: "Social Media Community",
      suffix: "K+ followers",
      iconColor: "text-primary",
      backgroundColor: "bg-primary/10",
    },
  ];

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

  return (
    <section
      ref={sectionRef}
      id="stats-section"
      className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 glass rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 right-1/4 w-64 h-64 glass-accent rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            Key{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Statistics
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Numbers that showcase our growth and impact in the computer science
            community.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`glass-card border-white/20 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl group relative overflow-hidden ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <CardContent className="p-8 text-center relative">
                <div className="mb-6 flex justify-center">
                  <div
                    className={`p-5 rounded-2xl group-hover:scale-110 transition-all duration-300 ${stat.backgroundColor}`}
                  >
                    <stat.icon
                      className={`h-10 w-10 ${stat.iconColor} drop-shadow-sm`}
                    />
                  </div>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-foreground mb-3 tracking-tight">
                  {isVisible ? (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>

                <p className="text-muted-foreground font-medium text-pretty leading-relaxed">
                  {stat.label}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds for smoother animation
    const steps = 80;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="inline-block">
      <span className="tabular-nums">{count}</span>
      <span className="text-primary">{suffix}</span>
    </span>
  );
}
