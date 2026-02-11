"use client";
import { Button } from "@/components/shared/ui/button";
import { ArrowRight } from "lucide-react";
import { TypeCommitteeSkeleton } from "@/types/contentful";
import { Entry } from "contentful";
import { getAssetUrl, isResolvedEntry } from "@/lib/api/api.utils";
import Hexagon from "./components/hexagon-element";

interface TeamProps {
  data: Entry<TypeCommitteeSkeleton, undefined, string>;
}

export default function TeamSection({ data }: TeamProps) {
  const { title, description, committeeMembers, callToAction } = data.fields;
  const committeeMembersResolved =
    committeeMembers?.filter((item) => isResolvedEntry(item)) ?? [];
  const callToActionResolved = isResolvedEntry(callToAction)
    ? callToAction.fields
    : null;
  const teamMembers = committeeMembersResolved.map((member, index) => {
    return {
      id: index + 1,
      name: member.fields.name,
      role: member.fields.position,
      image: getAssetUrl(member.fields.picture) || "placeholder-user.jpg",
      facebook: member.fields.facebookLink,
      email: member.fields.email,
    };
  });

  const getHiveRows = (members: typeof teamMembers) => {
    const rows = [];
    let i = 0;
    let rowIndex = 0;
    const pattern = [5, 4];

    while (i < members.length) {
      const rowSize = pattern[rowIndex % pattern.length];

      // Slice the next chunk of members
      const chunk = members.slice(i, i + rowSize);
      rows.push(chunk);
      i += rowSize;
      rowIndex++;
    }
    return rows;
  };

  const rows = getHiveRows(teamMembers);

  return (
    <section className="py-20 bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="glass-bg-element top-10 left-10"></div>
        <div className="glass-bg-element bottom-20 right-20"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {title.split(" ")[0] + " " + title.split(" ")[1]}{" "}
            <span className="text-primary">{title.split(" ")[2]}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-center w-full">
          {rows.map((rowMembers, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex justify-center items-center flex-wrap gap-4"
              style={{
                // Negative margin pulls the rows together to lock the hexagons
                marginTop: rowIndex > 0 ? -45 : 0,
                // Determine z-index to ensure proper hover overlap
                zIndex: 10 - rowIndex,
                width: "100%",
              }}
            >
              {rowMembers.map((member) => (
                <div
                  key={member.id}
                  className="relative transition-transform hover:z-50"
                >
                  <Hexagon member={member} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <a
            href={callToActionResolved?.url}
            target="_blank" // Opens in new tab
            rel="noopener noreferrer" // Security best practice for new tabs
          >
            <Button className="glass-button text-primary h-12 w-50 hover:scale-105 ">
              {callToActionResolved?.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
