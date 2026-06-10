"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ServiceCard from "./ServiceCard";

const SERVICES = [
  {
    id: 1,
    title: "Residential Interior Design",
    description:
      "Creating homes that blend comfort with sophistication. Every element is chosen to reflect your lifestyle and aspirations.",
    thumbnail: "/images/service-1.png",
  },
  {
    id: 2,
    title: "Commercial Spaces",
    description:
      "Transforming workplaces into environments that inspire productivity and reflect your brand identity.",
    thumbnail: "/images/service-2.png",
  },
  {
    id: 3,
    title: "Hospitality Design",
    description:
      "Crafting immersive hotel and restaurant experiences that leave a lasting impression on every guest.",
    thumbnail: "/images/service-3.png",
  },
  {
    id: 4,
    title: "Space Planning",
    description:
      "Optimizing spatial flow and functionality to ensure every square metre works beautifully for you.",
    thumbnail: "/images/service-5.png",
  },
  {
    id: 5,
    title: "Material Consultation",
    description:
      "Selecting the finest materials, textures, and finishes that bring depth and character to your space.",
    thumbnail: "/images/service-6.png",
  },
  {
    id: 6,
    title: "3D Visualization",
    description:
      "Photorealistic renders that bring your vision to life before a single detail is finalized.",
    thumbnail: "/images/service-collaps-img.png",
  },
];

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
        gridRef.current.querySelectorAll(".service-item"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F7F4F0] border-t border-[#383636]/8">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-[#383636] mb-5 font-light">
            / Services
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="reveal font-thin text-[#383636] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
              We Shape Interiors That
              <br />
              <span className="text-[#383636]/40">Reflect</span>{" "}
              <span className="text-[#383636]">Your Story</span>
            </h2>
            <p className="reveal text-sm text-[#383636]/50 font-light max-w-xs leading-relaxed">
              From concept to completion — every space is crafted with
              precision, purpose, and deep respect for your vision.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef}>
          <div className="block md:hidden">
            <Swiper spaceBetween={16} slidesPerView={1.1}>
              {SERVICES.map((service) => (
                <SwiperSlide key={service.id}>
                  <div className="service-item">
                    <ServiceCard service={service} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SERVICES.map((service) => (
              <div key={service.id} className="service-item">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
