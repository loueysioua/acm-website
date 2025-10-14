"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Badge } from "@/components/shared/ui/badge";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";

export function EventsSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Winter Cup 8.0 - example date (you can update this)
  const eventDate = new Date("2025-02-15T09:00:00");

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

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-6">
            <span className="text-accent font-medium text-sm flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              What's Coming Up
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            Upcoming{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Events
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Don't miss our exciting upcoming events and competitions that bring
            together the brightest minds in computer science.
          </p>
        </div>

        {/* Featured Event - Winter Cup 8.0 */}
        <Card
          className={`mb-12 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <CardContent className="p-8 sm:p-12 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-accent to-primary text-white px-4 py-2 text-sm font-semibold shadow-lg">
                  🏆 Featured Event
                </Badge>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
                  Winter Cup{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    8.0
                  </span>
                </h3>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                  Our flagship competitive programming contest returns! Join
                  programmers from across the region in this exciting
                  competition featuring challenging algorithmic problems and
                  amazing prizes.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Calendar, text: "February 15, 2025" },
                    { icon: Clock, text: "9:00 AM - 6:00 PM" },
                    { icon: MapPin, text: "INSAT Campus, Tunis" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 mr-4">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Countdown Timer */}
              <div className="text-center space-y-8">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-foreground">
                    Event Starts In:
                  </h4>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-background to-muted/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border/50"
                    >
                      <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mt-2">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <Button
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            See All Events
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
