"use client";
import { useEffect, useState } from "react";

const Header = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "clients", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-accent">
      {/* Logo */}
      <button 
        onClick={() => scrollToSection("hero")}
        className="group cursor-pointer"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-foreground transition-transform group-hover:scale-105">
          beans.dev
        </h1>
      </button>

      {/* Navigation Links */}
      <nav className="flex space-x-8 md:space-x-12 text-base md:text-lg">
        <button
          onClick={() => scrollToSection("about")}
          className={`relative transition-colors hover:text-foreground ${
            activeSection === "about" ? "text-foreground font-medium" : "text-text-muted"
          }`}
        >
          about
          {activeSection === "about" && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground animate-fade-in" />
          )}
        </button>
        <button
          onClick={() => scrollToSection("clients")}
          className={`relative transition-colors hover:text-foreground ${
            activeSection === "clients" ? "text-foreground font-medium" : "text-text-muted"
          }`}
        >
          clients
          {activeSection === "clients" && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground animate-fade-in" />
          )}
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className={`relative transition-colors hover:text-foreground ${
            activeSection === "contact" ? "text-foreground font-medium" : "text-text-muted"
          }`}
        >
          contact
          {activeSection === "contact" && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground animate-fade-in" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
