import { Button } from "@/components/shared/ui/button";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Badge } from "@/components/shared/ui/badge";
import { Trophy, Users, Calendar, ArrowRight } from "lucide-react";
import { BackgroundShapes } from "@/components/shared";

export default function ImpactSection() {
  const achievements = [
    {
      title: "ACPC 2024 Participation",
      description:
        "Proudly represented INSAT with 2 competitive teams in the Arab Collegiate Programming Contest",
      icon: Trophy,
      badge: "Recent Achievement",
      bgcolor: "bg-accent/10",
      color: "text-accent",
      hoverColor: "group-hover:text-accent",
    },
    {
      title: "Winter Cup 8.0",
      description:
        "Successfully organized our flagship competitive programming contest with record participation",
      icon: Calendar,
      badge: "Annual Event",
      color: "text-primary",
      bgcolor: "bg-primary/10",
      hoverColor: "group-hover:text-primary",
    },
    {
      title: "Community Growth",
      description:
        "Built a thriving community of 6K+ followers across social media platforms",
      icon: Users,
      badge: "Milestone",
      color: "text-secondary",
      bgcolor: "bg-secondary/10",
      hoverColor: "group-hover:text-secondary",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-muted/30">
      <BackgroundShapes />

      <div className="relative container z-10 mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Our <span className="text-primary">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our latest achievements and the positive impact we&apos;re
            making in the computer science community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-500 hover:shadow-lg group hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${achievement.bgcolor} ${achievement.color}`}
                  >
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {achievement.badge}
                  </Badge>
                </div>
                <h3
                  className={`font-semibold  text-foreground mb-3 ${achievement.hoverColor} transition-colors`}
                >
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="glass-button text-primary px-10 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            See More Achievements
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
