"use client";

import Container from "@/app/_components/common/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

const VisionSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Only run animations on screens larger than 768px (md breakpoint)
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image animation with different direction
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -50,
        rotation: -10,
        scale: 0.8,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Text content animation
      gsap.from(textRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-8 md:py-20">
        {/* Notched Image Container */}
        <div
          ref={imageRef}
          className="relative flex justify-center lg:justify-start"
        >
          <div
            className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg"
            style={{
              clipPath:
                "polygon(0% 10%, 10% 10%, 10% 0%, 90% 0%, 90% 10%, 100% 10%, 100% 90%, 90% 90%, 90% 100%, 10% 100%, 10% 90%, 0% 90%)",
            }}
          >
            <Image
              src="/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION/INTERIOR%20VIEW%20CHAIRMAN%20ROOM.png"
              alt="Fervent Chairman Floor Interior"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div ref={textRef} className="space-y-1 md:space-y-6">
          <h2
            className="font-normal text-[#383636] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
          >
            Our Vision
          </h2>
          <p className="text-[#383636]/50 text-sm leading-relaxed font-normal">
            Our vision is to become a leading name in interior design,
            recognized for excellence, integrity, and innovation. We aspire to
            set new standards in the industry by continuously pushing creative
            boundaries and embracing sustainable practices. At arch Inner, we
            envision a future where every project we undertake becomes a
            benchmark of quality and a testament to the power of thoughtful
            design. We strive to build lasting relationships with clients,
            turning their dreams into beautifully realized spaces.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="px-8 py-3 border border-[#383636] text-[#383636] cursor-pointer hover:bg-[#383636] hover:text-white transition-all font-normal tracking-wide">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VisionSection;
