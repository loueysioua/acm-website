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
        // Event has passed or started
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Run immediately so we don't wait 1 second for first render
    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  if (!upcomingResolved) return null;

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
              What&apos;s Coming Up
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            {title.split(" ")[0]}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {title.split(" ")[1]}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            {description}
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
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-10">
              <span className="text-accent font-medium text-sm flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-accent" />
                Featured Event
              </span>
            </div>
            <div className="flex lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
                  {upcomingResolved?.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ">
                    {upcomingResolved?.title.split(" ")[-1]}
                  </span>
                </h3>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed w-150">
                  {upcomingResolved?.description}
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: Calendar,
                      text: formatDate(upcomingResolved.startTime),
                    },
                    {
                      icon: Clock,
                      text: formatTimeRange(
                        upcomingResolved.startTime,
                        upcomingResolved.endTime,
                      ),
                    },
                    { icon: MapPin, text: upcomingResolved.location },
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

                <a
                  href={upcomingEventRegistration?.url}
                  target="_blank" // Opens in new tab
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    {upcomingEventRegistration?.label}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </a>
              </div>

              {/* Countdown Timer */}
              <div className="text-center space-y-8">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-foreground">
                    Event Starts In:
                  </h4>
                  <div className="w-16 h-1 bg-gradient-to-r from-accent/20 to-accent mx-auto rounded-full"></div>
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
                      <div className="text-3xl sm:text-4xl font-black text-accent">
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
            onClick={() => router.push(eventsLinkResolved?.url || "/events")}
          >
            {eventsLinkResolved?.label}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
