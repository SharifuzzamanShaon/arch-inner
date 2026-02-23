"use client";

import Container from "@/app/_components/common/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

const MissionSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Text content animation
      gsap.from(textRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Image animation with rotation
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 50,
        rotation: 10,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Container>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          {/* Text Content */}
          <div ref={textRef} className="space-y-6">
            <h2 className="text-5xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              Our mission is to transform ordinary spaces into extraordinary
              experiences. At Arch Inner, we are committed to delivering
              innovative interior solutions that balance aesthetics,
              functionality, and sustainability. We believe every space has a
              story to tell, and we craft designs that honor your vision while
              exceeding expectations.
            </p>
            <button className="px-8 py-3 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-all font-medium">
              Learn More
            </button>
          </div>

          {/* Notched Image Container */}
          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-end"
          >
            <div
              className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg"
              style={{
                clipPath:
                  "polygon(0% 10%, 10% 10%, 10% 0%, 90% 0%, 90% 10%, 100% 10%, 100% 90%, 90% 90%, 90% 100%, 10% 100%, 10% 90%, 0% 90%)",
              }}
            >
              <Image
                src="/images/mission-img.png"
                alt="Interior Design Sketch"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MissionSection;
