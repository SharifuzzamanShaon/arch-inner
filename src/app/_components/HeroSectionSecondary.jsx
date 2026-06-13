"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import HeroImageCarousel from "./HeroImageCarousel";

const HeroSectionSecondary = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      rootRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
    );
  }, []);

  return (
    <section ref={rootRef} className="relative w-full pt-16 sm:pt-18 lg:pt-20">
      <HeroImageCarousel fullWidth />
    </section>
  );
};

export default HeroSectionSecondary;
