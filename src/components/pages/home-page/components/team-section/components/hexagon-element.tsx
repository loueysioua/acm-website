import { Linkedin, Mail } from "lucide-react";

export default function Hexagon({
  member = {
    name: "Team Member",
    role: "Position",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    linkedin: "https://linkedin.com",
    email: "contact@example.com",
  },
  hexWidth = 200,
  hexHeight = 220,
}) {
  const padding = 0;

  return (
    <div className="flex items-center justify-center">
      <style>{`
        @keyframes hexagonFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .group:hover .hexagon-overlay {
          animation: hexagonFadeIn 0.4s ease-out forwards;
        }

        .group:hover {
          transform: scale(1.1);
        }

        .group {
          transition: transform 0.3s ease-out;
        }
      `}</style>
      <div
        className="group relative"
        style={{ width: hexWidth, height: hexHeight }}
      >
        {/* SVG Hexagon Container */}
        <svg
          width={hexWidth}
          height={hexHeight}
          viewBox={`0 0 ${hexWidth} ${hexHeight}`}
          className="absolute inset-0"
          style={{
            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
          }}
        >
          <defs>
            <linearGradient
              id="hexagon-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#01b1cd", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ffb703", stopOpacity: 0.3 }}
              />
            </linearGradient>
            <clipPath id="hexagon-clip">
              <polygon
                points={`${hexWidth / 2},${padding} ${hexWidth},${
                  hexHeight * 0.25
                } ${hexWidth - padding},${hexHeight * 0.75} ${hexWidth / 2},${
                  hexHeight - padding
                } ${padding},${hexHeight * 0.75} ${padding},${
                  hexHeight * 0.25
                }`}
              />
            </clipPath>
          </defs>

          {/* Image with clip path */}
          <image
            href={member.image}
            x="0"
            y="0"
            width={hexWidth}
            height={hexHeight}
            clipPath="url(#hexagon-clip)"
            className="group-hover:brightness-50 transition-all duration-300"
            preserveAspectRatio="xMidYMid slice"
          />

          {/* Hexagon border - appears on hover */}
          <polygon
            points={`${hexWidth / 2},${padding} ${hexWidth - padding},${
              hexHeight * 0.25
            } ${hexWidth - padding},${hexHeight * 0.75} ${hexWidth / 2},${
              hexHeight - padding
            } ${padding},${hexHeight * 0.75} ${padding},${hexHeight * 0.25}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-acm-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </svg>

        {/* Info Overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none hexagon-overlay"
          style={{
            width: hexWidth,
            height: hexHeight,
            clipPath: `polygon(50% ${(padding / hexHeight) * 100}%, ${
              ((hexWidth - padding) / hexWidth) * 100
            }% 25%, ${((hexWidth - padding) / hexWidth) * 100}% 75%, 50% ${
              ((hexHeight - padding) / hexHeight) * 100
            }%, ${(padding / hexWidth) * 100}% 75%, ${
              (padding / hexWidth) * 100
            }% 25%)`,
            background:
              "linear-gradient(135deg, rgba(3, 82, 148, 0.4) 0%, rgba(1, 177, 205, 0.4) 100%)",
          }}
        >
          <div className="text-center px-3">
            <h3 className="font-bold text-white text-base mb-2 line-clamp-2">
              {member.name}
            </h3>
            <p className="text-acm-blue text-sm font-semibold mb-4">
              {member.role}
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/25 hover:bg-white/40 rounded-full backdrop-blur-md transition-all duration-200 pointer-events-auto hover:scale-110 transform"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a
                href={`mailto:${member.email}`}
                className="p-2 bg-white/25 hover:bg-white/40 rounded-full backdrop-blur-md transition-all duration-200 pointer-events-auto hover:scale-110 transform"
              >
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
