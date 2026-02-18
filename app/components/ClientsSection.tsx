
const ClientsSection = () => {
  return (
    <section id="clients" className="bg-accent min-h-screen flex items-center py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            our clients
          </h2>
          
          <p className="max-w-2xl text-text-muted text-lg md:text-xl mb-16 leading-relaxed animate-slide-up animate-delay-100">
            From startups to established businesses, we create digital experiences
            that are fast, intuitive, and tailored to your audience.
          </p>
          
          {/* Placeholder for future carousel/testimonial section */}
          <div className="mb-10 animate-slide-up animate-delay-200">
            <div className="border-2 border-dashed border-accent-dark/30 rounded-lg p-12 text-center">
              <h3 className="text-xl md:text-2xl font-medium text-text-muted mb-2">
                Portfolio coming soon
              </h3>
              <p className="text-text-muted text-sm md:text-base">
                Case studies and client testimonials will be featured here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;