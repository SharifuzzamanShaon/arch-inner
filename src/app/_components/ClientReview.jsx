"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

const CLIENTS = [
  { id: 1, name: "University of Dhaka",          logo: "/images/dhaka-university-logo.png" },
  { id: 2, name: "Bashundhara Group",             logo: "/images/bashundhara-logo.svg" },
  { id: 3, name: "Fervent Multiboard Industries", logo: "/images/fervent-logo.svg" },
  { id: 4, name: "BAT Bangladesh",                logo: "/images/bat-logo.png" },
  { id: 5, name: "Servisol ITES",                 logo: "/images/servisol-logo.png" },
  { id: 6, name: "Dot Birth",                     logo: "/images/dot-birth-logo.png" },
  { id: 7, name: "Dhaka Bank PLC",                logo: "/images/dhaka-bank-logo.png" },
];

const TRUST = { score: "4.9", review_count: "180+" };

const ClientReview = () => {
  const marqueeRef = useRef(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 24,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.querySelectorAll(".reveal"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F7F4F0] border-t border-[#383636]/8 py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 mb-10 sm:mb-14">
        <div
          ref={headerRef}
          className="flex flex-row items-end justify-between gap-4"
        >
          <div>
            <p className="reveal text-xs tracking-[0.3em] uppercase text-[#383636]/50 mb-4 font-normal">
              / Trusted By
            </p>
            <h2
              className="reveal font-normal text-[#383636] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Clients Who Trust
              <br />
              <span className="text-[#383636]/40">Our Vision</span>
            </h2>
          </div>

          <div className="reveal flex items-center gap-5 pb-1">
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-[#383636] mb-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
              <p className="text-[#383636] text-xl font-normal tracking-tight">
                {TRUST.score}
                <span className="text-[#383636]/40 text-sm ml-1 font-normal">/ 5.0</span>
              </p>
              <p className="text-[#383636]/50 text-xs tracking-[0.15em] uppercase mt-0.5">
                {TRUST.review_count} reviews
              </p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-[#383636]/12" />
          </div>
        </div>
      </div>

      {/* Logo marquee */}
      <div className="relative overflow-x-auto scrollbar-none md:overflow-hidden">
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 bg-linear-to-r from-[#F7F4F0] to-transparent pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 bg-linear-to-l from-[#F7F4F0] to-transparent pointer-events-none" />
        <div ref={marqueeRef} className="flex items-center w-max">
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-16 sm:h-20 px-10 sm:px-14 shrink-0 border-r border-[#383636]/10"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={48}
                className="max-w-22.5 sm:max-w-27.5 max-h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-400"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReview;
