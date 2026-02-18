"use client";
import { useEffect, useRef } from "react";

export default function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const orbs = container.querySelectorAll(".orb");
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      orbs.forEach((orb, index) => {
        const element = orb as HTMLElement;
        const speed = (index + 1) * 0.1;
        element.style.transform = `translate(${x * speed * 20}px, ${y * speed * 20}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-96 flex items-center justify-center">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="orb absolute rounded-full opacity-20 blur-2xl"
          style={{
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            background: `radial-gradient(circle, rgba(26, 26, 26, ${0.15 - i * 0.03}) 0%, transparent 70%)`,
            animation: `float ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
