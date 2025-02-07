import Link from "next/link";
import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#EBD7CE] text-black px-8 py-6 flex justify-between items-center">
      {/* Left Section: Contact Info */}
      <div>
        <p className="text-3xl">let’s talk.</p>
        <p className="text-sm">bennyrocys@gmail.com</p>
        {/* Social Icons */}
        <div className="flex space-x-3 mt-2">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-xl hover:opacity-70 transition-opacity" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-xl hover:opacity-70 transition-opacity" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-xl hover:opacity-70 transition-opacity" />
          </a>
        </div>
      </div>

      {/* Right Section: Quick Links */}
      <div className="text-sm space-y-2 text-right">
        <Link href="/about" className="block hover:underline">about</Link>
        <Link href="/clients" className="block hover:underline">clients</Link>
        <Link href="/contact" className="block hover:underline">contact</Link>
        <p className="text-xs mt-2">©2025 Beans engineering</p>
      </div>
    </footer>
  );
};

export default Footer;
