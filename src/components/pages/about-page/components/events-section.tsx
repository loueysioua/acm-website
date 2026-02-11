"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Trophy,
} from "lucide-react";
import { TypeUpComingEventSectionSkeleton } from "@/types/contentful";
import { Entry } from "contentful";
import { isResolvedEntry } from "@/lib/api/api.utils";
import { useRouter } from "next/navigation";

interface EventsProps {
  data: Entry<TypeUpComingEventSectionSkeleton, undefined, string>;
}

export default function EventsSection({ data }: EventsProps) {
  const { title, description, upcomingEvent, eventsLink } = data.fields;
  const upcomingResolved = isResolvedEntry(upcomingEvent)
    ? upcomingEvent.fields
    : null;
  const upcomingEventRegistration = isResolvedEntry(
    upcomingResolved?.registrationLink,
  )
    ? upcomingResolved?.registrationLink.fields
    : null;
  const eventsLinkResolved = isResolvedEntry(eventsLink)
    ? eventsLink.fields
    : null;

  const targetDateStr = upcomingResolved?.startTime || upcomingResolved?.date;
  const targetDate = targetDateStr ? new Date(targetDateStr) : null;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBA";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTimeRange = (start?: string, end?: string) => {
    if (!start) return "TBA";
    const opts: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const s = new Date(start).toLocaleTimeString("en-US", opts);
    const e = end ? new Date(end).toLocaleTimeString("en-US", opts) : "";
    return e ? `${s} - ${e}` : s;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  if (!upcomingResolved) return null;

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
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
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                  What&apos;s Coming Up
                </span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
              {title.split(" ")[0]}{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary">
                {title.split(" ")[1]}
              </span>
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Featured Event Card */}
          <Card
            className={`mb-12 lg:mb-16 overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background/80 to-accent/5 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.01] group relative ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated border glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary blur-xl opacity-50 animate-gradient-flow" />
            </div>

            <CardContent className="p-8 sm:p-12 lg:p-16 relative z-10">
              {/* Featured badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 backdrop-blur-sm rounded-full mb-8 border border-accent/20">
                <Trophy className="h-5 w-5 text-accent" />
                <span className="text-accent font-bold text-sm uppercase tracking-wider">
                  Featured Event
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Event Details */}
                <div className="space-y-8">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground leading-[1.1]">
                    {upcomingResolved?.title
                      .split(" ")
                      .slice(0, -1)
                      .join(" ")}{" "}
                    <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary">
                      {upcomingResolved?.title.split(" ").slice(-1)}
                    </span>
                  </h3>

                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                    {upcomingResolved?.description}
                  </p>

                  {/* Event Info */}
                  <div className="space-y-4">
                    {[
                      {
                        icon: Calendar,
                        text: formatDate(upcomingResolved.startTime),
                        color: "text-primary",
                        bg: "bg-primary/10",
                      },
                      {
                        icon: Clock,
                        text: formatTimeRange(
                          upcomingResolved.startTime,
                          upcomingResolved.endTime,
                        ),
                        color: "text-secondary",
                        bg: "bg-secondary/10",
                      },
                      {
                        icon: MapPin,
                        text: upcomingResolved.location,
                        color: "text-accent",
                        bg: "bg-accent/10",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="group/item flex items-center gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border/50 hover:border-primary/30"
                      >
                        <div className={`p-3 rounded-xl ${item.bg}`}>
                          <item.icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <span className="font-semibold text-foreground group-/item-hover:text-primary transition-colors">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Register Button */}
                  <a
                    href={upcomingEventRegistration?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      className="group/btn relative px-10 py-7 text-lg font-bold rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-2xl hover:shadow-primary/50 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {upcomingEventRegistration?.label}
                        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000">
                        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                      </div>
                    </Button>
                  </a>
                </div>

                {/* Right: Countdown Timer */}
                <div className="space-y-8">
                  <div className="text-center space-y-4">
                    <h4 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Event Starts In
                    </h4>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hours", value: timeLeft.hours },
                      { label: "Minutes", value: timeLeft.minutes },
                      { label: "Seconds", value: timeLeft.seconds },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="group/timer relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-border/50 hover:border-accent/50"
                      >
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover/timer:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 text-center space-y-2">
                          <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-accent drop-shadow-lg tabular-nums">
                            {item.value.toString().padStart(2, "0")}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest font-bold">
                            {item.label}
                          </div>
                        </div>

                        {/* Corner glow */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 rounded-full blur-2xl opacity-0 group-hover/timer:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* View All Events Button */}
          <div
            className={`text-center transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              className="group relative px-10 py-7 text-lg font-bold rounded-2xl overflow-hidden bg-transparent hover:bg-primary border-2 border-primary text-primary hover:text-white shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
              onClick={() => router.push(eventsLinkResolved?.url || "/events")}
            >
              <span className="relative z-10 flex items-center gap-2">
                {eventsLinkResolved?.label}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700">
                <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </div>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
          }
        }

        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .animate-float-particle {
          animation: float-particle linear infinite;
        }

        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradient-flow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
