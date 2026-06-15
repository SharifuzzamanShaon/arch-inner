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
    title: "BAT BD Farmer Waiting Station & Training Center",
    description:
      "A community facility rooted in the Bangladeshi courtyard tradition, with tobacco-leaf-inspired facade screens and warm material honesty.",
    location: "MLD, Kushtia",
    thumbnail:
      "/images/BAT%20KUSHTIA_BD-FARMER%20WAITING%20STATION%20AND%20TRAINING%20CENTER%20AT%20MLD./VIEW%20FROM%20ENTRY%20GATE.png",
    href: "/portfolio/1",
  },
  {
    id: 2,
    title: "Faculty of Earth Sciences & Engineering, University of Dhaka",
    description:
      "15,650 SFT of academic interiors — Dean's suite, officer rooms, conference and meeting spaces unified by warm oak veneer and restrained detailing.",
    location: "University of Dhaka",
    thumbnail: "/images/DIU/DEAN%20ROOM.png",
    href: "/portfolio/2",
  },
  {
    id: 3,
    title: "Fervent Multiboard Industries — Chairman Floor",
    description:
      "An executive interior for a prominent industrial conglomerate — bespoke millwork, curated stone finishes, and precision lighting across a full chairman floor.",
    location: "Mohakhali C/A, Dhaka",
    thumbnail:
      "/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION/RECEPTION.png",
    href: "/portfolio/3",
  },
  {
    id: 4,
    title: "Dhaka Bank PLC — Kalatia Branch",
    description:
      "A full-branch interior built around warm wood tones, acoustic comfort, and clear spatial zoning — trust and clarity expressed through material and light.",
    location: "Kalatia, Keraniganj, Dhaka",
    thumbnail: "/images/DBPlc%20Kalatia%20Branch%20Presentation/image.png",
    href: "/portfolio/5",
  },
  {
    id: 5,
    title: "Servisol ITES — Office Interior",
    description:
      "4,752 SFT of vibrant IT office space — bold colour zoning, acoustic panels, and open workstation planning for a growing tech workforce.",
    location: "Khilkhet, Dhaka-1229",
    thumbnail: "/images/IELTS/WAITING%20AREA%20OP-1.png",
    href: "/portfolio/4",
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
          <p className="reveal text-xs tracking-[0.3em] uppercase text-[#383636] mb-5 font-normal">
            / Featured Projects
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="reveal font-normal text-[#383636] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
              Work That Speaks
              <br />
              <span className="text-[#383636]/40">For</span>{" "}
              <span className="text-[#383636]">Itself</span>
            </h2>
            <p className="reveal text-sm text-[#383636]/50 font-normal max-w-xs leading-relaxed">
              Five completed projects — each shaped by a specific brief, a
              specific place, and a commitment to precision.
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
