"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProjectCard from "./ProjectCard";

import { CATEGORIES, PROJECTS } from "../portfolio/_data/projects";

const PortfolioSection = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const filtersRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal"),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        },
      );
      gsap.fromTo(
        filtersRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: filtersRef.current, start: "top 88%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".project-item"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
    );
  }, [activeTab]);

  const activeProjects =
    activeTab === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categoryId === activeTab);

  const projectCategoryIds = new Set(PROJECTS.map((p) => p.categoryId));

  const tabs = [
    { id: "All", name: "All", disabled: false },
    ...CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      disabled: !projectCategoryIds.has(c.id),
    })),
  ];

  const renderProjects = (projects) => (
    <>
      <div className="block md:hidden">
        <Swiper spaceBetween={16} slidesPerView={1.1}>
          {projects.map((p) => (
            <SwiperSlide key={p.id}>
              <div className="project-item">
                <ProjectCard project={p} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden md:grid md:grid-cols-2 gap-5">
        {projects.map((p) => (
          <div key={p.id} className="project-item">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <section ref={sectionRef} className="bg-white border-t border-[#383636]/10">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-[#383636] mb-5 font-normal">
            / Portfolio
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className="reveal font-normal text-[#383636] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
              Selected <span className="text-[#383636]/50">Works</span>
            </h2>
            <button
              onClick={() => router.push("/portfolio")}
              className="reveal group hidden sm:inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-[#383636] hover:text-[#383636]/60 transition-colors duration-300 font-normal pb-1"
            >
              <span>Explore All</span>
              <span className="inline-block w-8 h-px bg-current group-hover:w-14 transition-all duration-400" />
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div
          ref={filtersRef}
          className="flex items-center gap-1 flex-wrap mb-10 sm:mb-14 border-b border-[#383636]/10"
        >
          {tabs.map(({ id, name, disabled }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => !disabled && setActiveTab(id)}
                disabled={disabled}
                className={`relative px-4 py-3 text-sm font-semibold cursor-pointer tracking-[0.08em] transition-colors duration-200 ${
                  disabled
                    ? "text-[#383636]/18 cursor-not-allowed select-none"
                    : active
                      ? "text-[#383636]"
                      : "text-[#383636]/35 hover:text-[#383636]/70"
                }`}
              >
                {name}
                {active && !disabled && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[#383636]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div ref={gridRef}>{renderProjects(activeProjects)}</div>

        {/* Mobile CTA */}
        <div className="flex justify-center mt-10 sm:hidden">
          <button
            onClick={() => router.push("/portfolio")}
            className="inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-[#383636] hover:text-[#383636]/60 transition-colors duration-300 font-normal"
          >
            <span>Explore All Projects</span>
            <span className="inline-block w-6 h-px bg-current" />
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
