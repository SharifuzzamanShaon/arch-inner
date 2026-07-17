"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

const TEAM = [
  { name: "Ar. Rafiqul Islam", role: "Founder & Principal Architect", img: "/images/avater.png" },
  { name: "Ar. Nusrat Jahan", role: "Senior Architect", img: "/images/avater.png" },
  { name: "Tahmid Hasan", role: "Lead Interior Architect", img: "/images/avater.png" },
  { name: "Sadia Rahman", role: "Interior Designer", img: "/images/avater.png" },
  { name: "Mahin Chowdhury", role: "Project Manager", img: "/images/avater.png" },
  { name: "Farhana Akter", role: "Landscape & Master Plan Lead", img: "/images/avater.png" },
];

const OurTeam = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current || !gridRef.current) return;

    // Fail-safe / progressive enhancement: never gate content behind JS.
    // On small screens or when the visitor prefers reduced motion, we skip the
    // entrance animation entirely so cards remain at their natural opacity:1.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        gridRef.current.querySelectorAll(".team-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#F7F4F0] border-t border-[#383636]/8"
    >
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Heading — editorial two-column masthead */}
        <div
          ref={headingRef}
          className="mb-14 sm:mb-20 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="reveal text-[10px] tracking-[0.3em] uppercase text-[#383636]/40 font-normal mb-5">
              / Our Team
            </p>
            <h2
              className="reveal font-normal text-[#383636] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
              The people behind <span className="text-[#383636]/35">the practice</span>
            </h2>
          </div>

          <p className="reveal max-w-sm text-sm sm:text-base font-light leading-relaxed text-[#383636]/55 sm:text-right">
            A close-knit studio of architects and designers shaping considered,
            enduring spaces — each project led by hand from first sketch to final detail.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 sm:gap-y-16"
        >
          {TEAM.map((member, i) => {
            const index = String(i + 1).padStart(2, "0");
            return (
              <article key={member.name} className="team-card group">
                {/* Portrait */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1C1917]">
                  <Image
                    src={member.img}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale scale-100 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  {/* Index number (decorative) */}
                  <span
                    aria-hidden="true"
                    className="absolute top-4 left-4 text-[10px] tracking-[0.25em] font-normal text-white/35 group-hover:text-[#FE5443] transition-colors duration-500 select-none"
                  >
                    {index}
                  </span>
                </div>

                {/* Meta — name + role always visible at every breakpoint */}
                <div className="pt-5">
                  <div aria-hidden="true" className="w-10 h-px bg-[#383636]/15 mb-4" />
                  <h3 className="text-lg font-normal text-[#383636] leading-snug">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-[10px] tracking-[0.2em] uppercase text-[#383636]/45 font-normal">
                    {member.role}
                  </p>
                  {/* Hover underline-grow accent (decorative) */}
                  <span
                    aria-hidden="true"
                    className="mt-4 block w-4 h-px bg-[#383636]/30 group-hover:w-7 group-hover:bg-[#FE5443] transition-all duration-500"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
