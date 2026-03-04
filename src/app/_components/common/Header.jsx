"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
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

  /* Detect scroll */
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
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "py-2 md:py-3" : "py-4"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-base">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`transition-colors duration-200 ${
                      pathname === item.href
                        ? "font-semibold text-[#FE5443]"
                        : "text-black hover:text-[#FE5443]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA + Mobile button */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link href="/contact">
                <Button className="rounded-full bg-[#FE5443] hover:bg-transparent hover:border hover:border-[#FE5443] hover:text-[#FE5443] h-10 px-5 text-sm font-bold text-white shadow-lg transition-all active:scale-95">
                  Get In Touch
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden p-2 text-black rounded-lg"
                >
                  <FaBars className="h-8 w-8 px-1 text-[#FE5443]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-full w-full max-h-screen">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full pt-8">
                  <nav className="flex-1">
                    <ul className="flex flex-col gap-2">
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className={`block text-lg font-medium transition-colors py-3 px-4 rounded-md ${
                              pathname === item.href
                                ? "text-[#FE5443] bg-[#FE5443]/10 font-semibold"
                                : "text-black hover:text-[#FE5443] hover:bg-gray-50"
                            }`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="mt-8 mb-4">
                    <Link href="/contact" onClick={closeMenu}>
                      <Button className="w-full rounded-full bg-[#FE5443] hover:bg-transparent hover:border hover:border-[#FE5443] hover:text-[#FE5443] h-12 px-6 text-base font-bold text-white shadow-lg transition-all active:scale-95">
                        Get In Touch
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
