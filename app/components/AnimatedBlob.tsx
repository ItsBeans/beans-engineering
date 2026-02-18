"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      
      blob.style.transform = `translate(${x * 0.1}%, ${y * 0.1}%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <div
        ref={blobRef}
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, rgba(26, 26, 26, 0.15) 0%, rgba(235, 215, 206, 0.05) 50%, transparent 70%)",
          animation: "blob 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-20 blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(107, 114, 128, 0.2) 0%, transparent 60%)",
          animation: "blob 6s ease-in-out infinite reverse",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full opacity-15 blur-xl"
        style={{
          background: "radial-gradient(circle, rgba(26, 26, 26, 0.1) 0%, transparent 50%)",
          animation: "blob 10s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
            border-radius: 70% 30% 50% 50% / 30% 50% 70% 60%;
          }
          75% {
            transform: translate(10px, 10px) scale(1.05);
            border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          }
        }
      `}</style>
    </div>
  );
}
