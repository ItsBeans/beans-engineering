"use client";
import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-accent px-6 md:px-12 py-12 md:py-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Section: Contact Info */}
        <div className="space-y-3">
          <p className="text-3xl md:text-4xl font-semibold text-foreground">let's talk.</p>
          <a 
            href="mailto:bennyrocys@gmail.com" 
            className="text-text-muted hover:text-foreground transition-colors text-sm md:text-base block"
          >
            bennyrocys@gmail.com
          </a>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-muted hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-muted hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <FaXTwitter className="text-xl" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-muted hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>

        {/* Right Section: Quick Links */}
        <div className="text-sm space-y-3 text-left md:text-right">
          <button 
            onClick={() => scrollToSection("about")}
            className="block text-text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            about
          </button>
          <button 
            onClick={() => scrollToSection("clients")}
            className="block text-text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            clients
          </button>
          <button 
            onClick={() => scrollToSection("contact")}
            className="block text-text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            contact
          </button>
          <p className="text-xs text-text-muted mt-6">©2026 beans.dev</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
