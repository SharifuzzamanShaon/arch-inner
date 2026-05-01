"use client";

import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "./common/Container";
import ServiceCard from "./ServiceCard";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ServiceSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/public/services`);
        const data = res?.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.map((s) => ({ ...s, title: s.name || s.title })));
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

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

  if (loading || !services.length) return null;

  return (
    <section className="pt-16 pb-8 md:pb-16">
      <Container>
        <div ref={titleRef} className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2D2D] leading-tight">
            We Shape Interiors That
            <br />
            <span className="text-[#FE5443]">Reflect</span> Your Story
          </h2>
        </div>
        <div ref={servicesRef} className="mt-8 sm:mt-10 md:mt-12">
          {/* Mobile Slider */}
          <div className="block md:hidden">
            <Swiper spaceBetween={16} slidesPerView={1.1}>
              {services.map((service, index) => (
                <SwiperSlide key={service.id || index}>
                  <ServiceCard service={service} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceSection;
