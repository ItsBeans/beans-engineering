"use client"
import BubbleCanvas from "./BubbleCanvas";

const HeroSection = () => {
  return (
    <section className="bg-[#EBD7CE] relative overflow-hidden flex items-center py-40">
      <div className="container mx-auto px-8 z-10 relative flex items-center justify-between">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-black mb-3">
            we build
            <br />
            beautiful, fast
            <br />
            websites
          </h1>
          <p className="text-gray-800 mt-6 max-w-xl text-base leading-relaxed">
            We design and develop modern software and websites that are
            fast, intuitive, and built to scale. Our focus is on clean design,
            smooth interactions, and seamless user experiences.
          </p>
        </div>
        <div className="relative w-1/2 flex justify-center">
          <BubbleCanvas/>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
