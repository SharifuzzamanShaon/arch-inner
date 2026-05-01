"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "./common/Container";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ClientReview = () => {
  const swiperRef = useRef(null);
  const [clients, setClients] = useState([]);
  const [trustScore, setTrustScore] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/public/m/clients`);
        const data = res?.data?.data;
        if (data) {
          if (Array.isArray(data.clients) && data.clients.length > 0) {
            setClients(data.clients);
          } else if (Array.isArray(data) && data.length > 0) {
            setClients(data);
          }
          if (data.trust_score) {
            setTrustScore(data.trust_score);
          }
        }
      } catch {
        // silently fail
      }
    };
    fetchClients();
  }, []);

  if (!clients.length) return null;

  return (
    <Container>
      {trustScore && (
        <div className="text-center mb-2 pt-2 my-6 sm:mb-5 sm:pt-8 md:mb-6 md:pt-6">
          <p className="text-[#222222] text-sm sm:text-base">
            Client trust score{" "}
            <span className="font-semibold">{trustScore.score}</span> (based on{" "}
            {trustScore.review_count} reviews)
          </p>
          <div className="flex justify-center text-[#FE5443] mt-1 space-x-0.5 sm:space-x-1 text-base sm:text-lg">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
      )}

      {/* Swipeable logo slider */}
      <div className="relative w-full my-10">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
          }}
          className="clientSwiper"
        >
          {clients.map((client, index) => {
            const logo = client.logo || client.thumbnail || client.image;
            const logoSrc = logo?.startsWith("http")
              ? logo
              : `${BASE_URL}${logo}`;
            return (
              <SwiperSlide key={client.id || index}>
                <div className="flex items-center justify-center h-20 sm:h-24 md:h-28">
                  <Image
                    src={logoSrc}
                    alt={client.name || `Client logo ${index + 1}`}
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    unoptimized
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Container>
  );
};

export default ClientReview;
