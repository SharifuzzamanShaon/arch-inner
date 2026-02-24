"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import Container from "./Container";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Project", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
  { name: "Blogs", href: "/blogs" },
];

const Header = ({ active }) => {
  const router = useRouter();
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isFixed = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <header
      className={`w-full ${
        isFixed ? "fixed top-0 left-0 right-0 z-50" : "relative z-50"
      } ${
        scrolled ? "backdrop-blur-2xl shadow-sm" : "bg-transparent"
      } transition-all duration-200`}
    >
      <Container>
        <div
          className={`flex items-center justify-between ${
            scrolled ? "py-2 md:py-3" : "py-4 md:py-4"
          } transition-all duration-200`}
        >
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src="/images/site-logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-12 h-12"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-base">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      item.name === active
                        ? "font-[2.5] text-gray-900"
                        : "text-black hover:text-gray-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA + Mobile menu button */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Link href="/contact">
                <Button className="flex items-center gap-3 rounded-full cursor-pointer hover:bg-transparent hover:border hover:border-[#FE5443] hover:text-[#FE5443] bg-[#FE5443] h-8 sm:h-10 px-4 text-xs sm:text-sm font-bold text-white shadow-2xl transition-all active:scale-95">
                  Get In Touch
                </Button>
              </Link>
            </div>

            {/* Mobile: hamburger / close */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden p-2 -mr-2 text-black hover:text-gray-900 rounded-lg hover:bg-white transition-colors"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? (
                <FaXmark className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile collapsible menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            menuOpen ? "max-h-[80vh]" : "max-h-0"
          }`}
        >
          <nav className=" backdrop-blur-sm">
            <ul className="flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block w-full px-4 py-3 text-left text-lg transition-colors ${
                      item.name === active
                        ? "font-[1.2] text-gray-900 "
                        : "text-black hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-4 pb-4 pt-2">
              <Link href="/contact">
                <Button
                  className="flex items-center gap-3 rounded-full cursor-pointer hover:bg-transparent hover:border hover:border-[#FE5443] hover:text-[#FE5443] bg-[#FE5443] h-8 sm:h-10 px-4 text-xs sm:text-sm font-bold text-white shadow-2xl transition-all active:scale-95"
                  onClick={() => {
                    closeMenu();
                    router.push("/contact");
                  }}
                >
                  Get In Touch
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
