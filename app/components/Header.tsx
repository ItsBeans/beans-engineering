import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-12 py-6 bg-[#EBD7CE] text-black">
      {/* Logo */}
      <h1 className="text-2xl font-medium tracking-wide">beans...</h1>

      {/* Navigation Links */}
      <nav className="flex space-x-12 text-lg self-end">
        <Link href="/about" className="hover:underline">about</Link>
        <Link href="/clients" className="hover:underline">clients</Link>
        <Link href="/contact" className="hover:underline">contact</Link>
      </nav>
    </header>
  );
};

export default Header;
