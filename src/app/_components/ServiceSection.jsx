"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SERVICES } from "../services/_data/services";

const ServiceCard = ({ service, aspectRatio }) => (
  <Link
    href={`/services/${service.slug}`}
    className="service-card group relative overflow-hidden bg-[#1C1917] block"
    style={{ aspectRatio }}
  >
    <Image
      src={service.image}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      alt={service.name}
      className="object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
    <div className="absolute top-5 right-5 w-8 h-8 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-white/50">
      <span className="text-white text-sm leading-none">→</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
      <h3
        className="font-normal text-white leading-snug mb-2"
        style={{ fontSize: "clamp(1.15rem, 2vw, 1.5rem)" }}
      >
        {service.name}
      </h3>
      <p className="text-[15px] text-white/45 font-normal leading-relaxed line-clamp-2 max-w-[90%] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
        {service.shortDescription}
      </p>
    </div>
  </Link>
);

const ServiceSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

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
      className="bg-[#F7F4F0] border-t border-[#383636]/8"
    >
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-[#383636] mb-5 font-normal">
            / What We Do
          </p>
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
        <div ref={gridRef}>
          {/* Mobile: swipeable, no autoplay */}
          <div className="block sm:hidden -mx-6">
            <Swiper spaceBetween={12} slidesPerView={1.15}>
              {SERVICES.map((service) => (
                <SwiperSlide key={service.id}>
                  <ServiceCard service={service} aspectRatio="3/4" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                aspectRatio={i === 0 ? "3/4" : i === 1 ? "3/4" : "4/3"}
              />
            ))}
          </div>
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
