"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProjectCard from "./ProjectCard";

import { CATEGORIES, PROJECTS } from "../project/_data/projects";

const PortfolioSection = ({ hideTabs = false }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const filtersRef = useRef(null);
  const tabsScrollRef = useRef(null);
  const gridRef = useRef(null);
  const swiperRef = useRef(null);

  const scrollTabs = (dir) => {
    tabsScrollRef.current?.scrollBy({ left: dir * 120, behavior: "smooth" });
  };

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
    hideTabs || activeTab === "All"
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
    <div className="-mx-6 md:mx-0">
      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        modules={[Autoplay]}
        grabCursor
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={12}
        slidesPerView={1.15}
        slidesOffsetBefore={24}
        slidesOffsetAfter={24}
        breakpoints={{
          768: {
            slidesPerView: 1.6,
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
          1024: {
            slidesPerView: 2.2,
            spaceBetween: 24,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        }}
      >
        {projects.map((p) => (
          <SwiperSlide key={p.id} className="h-auto">
            <div className="project-item h-full">
              <ProjectCard project={p} imageFit="contain" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
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
              Project <span className="text-[#383636]/50">Showcase</span>
            </h2>
            {!hideTabs && (
              <button
                onClick={() => router.push("/project")}
                className="reveal group hidden sm:inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-[#383636] hover:text-[#383636]/60 transition-colors duration-300 font-normal pb-1"
              >
                <span>Explore All</span>
                <span className="inline-block w-8 h-px bg-current group-hover:w-14 transition-all duration-400" />
                <span className="text-base leading-none">→</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        {!hideTabs && (
          <div ref={filtersRef} className="relative mb-10 sm:mb-14">
            {/* Mobile scroll arrows */}
            <button
              onClick={() => scrollTabs(-1)}
              className="md:hidden absolute left-0 top-0 bottom-0 z-10 flex items-center pr-3 bg-linear-to-r from-white via-white/90 to-transparent"
              aria-label="Scroll left"
            >
              <span className="text-[#383636]/50 text-2xl leading-none">‹</span>
            </button>
            <button
              onClick={() => scrollTabs(1)}
              className="md:hidden absolute right-0 top-0 bottom-0 z-10 flex items-center pl-3 bg-linear-to-l from-white via-white/90 to-transparent"
              aria-label="Scroll right"
            >
              <span className="text-[#383636]/50 text-2xl leading-none">›</span>
            </button>

            {/* Scrollable strip */}
            <div
              ref={tabsScrollRef}
              className="flex items-center gap-1 overflow-x-auto scrollbar-none border-b border-[#383636]/10 md:flex-wrap"
            >
              {tabs.map(({ id, name, disabled }) => {
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => !disabled && setActiveTab(id)}
                    disabled={disabled}
                    className={`relative shrink-0 px-4 py-3 text-sm font-semibold cursor-pointer tracking-[0.08em] transition-colors duration-200 ${
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
          </div>
        )}

        {/* Grid */}
        <div className="relative">
          <div ref={gridRef}>{renderProjects(activeProjects)}</div>

          {/* Slider controls — big screens only */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous"
            className="hidden lg:flex absolute -left-14 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center text-[#383636]/70 hover:text-white hover:bg-[#383636] transition-all duration-200 cursor-pointer"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next"
            className="hidden lg:flex absolute -right-14 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center text-[#383636]/70 hover:text-white hover:bg-[#383636] transition-all duration-200 cursor-pointer"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile CTA */}
        {!hideTabs && (
          <div className="flex justify-center mt-10 sm:hidden">
            <button
              onClick={() => router.push("/project")}
              className="inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-[#383636] hover:text-[#383636]/60 transition-colors duration-300 font-normal"
            >
              <span>Explore All Projects</span>
              <span className="inline-block w-6 h-px bg-current" />
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
