"use client"
import MorphingBlob3D from "./MorphingBlob3D";

const HeroSection = () => {
  return (
    <section id="hero" className="bg-accent relative overflow-hidden min-h-[85vh] flex items-center">
      <div className="container mx-auto px-6 md:px-12 z-10 relative flex flex-col lg:flex-row items-center justify-between gap-12 py-20 md:py-32">
        <div className="max-w-2xl animate-slide-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            we build
            <br />
            <span className="relative inline-block">
              beautiful, fast
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-foreground/20" />
            </span>
            <br />
            software
          </h1>
          <p className="text-text-muted mt-8 max-w-xl text-lg md:text-xl leading-relaxed animate-slide-up animate-delay-100">
            we design and develop modern software, AI agents and websites that are
            fast, intuitive, and built to scale. Our focus is on clean design,
            smooth interactions, and seamless user experiences.
          </p>
        </div>
        <div className="relative w-full lg:w-1/2 flex justify-center animate-fade-in animate-delay-200">
          <MorphingBlob3D />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
