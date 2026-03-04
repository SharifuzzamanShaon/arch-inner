"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "./common/Container";
import ServiceCard from "./ServiceCard";

const services = [
  {
    thumbnail: "/images/service-1.png",
    title: "Residential Interior Design",
    description:
      "Creating homes that blend comfort with sophistication. Every element is thoughtfully chosen to reflect your lifestyle.",
  },
  {
    thumbnail: "/images/service-2.png",
    title: "Hospital Interior Design",
    description:
      "We design warm, functional interiors tailored to your lifestyle. Every detail supports comfort, flow, and timeless living.",
  },
  {
    thumbnail: "/images/service-3.png",
    title: "Restaurant Interior Design",
    description:
      "Designing dining spaces that balance ambiance and efficiency, creating memorable experiences for every guest.",
  },
  {
    thumbnail: "/images/service-5.png",
    title: "Sports Club Interior Design",
    description:
      "Building energizing spaces that inspire community. Functional layouts meet bold design for peak performance environments.",
  },
  {
    thumbnail: "/images/service-5.png",
    title: "Gym Center Interior Design",
    description:
      "Transforming fitness spaces into motivating, high‑energy zones where design supports determination and focus.",
  },
  {
    thumbnail: "/images/service-6.png",
    title: "Commercial Interior Design",
    description:
      "Elevating offices and commercial spaces with smart, modern layouts that reflect your brand and enhance productivity.",
  },
];

const ServiceSection = () => {
  const titleRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    // Skip GSAP animations on mobile screens
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
      },
    );

    gsap.fromTo(
      servicesRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: { trigger: servicesRef.current, start: "top 85%" },
      },
    );
  }, []);
  return (
    <section className=" py-8 md:py-2">
      <Container>
        <div ref={titleRef} className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2D2D2D] leading-tight">
            We Shape Interiors That <br />
            <span className="text-[#FE5443]">Reflect</span> Your Story
          </h2>
        </div>
        <div ref={servicesRef} className="mt-8 sm:mt-10 md:mt-12">
          {/* Mobile Slider */}
          <div className="block md:hidden">
            <Swiper spaceBetween={16} slidesPerView={1.1}>
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <ServiceCard service={service} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceSection;
