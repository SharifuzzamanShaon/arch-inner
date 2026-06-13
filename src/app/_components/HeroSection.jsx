"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BtnPrimary from "./common/BtnPrimary";
import BtnSecondary from "./common/BtnSecondary";
import Container from "./common/Container";
import HeroImageCarousel from "./HeroImageCarousel";
import SectionTitle from "./common/SectionTitle";
import VideoPopup from "./VideoPopup";

const slides = [
  {
    id: 1,
    title: "Modern Architecture",
    titleHighlight: "Design",
    subtitle:
      "arch INNER is where structural integrity meets refined interior aesthetics. We provide a seamless transition from construction.",
    features: ["Innovative Design", "Sustainable Materials", "Smart Technology"],
  },
  {
    id: 2,
    title: "Innovative",
    titleHighlight: "Solutions",
    subtitle:
      "Transform your space with cutting-edge architectural designs that blend functionality with breathtaking aesthetics.",
    features: ["3D Visualization", "Custom Planning", "Expert Consultation"],
  },
  {
    id: 3,
    title: "Sustainable",
    titleHighlight: "Future",
    subtitle:
      "Building tomorrow's spaces today with eco-friendly materials and energy-efficient architectural solutions.",
    features: ["Green Building", "Energy Efficiency", "Eco-Friendly"],
  },
];

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const heroRef = useRef(null);
  const carouselRef = useRef(null);
  const contentRef = useRef(null);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  useEffect(() => {
    // Skip GSAP animations on mobile screens
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

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

    // Animate carousel (image)
    gsap.fromTo(
      carouselRef.current,
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
          ref={carouselRef}
          className="flex justify-center lg:justify-end w-full order-1 lg:order-2"
        >
          <HeroImageCarousel />
        </div>
        <div className="flex flex-col flex-1 gap-4 sm:gap-5 md:gap-6 w-full lg:max-w-xl order-2 lg:order-1">
          <SectionTitle
            title={slides[0].title}
            titleHighlight={slides[0].titleHighlight}
            subtitle={slides[0].subtitle}
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {slides[0].features.map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
          <Link href="/contact">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
              <BtnPrimary text="Book Consultation" />
              <BtnSecondary text="Watch Video" onClick={openVideo} />
            </div>
          </Link>
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
