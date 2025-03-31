
import React from 'react';
import Link from 'next/link';

const ContactSection: React.FC = () => {
  return (
    <section className="bg-[#EBD7CE] py-60 px-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left side - Heading */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-black leading-tight">
            let's build<br />
            something<br />
            amazing<br />
            together
          </h2>
        </div>

        {/* Right side - Text and Book Call button */}
        <div className="md:w-1/2 w-full">
          <div className="space-y-6">
            <p className="text-gray-800 text-base leading-relaxed">
              Shall we start? We're excited to discuss your project 
              and explore how we can help you achieve your goals.
            </p>
            
            <p className="text-gray-800 text-base leading-relaxed">
              Our collaborative approach ensures that your vision comes to life with the 
              perfect blend of design, functionality, and performance.
            </p>
            
            <Link href="/book-call" className='text-gray-800 text-xl font-semibold hover:underline'>
              
                book a call
        
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;