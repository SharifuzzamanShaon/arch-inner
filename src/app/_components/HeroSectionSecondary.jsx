"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const HeroSectionSecondary = () => {
  const textRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current.querySelectorAll(".anim-line"),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" },
    );
    gsap.fromTo(
      metaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" },
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-scroll-indicator",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#ffffff]">
      {/* Background image */}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-z-10" />

      {/* Logo — centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <Image
          src="/images/site-logo.png"
          alt="Arch Inner"
          width={120}
          height={48}
          className="object-contain brightness-0 opacity-80"
          priority
        />
      </div>

      {/* Vertical scroll indicator */}
      <div className="hero-scroll-indicator absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-16 bg-white/20" />
        <span
          className="text-white/30 text-[10px] tracking-[0.3em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="w-px h-16 bg-white/20" />
      </div>

      {/* Main content — bottom */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-16 px-6 sm:px-10 lg:px-20">
        <div
          ref={metaRef}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/12 pt-6"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-white/55 hover:text-white transition-colors duration-300 text-sm tracking-[0.15em] uppercase"
          >
            <span>View Projects</span>
            <span className="inline-block w-8 h-px bg-white/35 group-hover:w-12 transition-all duration-400" />
            <span className="text-lg leading-none">→</span>
          </Link>
          <span className="hidden sm:block text-white/25 text-xs tracking-[0.2em] uppercase">
            Dhaka, Bangladesh · Est. 2014
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSecondary;
