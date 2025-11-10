"use client";
import { Button } from "@/components/shared/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Hexagon from "./components/hexagon-element";

export default function TeamSection() {
  const teamMembers = useMemo(
    () => [
      {
        id: 1,
        name: "Ahmed Ben Ali",
        role: "President",
        image: "/professional-headshot-of-young-male-computer-scien.jpg",
        linkedin: "#",
        email: "president@acm.insat.tn",
      },
      {
        id: 2,
        name: "Fatima Zahra",
        role: "Vice President",
        image: "/professional-headshot-of-young-female-computer-sci.jpg",
        linkedin: "#",
        email: "vp@acm.insat.tn",
      },
      {
        id: 3,
        name: "Mohamed Slim",
        role: "Technical Lead",
        image: "/professional-headshot-of-young-male-programmer.jpg",
        linkedin: "#",
        email: "tech@acm.insat.tn",
      },
      {
        id: 4,
        name: "Ines Karray",
        role: "Events Coordinator",
        image: "/professional-headshot-of-young-female-event-coordi.jpg",
        linkedin: "#",
        email: "events@acm.insat.tn",
      },
      {
        id: 5,
        name: "Youssef Mansouri",
        role: "Marketing Director",
        image: "/professional-headshot-of-young-male-marketing-dire.jpg",
        linkedin: "#",
        email: "marketing@acm.insat.tn",
      },
      {
        id: 6,
        name: "Nour Eddine",
        role: "Treasurer",
        image: "/professional-headshot-of-young-male-treasurer.jpg",
        linkedin: "#",
        email: "treasurer@acm.insat.tn",
      },
      {
        id: 6,
        name: "Nour Eddine",
        role: "Treasurer",
        image: "/professional-headshot-of-young-male-treasurer.jpg",
        linkedin: "#",
        email: "treasurer@acm.insat.tn",
      },
    ],
    []
  );

  const HEXAGON_WIDTH = 220;
  const HALF_HEXAGON = HEXAGON_WIDTH / 2;

  const [rows, setRows] = useState<React.JSX.Element[][]>([]);

  useEffect(() => {
    const newRows: React.JSX.Element[][] = [];
    let memberIndex = 0;
    let rowNumber = 0;

    while (memberIndex < teamMembers.length) {
      const currentRow: React.JSX.Element[] = [];
      const isOddRow = rowNumber % 2 === 1;
      const hexagonsInRow = isOddRow ? 3 : 4;

      // Add left padding for odd rows (3 hexagon rows)
      if (isOddRow) {
        currentRow.push(
          <div
            key={`left-padding-${rowNumber}`}
            style={{ width: HALF_HEXAGON }}
          />
        );
      }

      // Add hexagons (fill slots even with placeholders)
      for (let i = 0; i < hexagonsInRow; i++) {
        if (memberIndex < teamMembers.length) {
          currentRow.push(
            <Hexagon
              key={`member-${memberIndex}`}
              member={teamMembers[memberIndex]}
            />
          );
          memberIndex++;
        } else {
          // Add invisible placeholder to maintain structure
          currentRow.push(
            <div
              key={`placeholder-${rowNumber}-${i}`}
              style={{
                width: HEXAGON_WIDTH - 20,
                visibility: "hidden",
              }}
            />
          );
        }
      }

      // Add right padding for odd rows to maintain symmetry
      if (isOddRow) {
        currentRow.push(
          <div
            key={`right-padding-${rowNumber}`}
            style={{ width: HALF_HEXAGON }}
          />
        );
      }

      newRows.push(currentRow);
      rowNumber++;
    }

    setRows(newRows);
  }, [HALF_HEXAGON, teamMembers, HEXAGON_WIDTH]);

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

        <div className="flex flex-col items-center">
          {rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex justify-center items-center gap-4"
              style={{
                marginTop: rowIndex > 0 ? -42 : 0,
              }}
            >
              {row.map((element, idx) => (
                <div key={`element-${idx}`}>{element}</div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Button className="glass-button text-primary h-12 w-50 hover:scale-105 ">
            Join Our Team
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
