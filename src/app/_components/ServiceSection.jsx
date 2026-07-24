"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SERVICES } from "../services/_data/services";

const ServiceCard = ({ service }) => (
  <Link
    href={`/services/${service.slug}`}
    className="service-card group relative overflow-hidden bg-[#1C1917] block rounded-xl"
    style={{ aspectRatio: "4/3" }}
  >
    <Image
      src={service.image}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      alt={service.name}
      className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
    <div className="absolute top-4 right-4 w-8 h-8 border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
      <span className="text-white text-sm leading-none">→</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
      <h3
        className="font-normal text-white leading-snug mb-2"
        style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}
      >
        {service.name}
      </h3>
      <p className="text-[13px] text-white/55 font-normal leading-relaxed line-clamp-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
        {service.shortDescription}
      </p>
      <div className="mt-3 inline-flex items-center gap-2 text-white/50 group-hover:text-white/80 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 opacity-0 group-hover:opacity-100">
        <span>Learn More</span>
        <span className="w-4 h-px bg-current group-hover:w-6 transition-all duration-300" />
      </div>
    </div>
  </Link>
);

const ServiceSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current || !gridRef.current) return;
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
        gridRef.current.querySelectorAll(".service-card"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F2F2F2] border-t border-[#383636]/8"
    >
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className="reveal font-normal text-[#383636] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
              Our Services
            </h2>
            <Link
              href="/services"
              className="reveal group hidden sm:inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-[#383636] hover:text-[#383636]/60 transition-colors duration-300 font-normal pb-1"
            >
              <span>View All</span>
              <span className="inline-block w-8 h-px bg-current group-hover:w-14 transition-all duration-400" />
              <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="relative -mx-6 md:mx-0">
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
                slidesPerView: 2.4,
                spaceBetween: 24,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
            }}
          >
            {SERVICES.map((service) => (
              <SwiperSlide key={service.id} className="h-auto">
                <ServiceCard service={service} />
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

        {/* Mobile CTA */}
        <div className="flex justify-center mt-10 sm:hidden">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-[#383636] hover:text-[#383636]/60 transition-colors duration-300 font-normal"
          >
            <span>View All Services</span>
            <span className="inline-block w-6 h-px bg-current" />
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
