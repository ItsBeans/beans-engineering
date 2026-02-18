"use client";
import { useEffect, useRef } from "react";

export default function MorphingBlob() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const path = svg.querySelector("path");
    if (!path) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = svg.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      // Subtle morphing based on mouse position
      const morph = `M${50 + x * 0.01},${50 + y * 0.01} Q${60 + x * 0.02},${40 + y * 0.02} ${70 + x * 0.01},${50 + y * 0.01} T${50 + x * 0.01},${50 + y * 0.01} Z`;
      path.setAttribute("d", morph);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 200 200"
        className="w-full h-full max-w-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(26, 26, 26, 0.1)" />
            <stop offset="50%" stopColor="rgba(107, 114, 128, 0.15)" />
            <stop offset="100%" stopColor="rgba(26, 26, 26, 0.05)" />
          </linearGradient>
        </defs>
        <path
          d="M50,50 Q60,40 70,50 T50,50 Z"
          fill="url(#blobGradient)"
          className="blur-2xl"
          style={{
            filter: "blur(40px)",
            animation: "morph 8s ease-in-out infinite",
          }}
        />
      </svg>
      <style jsx>{`
        @keyframes morph {
          0%, 100% {
            d: path("M50,50 Q60,40 70,50 T50,50 Z");
          }
          25% {
            d: path("M45,55 Q55,35 75,45 T45,55 Z");
          }
          50% {
            d: path("M55,45 Q65,55 65,45 T55,45 Z");
          }
          75% {
            d: path("M50,50 Q70,30 70,50 T50,50 Z");
          }
        }
      `}</style>
    </div>
  );
}
