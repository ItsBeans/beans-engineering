import React from 'react';

const WhoWeAreSection: React.FC = () => {
  return (
    <section className="bg-[#EBD7CE] py-60 px-auto">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-black mb-3">who we are</h2>
        
        <p className="max-w-xl text-gray-800 mb-12">
          beans.dev is a digital studio specialising in modern, high-performance
          software and websites. We blend creativity with technology to craft seamless
          digital experiences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">10+</div>
            <div className="text-sm">Happy clients</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">5</div>
            <div className="text-sm">Years of experience</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">100%</div>
            <div className="text-sm">Custom solutions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;