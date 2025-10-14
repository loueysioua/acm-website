"use client";

import { useEffect, useState } from "react";

interface Shape {
  id: number;
  type: "hexagon" | "triangle" | "square";
  size: number;
  x: number;
  y: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
}

export default function GeometricRain() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const createShape = (id: number): Shape => ({
      id,
      type: ["hexagon", "triangle", "square"][
        Math.floor(Math.random() * 3)
      ] as Shape["type"],
      size: Math.random() * 70 + 10, // 10-80px
      x: Math.random() * window.innerWidth,
      y: -100,
      speed: Math.random() * 3 + 0.5, // 0.5-3.5px per frame
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3, // -1.5 to 1.5 degrees per frame
    });

    const initialShapes = Array.from({ length: 40 }, (_, i) => ({
      ...createShape(i),
      y: Math.random() * window.innerHeight - 100,
    }));
    setShapes(initialShapes);

    let animationId: number;
    let shapeId = 40;

    const animate = () => {
      setShapes((prevShapes) => {
        const updatedShapes = prevShapes
          .map((shape) => ({
            ...shape,
            y: shape.y + shape.speed,
            rotation: shape.rotation + shape.rotationSpeed,
          }))
          .filter((shape) => shape.y < window.innerHeight + 150);

        if (Math.random() < 0.04 && updatedShapes.length < 50) {
          updatedShapes.push(createShape(shapeId++));
        }

        return updatedShapes;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const renderShape = (shape: Shape) => {
    const style = {
      position: "absolute" as const,
      left: shape.x,
      top: shape.y,
      width: shape.size,
      height: shape.size,
      transform: `rotate(${shape.rotation}deg)`,
      opacity: 0.25,
      pointerEvents: "none" as const,
    };

    switch (shape.type) {
      case "hexagon":
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,5 85,25 85,75 50,95 15,75 15,25"
                fill="none"
                stroke="#01B1CD"
                strokeWidth="4"
              />
            </svg>
          </div>
        );
      case "triangle":
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="#FFB703"
                strokeWidth="4"
              />
            </svg>
          </div>
        );
      case "square":
        return (
          <div
            key={shape.id}
            style={style}
            className="border-4 border-white/70 rotate-45"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map(renderShape)}
    </div>
  );
}
