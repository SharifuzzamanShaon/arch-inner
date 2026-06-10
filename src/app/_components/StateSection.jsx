"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const STATS = [
  { number: "10+", label: "Years Experience" },
  { number: "240+", label: "Projects Completed" },
  { number: "40+", label: "Design Awards" },
  { number: "100+", label: "Happy Clients" },
];

const parseNum = (str) => {
  const m = String(str).match(/^(\d+)(.*)/);
  return m
    ? { value: parseInt(m[1], 10), suffix: m[2] }
    : { value: 0, suffix: "" };
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!itemRefs.current.length) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
          },
        );
      }

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const { value, suffix } = parseNum(STATS[i]?.number ?? "0");
        const numEl = el.querySelector(".stat-num");
        const suffEl = el.querySelector(".stat-suf");

        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
          },
        );

        gsap.fromTo(
          numEl,
          { innerText: 0 },
          {
            innerText: value,
            duration: 2.2,
            delay: i * 0.1 + 0.25,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
            onUpdate() {
              if (suffEl) suffEl.textContent = suffix;
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white border-t-2 border-[#383636]">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">
        <div
          ref={headerRef}
          className="flex items-center justify-between py-5 border-b border-[#383636]/12"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#383636] font-light">
            / By The Numbers
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#383636]/55 font-light">
            Est. 2014
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#383636]/12 [&>*:nth-child(2)]:border-r-0 lg:[&>*:nth-child(2)]:border-r lg:[&>*:nth-child(2)]:border-[#383636]/12">
          {STATS.map((stat, i) => {
            const { value } = parseNum(stat.number ?? "0");
            return (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className="group flex flex-col items-center text-center py-14 sm:py-18 lg:py-24 px-4 sm:px-8"
              >
                <div className="w-6 h-px bg-[#383636]/25 group-hover:w-10 group-hover:bg-[#383636] transition-all duration-400 mb-6" />
                <div className="flex items-baseline gap-0.5 mb-4">
                  <span className="stat-num text-6xl sm:text-7xl lg:text-8xl font-thin text-[#383636] tracking-tight leading-none tabular-nums">
                    {value}
                  </span>
                  <span className="stat-suf text-3xl sm:text-4xl font-thin text-[#383636]" />
                </div>
                <span className="text-[14px] sm:text-[16px] tracking-[0.3em] uppercase text-[#383636]/45 font-light">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
