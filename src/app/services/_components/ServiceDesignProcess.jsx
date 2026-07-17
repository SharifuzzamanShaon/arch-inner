"use client";

import Container from "@/app/_components/common/Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { DESIGN_PROCESS } from "../_data/services";

const ServiceDesignProcess = () => {
  const stepsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    stepsRef.current.forEach((step, index) => {
      if (!step) return;
      gsap.fromTo(
        step,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  const renderCard = (process, index, extraClass = "") => (
    <div
      key={process.step}
      ref={(el) => (stepsRef.current[index] = el)}
      className={`bg-zinc-900/60 border border-zinc-900 rounded-[10px] backdrop-blur-2xl overflow-hidden flex flex-col hover:bg-zinc-900/70 transition-all group md:mt-0 ${
        index % 2 === 0 ? "md:-mt-12" : "md:mt-12"
      } ${extraClass}`}
    >
      <div className="relative w-full h-40 overflow-hidden">
        <Image
          src={process.image}
          alt={process.title}
          priority
          width={1200}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-white text-base sm:text-lg font-normal mb-2">
          {process.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed font-normal max-w-[95%]">
          {process.description}
        </p>
        <div className="mt-auto flex justify-end pt-4">
          <span
            className="text-white/10 font-normal leading-none select-none"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {process.step}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-[#383636]/3 border-t border-[#383636]/10 pt-20 sm:pt=-28">
      {/* Heading */}
      <div className="max-w-360 mx-auto px-6 sm:px-14 lg:px-16">
        <p className="text-xs tracking-[0.3em] uppercase text-[#383636] mb-5 font-normal">
          / How We Work
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 sm:mb-20">
          <h2
            className="font-normal text-[#383636] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Design Process
          </h2>
          <p className="text-sm text-[#383636]/50 font-normal max-w-xs leading-relaxed">
            A structured seven-stage framework that ensures every project is
            delivered with precision and clarity.
          </p>
        </div>
      </div>

      {/* Dark image backdrop with offset step cards */}
      <div className="relative w-full py-16 overflow-hidden bg-gray-900">
        <Image
          src="/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION/INTERIOR%20VIEW%20RECEPTION%20AREA_2.png"
          alt="Design process"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <Container>
          <div className="relative z-10 py-8 flex flex-col gap-6">
            {/* Row 1 — steps 1–4 */}
            <div className="flex flex-col md:flex-row gap-8">
              {DESIGN_PROCESS.slice(0, 4).map((process, index) =>
                renderCard(process, index),
              )}
            </div>

            {/* Row 2 — steps 5–7 */}
            <div className="flex flex-col md:flex-row md:justify-center gap-8">
              {DESIGN_PROCESS.slice(4).map((process, index) =>
                renderCard(process, index + 4, "md:w-1/4"),
              )}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ServiceDesignProcess;
