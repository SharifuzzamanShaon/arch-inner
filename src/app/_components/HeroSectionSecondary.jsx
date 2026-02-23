"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import gsap from "gsap";
import { useEffect } from "react";
import BtnPrimary from "./common/BtnPrimary";
import BtnSecondary from "./common/BtnSecondary";
import Container from "./common/Container";
import SectionTitle from "./common/SectionTitle";
import VideoPopup from "./VideoPopup";

const HERO_DATA = [
  {
    id: 1,
    title: "Modern Architecture",
    highlight: "Design",
    subtitle:
      "arch INNER is where structural integrity meets refined interior aesthetics. We provide a seamless transition from construction.",
    tags: ["Innovative Design", "Sustainable Materials", "Smart Technology"],
    image: "/images/slide-1.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Eco-Friendly",
    highlight: "Living",
    subtitle:
      "Discover spaces designed with the planet in mind, utilizing renewable resources and energy-efficient systems.",
    tags: ["Solar Power", "Green Roofs", "Recycled Steel"],
    image: "/images/slide-2.png", // Replace with your image path
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Luxury Interior",
    highlight: "Elegance",
    subtitle:
      "Bespoke furniture and high-end finishes that redefine what it means to live in total comfort and style.",
    tags: ["Premium Marble", "Custom Lighting", "Artisanal Decor"],
    image: "/images/slide-3.png", // Replace with your image path
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const HeroSectionSecondary = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");
  const contentRef = useRef(null);
  const bgImageRef = useRef(null);

  const handleOpenVideo = (url) => {
    setActiveVideo(url);
    setIsVideoOpen(true);
  };

  const handleSlideChange = () => {
    // Reset and animate content for the new slide
    gsap.set(".hero-content", { opacity: 0, y: 50 });
    gsap.set(".hero-title", { opacity: 0, y: 30 });
    gsap.set(".hero-subtitle", { opacity: 0, y: 30 });
    gsap.set(".hero-tags", { opacity: 0, y: 20 });
    gsap.set(".hero-buttons", { opacity: 0, y: 20 });
    gsap.set(".hero-bg-image", { scale: 1.2, opacity: 0 });

    // Animate to final states
    gsap.to(".hero-content", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.to(".hero-title", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.to(".hero-subtitle", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.to(".hero-tags", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.7,
      ease: "power3.out",
    });

    gsap.to(".hero-buttons", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.9,
      ease: "power3.out",
    });

    gsap.to(".hero-bg-image", {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    // Initial animation on mount
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".hero-content", { opacity: 0, y: 50 });
      gsap.set(".hero-title", { opacity: 0, y: 30 });
      gsap.set(".hero-subtitle", { opacity: 0, y: 30 });
      gsap.set(".hero-tags", { opacity: 0, y: 20 });
      gsap.set(".hero-buttons", { opacity: 0, y: 20 });
      gsap.set(".hero-bg-image", { scale: 1.2, opacity: 0 });

      // Animate to final states
      gsap.to(".hero-content", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.to(".hero-tags", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.7,
        ease: "power3.out",
      });

      gsap.to(".hero-buttons", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.9,
        ease: "power3.out",
      });

      gsap.to(".hero-bg-image", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      ref={contentRef}
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1500}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        onSlideChange={handleSlideChange}
        className="hero-swiper w-full h-full"
      >
        {HERO_DATA.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Full-width background image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="hero-bg-image object-cover"
                quality={100}
                sizes="100vw"
              />
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content overlay */}
            <Container className="relative z-10 h-full flex items-center">
              <div className="hero-content max-w-2xl text-white">
                <div className="hero-title mb-6">
                  <SectionTitle
                    title={slide.title}
                    titleHighlight={slide.highlight}
                    subtitle={slide.subtitle}
                    darkMode={false}
                  />
                </div>

                <div className="hero-tags flex flex-wrap gap-2 mb-8">
                  {slide.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="hero-buttons flex flex-col sm:flex-row gap-4">
                  <BtnPrimary text="Book Consultation" />
                  <BtnSecondary
                    text="Watch Video"
                    onClick={() => handleOpenVideo(slide.videoUrl)}
                    darkMode={true}
                  />
                </div>
              </div>
            </Container>

            {/* Slide indicator */}
            <span className="absolute top-6 right-6 text-white/60 text-sm font-medium">
              0{slide.id}/0{HERO_DATA.length}
            </span>
          </SwiperSlide>
        ))}

        {/* Custom Pagination Placement */}
        <div className="custom-pagination flex justify-center absolute bottom-10 left-1/2 -translate-x-1/2 z-20" />
      </Swiper>

      <VideoPopup
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={activeVideo}
      />

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
          width: 12px;
          height: 12px;
          margin: 0 6px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: #fff !important;
          width: 32px;
          border-radius: 6px;
        }

        .hero-swiper .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

export default HeroSectionSecondary;
