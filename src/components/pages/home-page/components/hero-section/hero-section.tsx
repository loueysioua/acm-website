"use client";

import type React from "react";
import { Button } from "@/components/shared/ui/button";
import { ArrowRight, Code, Users, Trophy, Mouse } from "lucide-react";
import Image from "next/image";
import { HeroSectionBackground } from "./components";
import { GeometricRain } from "@/components/shared";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #01b1cd 0%, #035294 50%, #003d5b 100%)",
        backgroundColor: "#003d5b",
      }}
    >
      <GeometricRain />

      {/* Floating shapes */}
      <HeroSectionBackground />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div
            className="mb-1 flex justify-center animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-60 h-60 relative">
              <Image
                src="/logos/logo-full-white.png"
                alt="ACM INSAT Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-balance animate-fade-in-up"
            style={{
              animationDelay: "0.4s",
              color: "#ffffff",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            ACM INSAT
            <span
              className="block"
              style={{
                color: "#ffb703",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
              }}
            >
              Student Chapter
            </span>
          </h1>

          <p
            className="text-xl sm:text-2xl lg:text-3xl mb-8 text-pretty animate-fade-in-up"
            style={{
              animationDelay: "0.6s",
              color: "#ffffff",
              opacity: 0.95,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Empowering the Next Generation of Innovators
          </p>

          <p
            className="text-lg mb-12 max-w-2xl mx-auto text-pretty animate-fade-in-up"
            style={{
              animationDelay: "0.8s",
              color: "#ffffff",
              opacity: 0.9,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Join one of the largest computer science organizations dedicated to
            competitive programming, AI, web development, and cloud computing.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg btn-enhanced animate-pulse-glow font-semibold"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg btn-enhanced font-semibold bg-transparent"
              style={{
                borderColor: "#ffffff",
                borderWidth: "2px",
                color: "#ffffff",
                backgroundColor: "transparent",
              }}
            >
              Join Us Today
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div
              className="flex flex-col items-center animate-slide-in-left"
              style={{ animationDelay: "1.2s" }}
            >
              <Users className="h-8 w-8 text-accent mb-2" />
              <div
                className="text-2xl font-bold"
                style={{
                  color: "#ffffff",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                200+
              </div>
              <div
                style={{
                  color: "#ffffff",
                  opacity: 0.85,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Members
              </div>
            </div>
            <div
              className="flex flex-col items-center animate-scale-in"
              style={{ animationDelay: "1.4s" }}
            >
              <Trophy className="h-8 w-8 text-accent mb-2" />
              <div
                className="text-2xl font-bold"
                style={{
                  color: "#ffffff",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                15+
              </div>
              <div
                style={{
                  color: "#ffffff",
                  opacity: 0.85,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Competitions
              </div>
            </div>
            <div
              className="flex flex-col items-center animate-slide-in-right"
              style={{ animationDelay: "1.6s" }}
            >
              <Code className="h-8 w-8 text-accent mb-2" />
              <div
                className="text-2xl font-bold"
                style={{
                  color: "#ffffff",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                50+
              </div>
              <div
                style={{
                  color: "#ffffff",
                  opacity: 0.85,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Workshops
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Mouse className="w-10 h-14  transition-colors duration-300 text-white/70 hover:text-white" />
      </div>
    </section>
  );
}
