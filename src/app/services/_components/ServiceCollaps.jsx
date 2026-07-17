"use client";

import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SERVICES } from "../_data/services";

const ServiceCollaps = () => {
  return (
    <section className="bg-[#F2F2F2] border-t border-[#383636]/8">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <h2
            className="font-normal text-[#383636] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Our Services
          </h2>
          <p className="text-sm text-[#383636]/50 font-normal max-w-xs leading-relaxed">
            From concept to handover — across every discipline we offer.
          </p>
        </div>

        <div className="-mx-6 md:mx-0">
          <Swiper
            modules={[Autoplay]}
            grabCursor
            loop
            autoplay={{
              delay: 3000,
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
                slidesPerView: 2.4,
                spaceBetween: 24,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
              },
            }}
          >
            {SERVICES.map((service) => (
              <SwiperSlide key={service.id} className="h-auto">
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative overflow-hidden bg-[#1C1917] block rounded-xl w-full"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={service.image}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 40vw"
                    alt={service.name}
                    className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute top-4 right-4 w-8 h-8 border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white text-sm leading-none">→</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <h3
                      className="font-normal text-white leading-snug mb-2"
                      style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}
                    >
                      {service.name}
                    </h3>
                    <p className="text-[13px] text-white/55 font-normal leading-relaxed line-clamp-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      {service.shortDescription}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 text-white/50 group-hover:text-white/80 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 opacity-0 group-hover:opacity-100">
                      <span>Learn More</span>
                      <span className="w-4 h-px bg-current group-hover:w-6 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ServiceCollaps;
