"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const STATS = [
  { number: "7+", label: "Years Experience" },
  { number: "50+", label: "Projects Completed" },
  { number: "30+", label: "Happy Clients" },
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

    // Set hidden/zero baseline immediately so nothing flashes before setup
    if (headerRef.current) gsap.set(headerRef.current, { opacity: 0, y: 16 });
    itemRefs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 30 });
      const numEl = el.querySelector(".stat-num");
      if (numEl) numEl.textContent = "0";
    });

    let ctx;
    const build = () => {
      ctx = gsap.context(() => {
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 90%" },
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
              scrollTrigger: { trigger: sectionRef.current, start: "top 90%" },
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
              scrollTrigger: { trigger: sectionRef.current, start: "top 90%" },
              onUpdate() {
                if (suffEl) suffEl.textContent = suffix;
              },
            },
          );
        });
      });
    };

    // Wait for the intro loader to disappear before building the triggers,
    // otherwise (on mobile, where the section is above the fold) the count
    // fires and finishes while it's still hidden behind the loader.
    let poll;
    if (document.querySelector(".page-loader")) {
      poll = setInterval(() => {
        if (!document.querySelector(".page-loader")) {
          clearInterval(poll);
          build();
        }
      }, 120);
    } else {
      build();
    }

    return () => {
      if (poll) clearInterval(poll);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-10 sm:pt-14">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={headerRef} className="flex items-center justify-between py-5">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#383636] font-normal">
            / Our Milestone
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#383636]/55 font-normal">
            Est. 2018
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 sm:divide-x divide-[#383636]/12 sm:border-y sm:border-[#383636]/12">
          {STATS.map((stat, i) => {
            const { value } = parseNum(stat.number ?? "0");
            return (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`group flex flex-col items-center text-center py-10 sm:py-14 lg:py-24 px-4 sm:px-8 ${
                  i === 0 ? "border-r border-[#383636]/12" : ""
                } ${
                  i === STATS.length - 1
                    ? "col-span-2 border-t border-[#383636]/12 sm:col-span-1 sm:border-t-0"
                    : ""
                }`}
              >
                <div className="w-6 h-px bg-[#383636]/25 group-hover:w-10 group-hover:bg-[#383636] transition-all duration-400 mb-6" />
                <div className="flex items-baseline gap-0.5 mb-4">
                  <span className="stat-num text-5xl sm:text-6xl lg:text-8xl font-normal text-[#383636] tracking-tight leading-none tabular-nums">
                    {value}
                  </span>
                  <span className="stat-suf text-2xl sm:text-3xl font-normal text-[#383636]" />
                </div>
                <span className="text-[14px] sm:text-[16px] tracking-[0.3em] uppercase text-[#383636]/45 font-normal">
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
