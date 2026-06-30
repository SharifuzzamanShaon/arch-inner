"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import ContactModal from "./ContactModal";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Project", href: "/project" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about-us" },
  { name: "Career", href: "/career" },
  { name: "Contact", href: "/contact" },
  { name: "News", href: "/news" },
];

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const overlayRef = useRef(null);
  const overlayNavRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu or modal is open
  useEffect(() => {
    document.body.style.overflow = menuOpen || modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, modalOpen]);

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
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  // Light treatment (glass bg + white text) only on the home hero, before scroll.
  // Other pages have a white background, so use dark text.
  const isHome = pathname === "/";
  const lightMode = isHome && !scrolled;

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(56,54,54,0.08)]"
            : lightMode
              ? "bg-white/10 backdrop-blur-md border-b border-white/15"
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
                          lightMode
                            ? active
                              ? "text-white font-semibold"
                              : "text-white/60 hover:text-white"
                            : active
                              ? "text-black font-semibold"
                              : "text-black/40 hover:text-black/75"
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
              <button
                onClick={openModal}
                className={`group inline-flex cursor-pointer items-center gap-2 text-sm tracking-[0.12em] uppercase font-normal transition-colors duration-200 ${
                  lightMode
                    ? "text-white hover:text-white/60"
                    : "text-[#383636] hover:text-[#383636]/60"
                }`}
              >
                <span>Get In Touch</span>
                <span className="inline-block w-5 h-px bg-current opacity-50 group-hover:w-7 transition-all duration-300" />
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden relative z-50 flex items-center justify-center w-9 h-9 transition-colors duration-300 ${
                lightMode && !menuOpen ? "text-white" : "text-[#383636]"
              }`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <BiX className="w-9 h-9" />
              ) : (
                <BiMenuAltRight className="w-8 h-8 text-[#6e6f73]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        ref={overlayRef}
        style={{ display: "none", clipPath: "inset(0 0 100% 0)" }}
        className="fixed inset-0 z-40 bg-white flex flex-col px-6 sm:px-8 pt-22 sm:pt-28 pb-10 sm:pb-12"
      >
        {/* Nav items */}
        <nav
          ref={overlayNavRef}
          className="flex-1 flex flex-col justify-center gap-1"
        >
          {navItems.map((item) => {
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
                <span className="text-2xl  font-normal tracking-tight leading-tight">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile overlay footer */}
        <div className="menu-item mt-8 flex items-center justify-between border-t border-[#383636]/10 pt-6">
          <button
            onClick={() => {
              closeMenu();
              openModal();
            }}
            className="text-sm tracking-[0.15em] uppercase text-[#383636]/50 hover:text-[#383636] transition-colors duration-200"
          >
            / Get In Touch
          </button>
          <span className="text-[#383636]/20 text-xs tracking-widest">
            Arch Inner
          </span>
        </div>
      </div>
      <ContactModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;
