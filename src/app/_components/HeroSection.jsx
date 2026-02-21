"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BtnPrimary from "./common/BtnPrimary";
import BtnSecondary from "./common/BtnSecondary";
import Container from "./common/Container";
import SectionTitle from "./common/SectionTitle";
import VideoPopup from "./VideoPopup";

const slides = [
  {
    id: 1,
    title: "Modern Architecture",
    titleHighlight: "Design",
    subtitle:
      "arch INNER is where structural integrity meets refined interior aesthetics. We provide a seamless transition from construction.",
    image: "/images/hero-image.png",
    alt: "Modern Architecture",
  },
  {
    id: 2,
    title: "Innovative",
    titleHighlight: "Solutions",
    subtitle:
      "Transform your space with cutting-edge architectural designs that blend functionality with breathtaking aesthetics.",
    image: "/images/hero-image.png",
    alt: "Innovative Solutions",
  },
  {
    id: 3,
    title: "Sustainable",
    titleHighlight: "Future",
    subtitle:
      "Building tomorrow's spaces today with eco-friendly materials and energy-efficient architectural solutions.",
    image: "/images/hero-image.png",
    alt: "Sustainable Future",
  },
];

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const heroRef = useRef(null);
  const swiperRef = useRef(null);
  const contentRef = useRef(null);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the entire hero section
    gsap.fromTo(
      heroRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
    );

    // Animate swiper (image)
    gsap.fromTo(
      swiperRef.current,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      },
    );

    // Animate content (text and buttons)
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
      },
    );
  }, []);

  return (
    <Container>
      <div
        ref={heroRef}
        className="flex flex-col lg:flex-row items-center lg:items-center mt-20 md:mt-0 my-10 gap-6 sm:gap-8 lg:gap-10 relative"
      >
        <div
          ref={swiperRef}
          className="flex-1 relative w-full min-w-0 order-1 lg:order-2"
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="heroSwiper"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  width={600}
                  height={400}
                  className="rounded-xl sm:rounded-2xl object-cover w-full h-auto"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xs sm:text-sm text-gray-400">
            Scroll Down
          </span>
        </div>
        <div
          ref={contentRef}
          className="flex flex-col flex-1 gap-4 sm:gap-5 md:gap-6 w-full lg:max-w-xl order-2 lg:order-1"
        >
          <SectionTitle
            title="Modern Architecture"
            titleHighlight="Design"
            subtitle="arch INNER is where structural integrity meets refined interior aesthetics. We provide a seamless transition from construction."
          />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
            <BtnPrimary text="Book Consultation" />
            <BtnSecondary text="Watch Video" onClick={openVideo} />
          </div>
        </div>
      </div>

      <VideoPopup
        isOpen={isVideoOpen}
        onClose={closeVideo}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
    </Container>
  );
};

export default HeroSection;
