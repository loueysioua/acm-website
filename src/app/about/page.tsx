"use client";

import React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Badge } from "@/components/shared/ui/badge";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  Linkedin,
  Facebook,
  Trophy,
  Users,
  Code,
  Brain,
  Globe,
  Server,
  Target,
  Lightbulb,
  Heart,
  Star,
  Zap,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Award,
  Rocket,
  BookOpen,
  Shield,
} from "lucide-react";
import Image from "next/image";

// ─── Types ──────────────────────────────────────────────────────────────────

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  email?: string;
  expertise?: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const milestones = [
  {
    year: "2017",
    month: "April",
    title: "Foundation",
    description:
      "ACM INSAT Student Chapter established as the first Tunisian university branch of ACM.",
    icon: Star,
    color: "primary",
  },
  {
    year: "2018",
    month: "December",
    title: "Hour of Code — 1st Edition",
    description:
      "A kid-friendly initiative introducing programming and problem-solving through simple challenges.",
    icon: Code,
    color: "accent",
  },
  {
    year: "2019",
    month: "January",
    title: "Winter Cup — 1st Edition",
    description:
      "Launch of the chapter's flagship competitive programming contest.",
    icon: Trophy,
    color: "secondary",
  },
  {
    year: "2022",
    month: "March",
    title: "Cloud Axis Launch",
    description:
      "New initiative focused on cloud computing technologies and their applications.",
    icon: Server,
    color: "primary",
  },
  {
    year: "2023",
    month: "December",
    title: "TCPC — 2nd Place",
    description:
      "Secured second place at the Tunisian Collegiate Programming Contest.",
    icon: Award,
    color: "accent",
  },
  {
    year: "2023",
    month: "October",
    title: "CodeQuest — 1st Edition",
    description:
      "Beginner-friendly competitive programming competition for newcomers.",
    icon: Rocket,
    color: "secondary",
  },
  {
    year: "2024",
    month: "March",
    title: "NVIDIA Funded Workshop",
    description:
      "Partnership with NVIDIA for an exclusive, fully-funded workshop for students.",
    icon: Zap,
    color: "primary",
  },
  {
    year: "2024",
    month: "November",
    title: "TCPC — 6 Medals & 2 Winning Teams",
    description:
      "Significant success at TCPC: six medals earned including two winning teams.",
    icon: Trophy,
    color: "accent",
  },
];

const axes = [
  {
    id: "cp",
    icon: Code,
    title: "Competitive Programming",
    shortTitle: "CP",
    color: "primary",
    description:
      "A problem-solving discipline where participants write efficient code to solve algorithmic challenges under time constraints.",
    skills: [
      "Algorithmic Thinking",
      "Efficiency & Optimization",
      "Resilience & Speed",
    ],
    workshops: [
      { name: "Binary Search & Sorting", level: "Beginner" },
      { name: "Time Complexity", level: "Beginner" },
      { name: "Graph Search Algorithms", level: "Intermediate" },
      { name: "Data Structures", level: "Intermediate" },
    ],
    contests: ["TCPC", "ACPC", "ICPC"],
    gradient: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
    bgBadge: "bg-primary/10 text-primary",
  },
  {
    id: "ai",
    icon: Brain,
    title: "Artificial Intelligence",
    shortTitle: "AI",
    color: "accent",
    description:
      "Exploring the future of technology through hands-on AI workshops, exploring machine learning, deep learning, and modern LLM architectures.",
    skills: ["Machine Learning", "Deep Learning", "LLM Engineering"],
    workshops: [
      { name: "LLM Creation & Optimization", level: "Advanced" },
      { name: "Vector Embeddings", level: "Intermediate" },
      { name: "NVIDIA Certified AI", level: "Certified" },
      { name: "Azure ML Workshop", level: "Certified" },
    ],
    contests: [],
    gradient: "from-accent/20 to-accent/5",
    borderColor: "border-accent/30",
    bgBadge: "bg-accent/10 text-accent-foreground",
  },
  {
    id: "web",
    icon: Globe,
    title: "Web Development",
    shortTitle: "Web",
    color: "secondary",
    description:
      "Building modern, full-stack web applications with a focus on best practices, performance, and developer experience.",
    skills: ["Frontend Dev", "Backend Dev", "DevOps"],
    workshops: [
      { name: "Web Dev Fundamentals", level: "Beginner" },
      { name: "React & Next.js", level: "Intermediate" },
      { name: "Git & Version Control", level: "Beginner" },
      { name: "Web Dev Workshop 2023", level: "Certified" },
    ],
    contests: [],
    gradient: "from-secondary/20 to-secondary/5",
    borderColor: "border-secondary/30",
    bgBadge: "bg-secondary/10 text-secondary",
  },
  {
    id: "sysadmin",
    icon: Server,
    title: "System Administration",
    shortTitle: "SysAdmin",
    color: "primary",
    description:
      "The backbone of ACM INSAT's digital infrastructure. Managing servers, network security, and ensuring smooth operations for all events.",
    skills: ["Server Management", "Network Security", "Troubleshooting"],
    workshops: [
      { name: "Linux Fundamentals", level: "Beginner" },
      { name: "Server Deployment", level: "Intermediate" },
      { name: "Network Security", level: "Advanced" },
      { name: "DevOps Pipelines", level: "Advanced" },
    ],
    contests: [],
    gradient: "from-primary/20 to-secondary/5",
    borderColor: "border-primary/30",
    bgBadge: "bg-primary/10 text-primary",
  },
];

const boardMembers: TeamMember[] = [
  {
    id: 1,
    name: "Placeholder Member",
    role: "President",
    image: "/placeholder-user.jpg",
    linkedin: "#",
    email: "president@acminsat.tn",
  },
  {
    id: 2,
    name: "Placeholder Member",
    role: "Vice President",
    image: "/placeholder-user.jpg",
    linkedin: "#",
    email: "vp@acminsat.tn",
  },
  {
    id: 3,
    name: "Placeholder Member",
    role: "General Secretary",
    image: "/placeholder-user.jpg",
    linkedin: "#",
    email: "secretary@acminsat.tn",
  },
  {
    id: 4,
    name: "Placeholder Member",
    role: "Treasurer",
    image: "/placeholder-user.jpg",
    linkedin: "#",
    email: "treasurer@acminsat.tn",
  },
  {
    id: 5,
    name: "Placeholder Member",
    role: "Technical Lead — CP",
    image: "/placeholder-user.jpg",
    linkedin: "#",
    email: "cp@acminsat.tn",
  },
  {
    id: 6,
    name: "Placeholder Member",
    role: "Technical Lead — AI",
    image: "/placeholder-user.jpg",
    linkedin: "#",
    email: "ai@acminsat.tn",
  },
];

const trainers: TeamMember[] = [
  {
    id: 1,
    name: "Trainer Name",
    role: "CP Trainer",
    image: "/placeholder-user.jpg",
    expertise: "Algorithms, Graph Theory, Dynamic Programming",
    linkedin: "#",
    email: "trainer@acminsat.tn",
  },
  {
    id: 2,
    name: "Trainer Name",
    role: "AI Trainer",
    image: "/placeholder-user.jpg",
    expertise: "Machine Learning, LLMs, Neural Networks",
    linkedin: "#",
    email: "trainer@acminsat.tn",
  },
  {
    id: 3,
    name: "Trainer Name",
    role: "SysAdmin Trainer",
    image: "/placeholder-user.jpg",
    expertise: "Linux, Network Security, Docker",
    linkedin: "#",
    email: "trainer@acminsat.tn",
  },
  {
    id: 4,
    name: "Trainer Name",
    role: "Web Dev Trainer",
    image: "/placeholder-user.jpg",
    expertise: "React, Node.js, DevOps",
    linkedin: "#",
    email: "trainer@acminsat.tn",
  },
  {
    id: 5,
    name: "SysAdmin Name",
    role: "System Administrator",
    image: "/placeholder-user.jpg",
    expertise: "Server Infrastructure, Platform Management",
    linkedin: "#",
    email: "sysadmin@acminsat.tn",
  },
];

const missionItems = [
  {
    icon: Target,
    title: "Fostering Skills",
    description:
      "Equip students with technical and soft skills to thrive in competitive programming and the tech industry.",
    color: "primary",
  },
  {
    icon: BookOpen,
    title: "Bridging Theory & Practice",
    description:
      "Organize hands-on workshops, coding competitions, and events to expose students to real-world challenges.",
    color: "accent",
  },
  {
    icon: Heart,
    title: "Building a Community",
    description:
      "Cultivate a strong, inclusive community where members exchange knowledge, collaborate on projects, and grow together.",
    color: "secondary",
  },
  {
    icon: Shield,
    title: "Creating Opportunities",
    description:
      "Provide access to partnerships, collaborations and opportunities for career advancement.",
    color: "primary",
  },
];

// ─── Animated Section Hook ───────────────────────────────────────────────────

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// ─── Section Label ───────────────────────────────────────────────────────────

function SectionLabel({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
      {Icon && <Icon className="h-4 w-4 text-accent" />}
      <span className="text-accent font-semibold text-sm">{children}</span>
    </div>
  );
}

// ─── 1. Hero Section ─────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-background" />

      {/* Enhanced animated blobs with glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse"
          style={{
            boxShadow: "0 0 60px rgba(1, 177, 205, 0.3)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/25 rounded-full blur-3xl animate-pulse"
          style={{
            boxShadow: "0 0 80px rgba(3, 82, 148, 0.3)",
            animation: "float 10s ease-in-out infinite 1s",
            animationDelay: "1.5s",
          }}
        />
        {/* Geometric decorative lines with enhanced visibility */}
        <div className="absolute top-20 right-20 w-px h-40 bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
        <div className="absolute top-20 right-20 h-px w-40 bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
        <div className="absolute bottom-20 left-20 w-px h-40 bg-gradient-to-t from-white/40 via-white/20 to-transparent" />
        <div className="absolute bottom-20 left-20 h-px w-40 bg-gradient-to-l from-white/40 via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <div
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 mb-8 animate-fade-in-up shadow-lg"
          style={{ animationDelay: "0.2s" }}
        >
          <Users className="w-5 h-5 text-accent" />
          <span className="text-sm font-semibold text-white tracking-wide">
            GET TO KNOW US
          </span>
        </div>

        <h1
          className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 animate-fade-in-up text-balance"
          style={{
            animationDelay: "0.4s",
            textShadow: "0 4px 16px rgba(0,0,0,0.5)",
            letterSpacing: "-0.02em",
          }}
        >
          About{" "}
          <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
            ACM INSAT
          </span>
        </h1>

        <p
          className="text-2xl font-semibold text-white/95 mb-6 animate-fade-in-up"
          style={{
            animationDelay: "0.6s",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          Empowering Future Innovators
        </p>

        <p
          className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          The first Tunisian university branch of ACM — building a generation of
          problem-solvers, innovators, and tech leaders since 2017.
        </p>

        {/* Enhanced quick stats */}
        <div
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 pt-8 border-t border-white/20 animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          {[
            { value: "200+", label: "Members" },
            { value: "7+", label: "Years" },
            { value: "15+", label: "Events" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div
                className="text-4xl font-black text-white group-hover:text-accent transition-colors duration-300"
                style={{ textShadow: "0 4px 8px rgba(0,0,0,0.4)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-white/70 mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 2. Club Overview ────────────────────────────────────────────────────────

function OverviewSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <SectionLabel icon={Users}>Who Are We?</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Tunisia&apos;s First{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                ACM Chapter
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The ACM INSAT Student Chapter is the first Tunisian university
              branch of the global Association for Computing Machinery. Founded
              in April 2017 and based at the INSAT campus in Tunis, we&apos;ve
              grown to become the most dynamic competitive programming club in
              the country.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With over 200 active members each year, we focus not only on
              competitive programming but also on computer science as a whole —
              spanning AI, web development, and system administration.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our chapter is dedicated to equipping students with the skills and
              opportunities needed to excel in programming, problem-solving, and
              technology-driven careers.
            </p>
          </div>

          {/* Visual card */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <Card className="relative glass-card border-white/20 rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      {
                        icon: Trophy,
                        label: "National Champions",
                        sub: "TCPC 2024 — 6 Medals",
                        color: "text-accent",
                        bg: "bg-accent/10",
                      },
                      {
                        icon: Users,
                        label: "Strong Community",
                        sub: "200+ Active Members",
                        color: "text-primary",
                        bg: "bg-primary/10",
                      },
                      {
                        icon: Calendar,
                        label: "Years of Excellence",
                        sub: "Founded April 2017",
                        color: "text-secondary",
                        bg: "bg-secondary/10",
                      },
                      {
                        icon: Globe,
                        label: "Global Network",
                        sub: "ACM International",
                        color: "text-primary",
                        bg: "bg-primary/10",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-start gap-3 p-5 rounded-2xl bg-background/50 border border-border/40 hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
                      >
                        <div className={`p-3 rounded-xl ${item.bg}`}>
                          <item.icon className={`h-6 w-6 ${item.color}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            {item.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {item.sub}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. INSAT Presentation ───────────────────────────────────────────────────

function InsatSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <SectionLabel icon={MapPin}>Our Home</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              INSAT
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder — replace with actual campus image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/5 aspect-[4/3] flex items-center justify-center">
              <div className="text-center p-12">
                <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-12 w-12 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">
                  INSAT Campus — Tunis, Tunisia
                </p>
                {/* Replace this div with: <Image src="/insat-campus.jpg" alt="INSAT Campus" fill className="object-cover" /> */}
              </div>
            </div>
          </div>

          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-bold text-foreground">
              National Institute of Applied Science and Technology
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              INSAT is a public engineering school in Tunisia, part of the
              University of Carthage. It offers a multidisciplinary education in
              science, engineering, and technology, combining theoretical
              knowledge with practical experience.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              INSAT provides students with research opportunities, industry
              collaborations, and technical training, preparing them for careers
              in various technological fields.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://insat.rnu.tn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary hover:text-white transition-all duration-300 gap-2 bg-transparent"
                >
                  <Globe className="h-4 w-4" />
                  Official Website
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/school/national-institute-of-applied-science-and-technology/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-300 gap-2 bg-transparent"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
              </a>
              <a
                href="https://www.facebook.com/insat.rnu.tn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-300 gap-2 bg-transparent"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. Mission Section ──────────────────────────────────────────────────────

function MissionSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <SectionLabel icon={Target}>Why We Exist</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Mission
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
            Four pillars that drive everything we do at ACM INSAT.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {missionItems.map((item, index) => (
            <Card
              key={index}
              className={`glass-card border-white/20 hover:border-primary/40 transition-all duration-500 hover:scale-110 hover:shadow-2xl group relative overflow-hidden backdrop-blur-xl ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                boxShadow:
                  "0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-8 text-center space-y-5">
                <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-lg">
                  <item.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg leading-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. Timeline / Milestones ─────────────────────────────────────────────────

function TimelineSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <SectionLabel icon={Calendar}>Since 2017</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Our Journey &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Milestones
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
            Seven years of growth, competition, and community.
          </p>
        </div>

        {/* Desktop: Alternating vertical timeline */}
        <div className="relative max-w-4xl mx-auto hidden md:block">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 -translate-x-1/2" />

          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex items-center mb-12 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Card */}
                <div className="w-[calc(50%-2.5rem)]">
                  <Card
                    className={`glass-card border-white/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:scale-105 group backdrop-blur-xl ${
                      isLeft ? "mr-4" : "ml-4"
                    }`}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      boxShadow:
                        "0 8px 32px rgba(31, 38, 135, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 shadow-md">
                          <milestone.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <Badge
                              variant="secondary"
                              className="text-xs bg-primary/15 text-primary border border-primary/30 font-semibold"
                            >
                              {milestone.year}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-medium">
                              {milestone.month}
                            </span>
                          </div>
                          <h3 className="font-bold text-foreground mb-2 text-sm">
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30 z-10" />
              </div>
            );
          })}
        </div>

        {/* Mobile: Vertical cards */}
        <div className="grid gap-4 md:hidden">
          {milestones.map((milestone, index) => (
            <Card
              key={index}
              className={`glass-card border-white/20 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
                    <milestone.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary border-none mb-2"
                    >
                      {milestone.month} {milestone.year}
                    </Badge>
                    <h3 className="font-bold text-foreground mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. Axes of Focus ────────────────────────────────────────────────────────

function AxesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeAxis, setActiveAxis] = useState(axes[0].id);
  const active = axes.find((a) => a.id === activeAxis)!;

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <SectionLabel icon={Zap}>What We Do</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Axes of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Focus
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
            Four pillars of technical expertise driving our activities.
          </p>
        </div>

        {/* Tab selector */}
        <div
          className={`flex flex-wrap gap-3 justify-center mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {axes.map((axis) => (
            <button
              key={axis.id}
              onClick={() => setActiveAxis(axis.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeAxis === axis.id
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                  : "bg-background/60 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border/40"
              }`}
            >
              <axis.icon className="h-4 w-4" />
              {axis.shortTitle}
            </button>
          ))}
        </div>

        {/* Active axis detail */}
        <div
          className={`transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main description */}
            <Card
              className={`lg:col-span-2 glass-card border-white/20 bg-gradient-to-br ${active.gradient}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-background/60">
                    <active.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-foreground">
                      {active.title}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {active.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {active.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Contests (CP only) */}
                {active.contests.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Competitions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {active.contests.map((contest) => (
                        <Badge
                          key={contest}
                          variant="secondary"
                          className="bg-accent/10 text-accent-foreground text-sm px-3 py-1"
                        >
                          {contest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Workshops list */}
            <Card className="glass-card border-white/20">
              <CardContent className="p-6">
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Workshops
                </h4>
                <div className="space-y-3">
                  {active.workshops.map((ws, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-background/60 border border-border/30 hover:border-primary/30 transition-colors group"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {ws.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-xs shrink-0 ml-2 ${
                          ws.level === "Certified"
                            ? "bg-accent/15 text-accent-foreground"
                            : ws.level === "Beginner"
                            ? "bg-success/10 text-success"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {ws.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Overview grid — all 4 axes mini cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {axes.map((axis, index) => (
            <Card
              key={axis.id}
              onClick={() => setActiveAxis(axis.id)}
              className={`glass-card border-white/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group ${
                activeAxis === axis.id
                  ? "border-primary/50 shadow-lg shadow-primary/10"
                  : "hover:border-primary/30"
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${400 + index * 80}ms` }}
            >
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <axis.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-sm">
                  {axis.title}
                </h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. Meet the Team ─────────────────────────────────────────────────────────

function TeamSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [trainerSlide, setTrainerSlide] = useState(0);
  const trainersPerPage = 3;
  const totalPages = Math.ceil(trainers.length / trainersPerPage);

  const visibleTrainers = trainers.slice(
    trainerSlide * trainersPerPage,
    (trainerSlide + 1) * trainersPerPage,
  );

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <SectionLabel icon={Users}>The People Behind It</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Meet the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Team
            </span>
          </h2>
        </div>

        {/* Board Members */}
        <div
          className={`mb-20 transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Trophy className="h-6 w-6 text-accent" />
            Board Members
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {boardMembers.map((member, index) => (
              <Card
                key={member.id}
                className={`glass-card border-white/20 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-xl group text-center ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 80}ms` }}
              >
                <CardContent className="p-5">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h4 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {member.role}
                  </p>
                  <div className="flex justify-center gap-2">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        <Linkedin className="h-3 w-3 text-primary group-hover:text-white" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        <Mail className="h-3 w-3 text-primary" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trainers & SysAdmins Carousel */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Star className="h-6 w-6 text-accent" />
              Trainers & System Administrators
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl border-border/40 hover:border-primary/40 hover:bg-primary/5 bg-transparent"
                onClick={() =>
                  setTrainerSlide((p) => (p - 1 + totalPages) % totalPages)
                }
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl border-border/40 hover:border-primary/40 hover:bg-primary/5 bg-transparent"
                onClick={() => setTrainerSlide((p) => (p + 1) % totalPages)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleTrainers.map((trainer, index) => (
              <Card
                key={trainer.id}
                className="glass-card border-white/20 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-xl group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative w-14 h-14 flex-shrink-0">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-secondary opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                      <Image
                        src={trainer.image || "/placeholder.svg"}
                        alt={trainer.name}
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {trainer.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {trainer.role}
                      </p>
                      {trainer.expertise && (
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {trainer.expertise}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {trainer.linkedin && (
                      <a
                        href={trainer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        <Linkedin className="h-3 w-3 text-primary" />
                      </a>
                    )}
                    {trainer.email && (
                      <a
                        href={`mailto:${trainer.email}`}
                        className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        <Mail className="h-3 w-3 text-primary" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setTrainerSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === trainerSlide
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 8. Vision Section ───────────────────────────────────────────────────────

function VisionSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Hero-style background */}
      <div className="absolute inset-0 hero-background opacity-90" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Lightbulb className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white">
              Looking Ahead
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-8"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
          >
            Our <span className="text-accent">Vision</span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <p
              className="text-xl text-white/85 leading-relaxed mb-10"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
            >
              At ACM INSAT, we are committed to spreading the culture of
              competitive programming beyond our university. Our goal is to
              inspire a passion for algorithmic thinking and problem-solving
              throughout Tunisia — engaging not only university students but
              also younger generations, including elementary school pupils.
            </p>
            <p
              className="text-xl text-white/85 leading-relaxed"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
            >
              We aim to make competitive programming accessible to all by
              creating a collaborative and inclusive environment that empowers
              the next wave of creative thinkers and innovators.
            </p>
          </div>

          {/* Vision pillars */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
            {[
              {
                icon: Globe,
                title: "National Reach",
                desc: "Spread CP culture across all of Tunisia",
              },
              {
                icon: Users,
                title: "All Ages",
                desc: "From elementary school to university",
              },
              {
                icon: Heart,
                title: "Inclusive Community",
                desc: "Accessible to every aspiring innovator",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-400 hover:scale-110 hover:shadow-2xl group ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${200 + i * 100}ms`,
                  boxShadow:
                    "0 8px 32px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                <item.icon className="h-10 w-10 text-accent mx-auto mb-4 group-hover:scale-125 transition-transform duration-300" />
                <h4 className="font-bold text-white mb-3 text-lg">
                  {item.title}
                </h4>
                <p className="text-sm text-white/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className={`mt-14 transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg font-bold rounded-2xl shadow-lg shadow-accent/30 animate-pulse-glow btn-enhanced gap-3"
            >
              Join ACM INSAT
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <OverviewSection />
      <InsatSection />
      <MissionSection />
      <TimelineSection />
      <AxesSection />
      <TeamSection />
      <VisionSection />
    </main>
  );
}
