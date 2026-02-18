"use client";

export default function GradientBlob() {
  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
      {/* Main animated blob - much more visible */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl animate-blob"
        style={{
          background: "radial-gradient(circle, rgba(26, 26, 26, 0.5) 0%, rgba(26, 26, 26, 0.3) 35%, rgba(107, 114, 128, 0.2) 55%, transparent 75%)",
        }}
      />
      
      {/* Secondary blob */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-2xl animate-blob-reverse"
        style={{
          background: "radial-gradient(circle, rgba(107, 114, 128, 0.4) 0%, rgba(26, 26, 26, 0.3) 35%, rgba(107, 114, 128, 0.2) 55%, transparent 75%)",
          animationDelay: "2s",
        }}
      />
      
      {/* Tertiary blob - subtle accent */}
      <div 
        className="absolute w-[350px] h-[350px] rounded-full blur-xl animate-blob"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(26, 26, 26, 0.25) 40%, transparent 70%)",
          animationDelay: "4s",
        }}
      />
    </div>
  );
}
