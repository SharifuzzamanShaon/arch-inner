"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
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
    features: [
      "Innovative Design",
      "Sustainable Materials",
      "Smart Technology",
    ],
  },
  {
    id: 2,
    title: "Innovative",
    titleHighlight: "Solutions",
    subtitle:
      "Transform your space with cutting-edge architectural designs that blend functionality with breathtaking aesthetics.",
    image: "/images/hero-image.png",
    alt: "Innovative Solutions",
    features: ["3D Visualization", "Custom Planning", "Expert Consultation"],
  },
  {
    id: 3,
    title: "Sustainable",
    titleHighlight: "Future",
    subtitle:
      "Building tomorrow's spaces today with eco-friendly materials and energy-efficient architectural solutions.",
    image: "/images/hero-image.png",
    alt: "Sustainable Future",
    features: ["Green Building", "Energy Efficiency", "Eco-Friendly"],
  },
  {
    id: 4,
    title: "Luxury",
    titleHighlight: "Living",
    subtitle:
      "Experience the pinnacle of architectural excellence with bespoke designs that reflect your unique lifestyle and aspirations.",
    image: "/images/hero-image.png",
    alt: "Luxury Living",
    features: ["Premium Materials", "Custom Interiors", "Exclusive Design"],
  },
  {
    id: 5,
    title: "Urban",
    titleHighlight: "Spaces",
    subtitle:
      "Maximize your urban environment with intelligent space planning and contemporary design solutions for modern city living.",
    image: "/images/hero-image.png",
    alt: "Urban Spaces",
    features: ["Space Optimization", "Modern Aesthetics", "Functional Design"],
  },
];

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const swiperRef = useRef(null);
  const contentRef = useRef(null);
  const swiperInstanceRef = useRef(null);

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
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="heroSwiper"
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSwiper={(swiper) => {
              swiperInstanceRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.realIndex);
            }}
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
        <div className="flex flex-col flex-1 gap-4 sm:gap-5 md:gap-6 w-full lg:max-w-xl order-2 lg:order-1">
          <SectionTitle
            title={slides[currentSlide].title}
            titleHighlight={slides[currentSlide].titleHighlight}
            subtitle={slides[currentSlide].subtitle}
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {slides[currentSlide].features.map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
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
