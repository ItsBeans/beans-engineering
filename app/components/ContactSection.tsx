
import React from 'react';
import Link from 'next/link';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="bg-accent min-h-screen flex items-center py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-5xl flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16">
          {/* Left side - Heading */}
          <div className="md:w-1/2 animate-slide-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              let's build<br />
              something<br />
              <span className="relative inline-block">
                amazing
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-foreground/20" />
              </span>
              <br />
              together
            </h2>
          </div>

          {/* Right side - Text and Book Call button */}
          <div className="md:w-1/2 w-full space-y-8 animate-slide-up animate-delay-100">
            <p className="text-text-muted text-lg md:text-xl leading-relaxed">
              Shall we start? We're excited to discuss your project 
              and explore how we can help you achieve your goals.
            </p>
            
            <p className="text-text-muted text-lg md:text-xl leading-relaxed">
              Our collaborative approach ensures that your vision comes to life with the 
              perfect blend of design, functionality, and performance.
            </p>
            
            <div className="pt-4">
              <a 
                href="mailto:bennyrocys@gmail.com?subject=Project Inquiry"
                className="inline-flex items-center text-foreground text-xl md:text-2xl font-semibold hover:opacity-80 transition-all group gap-2"
              >
                book a call
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;