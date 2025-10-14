"use client";

import { Card, CardContent } from "@/components/shared/ui/card";
import Image from "next/image";

export function PartnersSection() {
  const partners = [
    {
      name: "NVIDIA",
      logo: "/shapes/nvidia-badge.svg",
      description: "AI and GPU Computing Partner",
    },
    {
      name: "INSAT",
      logo: "/insat-university-logo.jpg",
      description: "Academic Institution",
    },
    {
      name: "Microsoft",
      logo: "/microsoft-logo.png",
      description: "Technology Partner",
    },
    {
      name: "Google",
      logo: "/google-logo.png",
      description: "Cloud Platform Partner",
    },
    {
      name: "GitHub",
      logo: "/github-logo.png",
      description: "Development Platform",
    },
    {
      name: "JetBrains",
      logo: "/jetbrains-logo.jpg",
      description: "IDE Partner",
    },
  ];

  return (
    <section className="py-20 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="glass-bg-element top-20 right-10"></div>
        <div className="glass-bg-element bottom-10 left-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Our Partners & <span className="text-primary">Sponsors</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We're proud to collaborate with industry leaders and academic
            institutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <Card key={index} className="glass-card group">
              <CardContent className="p-6 text-center">
                <div className="relative w-full h-16 mb-4 flex items-center justify-center">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-muted-foreground text-pretty">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 overflow-hidden glass-card p-8">
          <div className="flex animate-scroll space-x-12">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-16 relative opacity-50"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
