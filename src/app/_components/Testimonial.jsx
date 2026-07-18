"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Kamal Hossain",
    role: "Dean, Faculty of Fine Arts — University of Dhaka",
    testimonial:
      "The conference room and dean's chamber now carry a presence that commands respect. arch Inner understood institutional dignity — every material choice, every proportion felt deliberate and considered.",
    image: "/images/DIU/DEAN%20ROOM.png",
  },
  {
    id: 2,
    name: "Rezaul Karim",
    role: "Managing Director — Fervent Group",
    testimonial:
      "Our executive floor needed to reflect the authority of our brand without feeling cold. arch Inner delivered exactly that — a space that speaks before anyone in it does.",
    image:
      "/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION/INTERIOR%20VIEW%20CHAIRMAN%20ROOM.png",
  },
  {
    id: 3,
    name: "Imran Chowdhury",
    role: "CEO — Servisol Technologies",
    testimonial:
      "We wanted an office that energises the team and impresses clients. The workstation layout, acoustics, lighting — every detail was thought through. Our team genuinely loves coming to work now.",
    image: "/images/IELTS/DIRECTORS%20RM%20FRONT.png",
  },
];

const TestimonialSection = () => {
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
        gridRef.current.querySelectorAll(".tcard"),
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
    <section ref={sectionRef} className="bg-[#1C1917] border-t border-white/5">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-white/30 mb-5 font-normal">
            / Client Stories
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className="reveal font-normal text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
              What Our Clients
              <br />
              <span className="text-white/35">Say About Us</span>
            </h2>
            <p className="reveal text-base text-white/30 font-normal max-w-sm leading-relaxed">
              Their trust and satisfaction are the foundations of our continued
              success — from concept to completion.
            </p>
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
              delay: 3500,
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
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id} className="tcard h-auto">
                <TestimonialCard service={t} dark />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Slider controls — big screens only */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous"
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center border border-white/60 text-white hover:border-white transition-colors duration-200 cursor-pointer drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]"
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
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center border border-white/60 text-white hover:border-white transition-colors duration-200 cursor-pointer drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]"
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

export default TestimonialSection;
