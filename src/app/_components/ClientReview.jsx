"use client";

import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "./common/Container";

const logos = [
  "/images/client-logo-1.png",
  "/images/client-logo-2.png",
  "/images/client-logo-2.png",
  "/images/client-logo-1.png",
  "/images/client-logo-2.png",
  "/images/client-logo-2.png",
];

const ClientReview = () => {
  const swiperRef = useRef(null);

  return (
    <Container>
      {/* Trust Score */}
      <div className="text-center mb-4 pt-6 my-6 sm:mb-5 sm:pt-8 md:mb-6 md:pt-10 md:pb-12 lg:pb-15">
        <p className="text-[#222222] text-sm sm:text-base">
          Client trust score <span className="font-semibold">4.7</span> (based
          on 250 reviews)
        </p>
        <div className="flex justify-center text-[#FE5443] mt-1 space-x-0.5 sm:space-x-1 text-base sm:text-lg">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>

      {/* Swipeable logo slider – 2 visible on mobile, 4 on desktop */}
      <div className="relative w-full my-10">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className="clientSwiper"
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-20 sm:h-24 md:h-28">
                <Image
                  src={logo}
                  alt={`Client logo ${index + 1}`}
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default ClientReview;
