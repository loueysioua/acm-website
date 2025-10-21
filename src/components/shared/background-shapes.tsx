import {
  CircuitShape,
  DiamondShape,
  HexagonShape,
} from "@/components/shared/decorative-shapes";

export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <DiamondShape
        className="absolute top-20 left-10 text-accent opacity-5 animate-float"
        size="w-32 h-32"
        style={{
          animationDelay: "0s",
          animationDuration: "6s",
        }}
      />
      <HexagonShape
        className="absolute top-40 right-20 text-primary opacity-8 animate-float"
        size="w-24 h-24"
        style={
          {
            animationDelay: "2s",
            animationDuration: "5s",
          } as React.CSSProperties
        }
      />
      <CircuitShape
        className="absolute bottom-40 left-20 text-accent opacity-4 animate-float"
        size="w-28 h-28"
        style={
          {
            animationDelay: "4s",
            animationDuration: "7s",
          } as React.CSSProperties
        }
      />

      {/* Medium decorative shapes */}
      <DiamondShape
        className="absolute top-60 left-1/3 text-primary opacity-6 animate-float"
        size="w-16 h-16"
        style={
          {
            animationDelay: "1s",
            animationDuration: "4s",
          } as React.CSSProperties
        }
      />

      <HexagonShape
        className="absolute top-80 left-1/6 text-primary opacity-9 animate-float"
        size="w-20 h-20"
        style={
          {
            animationDelay: "3s",
            animationDuration: "5.5s",
          } as React.CSSProperties
        }
      />

      <HexagonShape
        className="absolute bottom-60 right-1/4 text-secondary opacity-5 animate-float"
        size="w-20 h-20"
        style={
          {
            animationDelay: "3s",
            animationDuration: "5.5s",
          } as React.CSSProperties
        }
      />

      {/* Small decorative shapes */}
      <CircuitShape
        className="absolute top-32 right-1/3 text-primary opacity-3 animate-float"
        size="w-12 h-12"
        style={
          {
            animationDelay: "5s",
            animationDuration: "4.5s",
          } as React.CSSProperties
        }
      />
      <DiamondShape
        className="absolute bottom-32 left-1/2 text-accent opacity-15 animate-float"
        size="w-14 h-14"
        style={
          {
            animationDelay: "1.5s",
            animationDuration: "6.5s",
          } as React.CSSProperties
        }
      />

      <DiamondShape
        className="absolute bottom-10 right-20 text-accent opacity-10 animate-float"
        size="w-24 h-24"
        style={
          {
            animationDelay: "2s",
            animationDuration: "5s",
          } as React.CSSProperties
        }
      />

      <HexagonShape
        className="absolute bottom-15 left-1/3 text-primary opacity-7 animate-float"
        size="w-30 h-30"
        style={
          {
            animationDelay: "5s",
            animationDuration: "4.5s",
          } as React.CSSProperties
        }
      />

      <CircuitShape
        className="absolute bottom-30 left-10 text-accent opacity-30 animate-float"
        size="w-12 h-12"
        style={
          {
            animationDelay: "5s",
            animationDuration: "4.5s",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
