"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Container from "./Container";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Project", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
  { name: "Blogs", href: "/blogs" },
];

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`w-full fixed md:relative top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "py-2 md:py-3" : "py-2"
          }`}
        >
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/site-logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-12 h-12"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-base">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`transition-colors duration-200 ${
                      pathname === item.href
                        ? "font-semibold text-gray-700"
                        : "text-[#FE5443] hover:text-[#FE5443]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop Button */}
            <div className="hidden md:block">
              <Link href="/contact">
                <Button className="cursor-pointer rounded-full bg-[#FE5443] hover:bg-transparent border-2 border-transparent hover:border-[#FE5443] hover:text-[#FE5443] h-10 px-5 text-sm font-bold text-white shadow-lg transition-all active:scale-95">
                  Get In Touch
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={28} className="text-[#FE5443]" />
              ) : (
                <Menu size={28} className="text-[#FE5443]" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-white shadow-md">
          <ul className="flex flex-col gap-4 p-6 text-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`block text-lg ${
                    pathname === item.href
                      ? "font-semibold text-gray-700"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <Link href="/contact" onClick={closeMenu}>
              <Button className="w-full mt-3 rounded-full bg-[#FE5443] text-white hover:bg-[#e04839]">
                Get In Touch
              </Button>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
