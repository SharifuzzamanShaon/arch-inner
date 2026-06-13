"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  { src: "/images/bat-kushtia-exterior.jpg",  label: "Bat Kushtia Residence", tag: "Exterior" },
  { src: "/images/slide-1.png",               label: "Arch Inner Projects",   tag: "Architecture" },
  { src: "/images/bat-kushtia-courtyard.jpg", label: "Bat Kushtia Residence", tag: "Courtyard" },
  { src: "/images/gallery-3.png",             label: "Arch Inner Projects",   tag: "Interior" },
  { src: "/images/bat-kushtia-elevation.jpg", label: "Bat Kushtia Residence", tag: "Elevation" },
  { src: "/images/slide-2.png",               label: "Arch Inner Projects",   tag: "Design" },
  { src: "/images/bat-kushtia-lounge.jpg",    label: "Bat Kushtia Residence", tag: "Lounge" },
  { src: "/images/gallery-4.png",             label: "Arch Inner Projects",   tag: "Gallery" },
  { src: "/images/bat-kushtia-night.jpg",     label: "Bat Kushtia Residence", tag: "Night View" },
  { src: "/images/slide-3.png",               label: "Arch Inner Projects",   tag: "Architecture" },
  { src: "/images/gallery-1.png",             label: "Arch Inner Projects",   tag: "Design" },
  { src: "/images/project-1.webp",            label: "Arch Inner Projects",   tag: "Project" },
  { src: "/images/gallery-2.png",             label: "Arch Inner Projects",   tag: "Interior" },
];

const pad = (n) => String(n).padStart(2, "0");

export default function HeroImageCarousel({ fullWidth = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className={`carousel-root${fullWidth ? " full-width" : ""}`}>
      {/* Top info bar — overlaid on the image */}
      <div className="top-bar">
        <span className="top-label">{slides[activeIndex].tag}</span>
        <span className="top-counter">
          {pad(activeIndex + 1)}<span className="sep"> / </span>{pad(slides.length)}
        </span>
      </div>

      {/* Image */}
      <div className="stage">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          className="h-full w-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i} className="h-full">
              <Image
                src={slide.src}
                alt={slide.label}
                fill
                className="object-cover"
                sizes={fullWidth ? "100vw" : "(max-width: 768px) 100vw, 560px"}
                priority={i === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Subtle top-to-bottom gradient so text stays legible */}
        <div className="gradient" />
      </div>

      <style jsx>{`
        .carousel-root {
          position: relative;
          width: 100%;
          max-width: 560px;
          border-radius: 20px;
          overflow: hidden;
          background: #1a1918;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.35);
        }

        .carousel-root.full-width {
          max-width: 100%;
          border-radius: 0;
          box-shadow: none;
        }

        /* ── Stage ── */
        .stage {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
        }

        .carousel-root.full-width .stage {
          aspect-ratio: unset;
          height: 80vh;
        }

        .gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(15, 14, 13, 0.45) 0%,
            transparent 30%
          );
          z-index: 2;
          pointer-events: none;
        }

        /* ── Top bar ── */
        .top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
        }

        .carousel-root.full-width .top-bar {
          padding: 20px 32px;
        }

        .top-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
        }

        .top-counter {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.06em;
        }

        .sep {
          color: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </div>
  );
}
