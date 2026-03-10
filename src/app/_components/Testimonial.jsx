"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";

const TestimonialSection = () => {
  return (
    <div className=" px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-[#2D2D2D] leading-tight tracking-tight mb-6">
          We Shape Interiors That <br />
          <span className="text-[#FE5443]">Reflect</span> Your Story
        </h2>

        {/* Description Paragraph */}
        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          {` Our clients' experiences speak volumes. From concept to completion, they share how 
          Arcattic's designs have transformed their spaces and exceeded expectations. Their 
          trust and satisfaction are the foundations of our continued success.`}
        </p>
      </div>
      <div className="mx-auto max-w-7xl mt-8 sm:mt-10 md:mt-12">
        {/* Mobile Slider */}
        <div className="block md:hidden">
          <Swiper spaceBetween={16} slidesPerView={1.1}>
            {[...Array(3)].map((_, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard
                  service={{
                    image: "/images/avater.png",
                    name: "John Doe",
                    position: "Client",
                    description: "Great service!",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {[...Array(3)].map((_, index) => (
            <TestimonialCard
              key={index}
              service={{
                image: "/images/avater.png",
                name: "John Doe",
                position: "Client",
                description: "Great service!",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
