"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const AboutDesign = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        contentRef.current.querySelectorAll(".reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.11, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36">
        <div
          ref={lineRef}
          className="w-full h-px bg-[#383636]/12 mb-16 sm:mb-20 origin-left"
        />

        <div className="flex flex-col lg:flex-row items-start gap-12 sm:gap-16 lg:gap-28">
          {/* Text */}
          <div ref={contentRef} className="flex-1 lg:max-w-120">
            <p className="reveal text-xs tracking-[0.3em] uppercase text-[#383636] mb-7 font-normal">
              / About Us
            </p>
            <h2
              className="reveal font-normal text-[#383636] leading-[1.1] mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
              Design Rooted in Craft,{" "}
              <em className="not-italic text-[#383636]/40">Materiality</em>
              <br />& Emotion
            </h2>
            <p className="reveal text-sm sm:text-base text-[#383636]/55 font-normal leading-relaxed mb-10 max-w-md">
              At Arch Inner, we blend architecture and interior design seamlessly. We
              don&apos;t just decorate within boundaries — we reimagine them. Our studio
              specializes in creating spaces that feel both deeply personal and
              effortlessly elegant, where every detail serves a purpose.
            </p>

            {/* Stats row */}
            <div className="reveal grid grid-cols-2 gap-0 mb-10 border-t border-[#383636]/12">
              {[
                { n: "10+", l: "Years" },
                { n: "240+", l: "Projects" },
              ].map(({ n, l }) => (
                <div key={l} className="py-6 pr-8 border-r border-[#383636]/12 last:border-r-0 last:pl-8 last:pr-0">
                  <span className="block text-3xl font-normal text-[#383636] tracking-tight">{n}</span>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#383636]/40">{l}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about-us"
              className="reveal group inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-[#383636] hover:text-[#383636]/60 transition-colors duration-300 font-normal"
            >
              <span>Learn More</span>
              <span className="inline-block w-8 h-px bg-current group-hover:w-14 transition-all duration-400" />
              <span className="text-base leading-none">→</span>
            </Link>
          </div>

          {/* Image */}
          <div ref={imageRef} className="flex-1 relative w-full min-w-0">
            <div className="relative overflow-hidden">
              <Image
                src="/images/hero-image.png"
                alt="Arch Inner design process"
                width={720}
                height={540}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Corner marks */}
              <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#383636]/30" />
              <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#383636]/30" />
              <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#383636]/30" />
              <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#383636]/30" />
            </div>
            <p className="mt-3 text-right text-xs tracking-[0.18em] uppercase text-[#383636]/40 font-normal">
              Dhaka, Bangladesh · 2024
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDesign;
