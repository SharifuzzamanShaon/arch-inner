"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Project", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact" },
  { name: "News", href: "/news" },
];

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef(null);
  const overlayNavRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Animate overlay open/close
  useEffect(() => {
    if (!overlayRef.current || !overlayNavRef.current) return;
    if (menuOpen) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" },
      );
      gsap.fromTo(
        overlayNavRef.current.querySelectorAll(".menu-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          delay: 0.35,
          duration: 0.6,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.55,
        ease: "power4.inOut",
        onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
      });
    }
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(56,54,54,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <Link href="/" className="relative z-50 flex-shrink-0">
              <Image
                src="/images/site-logo.png"
                alt="Arch Inner"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
                priority
              />
            </Link>

            {/* Desktop nav — slash-separated items */}
            <nav className="hidden md:block">
              <ul className="flex items-center">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.name} className="flex items-center">
                      <Link
                        href={item.href}
                        className={`px-2.5 lg:px-3 py-1 text-[14px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                          active
                            ? "text-black font-semibold"
                            : "text-black/40  hover:text-black/75"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block flex-shrink-0">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase font-normal text-[#383636] hover:text-[#383636]/60 transition-colors duration-200"
              >
                <span>Get In Touch</span>
                <span className="inline-block w-5 h-px bg-current opacity-50 group-hover:w-7 transition-all duration-300" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden relative z-50 flex flex-col justify-center items-end gap-[5px] w-8 h-8"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px bg-[#383636] transition-all duration-400 ${
                  menuOpen ? "w-6 rotate-45 translate-y-1.75" : "w-6"
                }`}
              />
              <span
                className={`block h-px bg-[#383636] transition-all duration-400 ${
                  menuOpen ? "w-6 opacity-0" : "w-4"
                }`}
              />
              <span
                className={`block h-px bg-[#383636] transition-all duration-400 ${
                  menuOpen ? "w-6 -rotate-45 -translate-y-1.75" : "w-5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        ref={overlayRef}
        style={{ display: "none", clipPath: "inset(0 0 100% 0)" }}
        className="fixed inset-0 z-40 bg-white flex flex-col px-8 pt-28 pb-12"
      >
        {/* Nav items */}
        <nav
          ref={overlayNavRef}
          className="flex-1 flex flex-col justify-center gap-1"
        >
          {navItems.map((item, idx) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className={`menu-item group flex items-baseline gap-2 py-3 border-b border-[#383636]/10 transition-colors duration-200 ${
                  active
                    ? "text-[#383636]"
                    : "text-[#383636]/40 hover:text-[#383636]"
                }`}
              >
                <span className="text-xs text-[#383636]/30 tracking-widest font-normal w-6">
                  /{String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-4xl sm:text-5xl font-normal tracking-tight leading-tight">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile overlay footer */}
        <div className="menu-item mt-8 flex items-center justify-between border-t border-[#383636]/10 pt-6">
          <Link
            href="/contact"
            onClick={closeMenu}
            className="text-sm tracking-[0.15em] uppercase text-[#383636]/50 hover:text-[#383636] transition-colors duration-200"
          >
            / Get In Touch
          </Link>
          <span className="text-[#383636]/20 text-xs tracking-widest">
            Arch Inner
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
