"use client";

import { useRef } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProjectCard from "../../_components/ProjectCard";
import { PROJECTS } from "../../portfolio/_data/projects";

const ServiceCollaps = () => {
  const swiperRef = useRef(null);

  return (
    <section className="bg-[#F2F2F2] border-t border-[#383636]/8">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <h2
            className="font-normal text-[#383636] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Our Services
          </h2>
          <p className="text-sm text-[#383636]/50 font-normal max-w-xs leading-relaxed">
            From concept to handover — across every discipline we offer.
          </p>
        </div>

        <div className="relative -mx-6 md:mx-0">
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
            {PROJECTS.map((project) => (
              <SwiperSlide key={project.id} className="h-auto">
                <ProjectCard project={project} imageFit="contain" />
              </SwiperSlide>
            ))}
          </Swiper>

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
      </div>
    </section>
  );
};

export default ServiceCollaps;
