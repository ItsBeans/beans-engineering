import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-dark": "var(--accent-dark)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "blob": "blob 8s ease-in-out infinite",
        "blob-reverse": "blob-reverse 8s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "25%": {
            transform: "translate(30px, -30px) scale(1.1)",
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          },
          "50%": {
            transform: "translate(-20px, 20px) scale(0.9)",
            borderRadius: "70% 30% 50% 50% / 30% 50% 70% 60%",
          },
          "75%": {
            transform: "translate(10px, 10px) scale(1.05)",
            borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%",
          },
        },
        "blob-reverse": {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
            borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%",
          },
          "25%": {
            transform: "translate(-25px, 25px) scale(0.95)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "50%": {
            transform: "translate(25px, -25px) scale(1.1)",
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          },
          "75%": {
            transform: "translate(-10px, -10px) scale(0.98)",
            borderRadius: "70% 30% 50% 50% / 30% 50% 70% 60%",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
