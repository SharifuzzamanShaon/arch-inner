"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/public/m/testimonials`);
        const data = res?.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading || !testimonials.length) return null;

  return (
    <div className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2D2D2D] leading-tight tracking-tight mb-4 sm:mb-6">
          We Shape Interiors That <br />
          <span className="text-[#FE5443]">Reflect</span> Your Story
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {`Our clients' experiences speak volumes. From concept to completion, they share how
          Arcattic's designs have transformed their spaces and exceeded expectations. Their
          trust and satisfaction are the foundations of our continued success.`}
        </p>
      </div>
      <div className="mx-auto max-w-7xl mt-8 sm:mt-10 md:mt-12">
        {/* Mobile Slider */}
        <div className="block md:hidden">
          <Swiper spaceBetween={16} slidesPerView={1.1}>
            {testimonials.map((t, index) => (
              <SwiperSlide key={t.id || index}>
                <TestimonialCard service={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.id || index} service={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
