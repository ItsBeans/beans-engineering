import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "beans.dev | Modern Software Development",
  description: "We build beautiful, fast software. Design and development for modern web applications, AI agents, and digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-accent`}>
      <body className="font-sans antialiased bg-accent min-h-screen">
        <Header />
        <main className="bg-accent">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
