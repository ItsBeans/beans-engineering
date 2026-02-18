import React from 'react';

const WhoWeAreSection: React.FC = () => {
  return (
    <section id="about" className="bg-accent min-h-screen flex items-center py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            who we are
          </h2>
          
          <p className="max-w-2xl text-text-muted text-lg md:text-xl mb-16 leading-relaxed animate-slide-up animate-delay-100">
            beans.dev is a digital studio specialising in modern, high-performance
            software and websites. We blend creativity with technology to craft seamless
            digital experiences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 animate-slide-up animate-delay-200">
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-foreground group-hover:scale-110 transition-transform duration-300">
                10+
              </div>
              <div className="text-sm md:text-base text-text-muted uppercase tracking-wide">Happy clients</div>
            </div>
            
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-foreground group-hover:scale-110 transition-transform duration-300">
                5
              </div>
              <div className="text-sm md:text-base text-text-muted uppercase tracking-wide">Years of experience</div>
            </div>
            
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-foreground group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-sm md:text-base text-text-muted uppercase tracking-wide">Custom solutions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;