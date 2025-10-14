import { Card, CardContent } from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { Linkedin, Mail, ArrowRight } from "lucide-react";

export function TeamSection() {
  const teamMembers = [
    {
      name: "Ahmed Ben Ali",
      role: "President",
      image: "/professional-headshot-of-young-male-computer-scien.jpg",
      linkedin: "#",
      email: "president@acm.insat.tn",
    },
    {
      name: "Fatima Zahra",
      role: "Vice President",
      image: "/professional-headshot-of-young-female-computer-sci.jpg",
      linkedin: "#",
      email: "vp@acm.insat.tn",
    },
    {
      name: "Mohamed Slim",
      role: "Technical Lead",
      image: "/professional-headshot-of-young-male-programmer.jpg",
      linkedin: "#",
      email: "tech@acm.insat.tn",
    },
    {
      name: "Ines Karray",
      role: "Events Coordinator",
      image: "/professional-headshot-of-young-female-event-coordi.jpg",
      linkedin: "#",
      email: "events@acm.insat.tn",
    },
    {
      name: "Youssef Mansouri",
      role: "Marketing Director",
      image: "/professional-headshot-of-young-male-marketing-dire.jpg",
      linkedin: "#",
      email: "marketing@acm.insat.tn",
    },
    {
      name: "Nour Eddine",
      role: "Treasurer",
      image: "/professional-headshot-of-young-male-treasurer.jpg",
      linkedin: "#",
      email: "treasurer@acm.insat.tn",
    },
  ];

  return (
    <section className="py-20 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="glass-bg-element top-10 left-10"></div>
        <div className="glass-bg-element bottom-20 right-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Meet the <span className="text-primary">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get to know the passionate individuals leading ACM INSAT Student
            Chapter.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="glass-card group">
              <CardContent className="p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-muted ring-2 ring-white/20">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-4">
                  {member.role}
                </p>

                <div className="flex justify-center space-x-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="p-2 h-8 w-8 glass-button bg-transparent"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="p-2 h-8 w-8 glass-button bg-transparent"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="glass-button-primary">
            Join Our Team
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
