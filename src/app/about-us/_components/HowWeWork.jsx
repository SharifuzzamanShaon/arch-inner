"use client";

import Container from "@/app/_components/common/Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HowWeWork = () => {
  const stepsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    stepsRef.current.forEach((step, index) => {
      if (step) {
        gsap.fromTo(
          step,
          {
            opacity: 0,
            y: 100,
          },
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
      }
    });
  }, []);
  const steps = [
    {
      id: "01",
      title: "Initial Consultation",
      desc: "We begin by understanding your vision, preferences, and requirements through an in-depth consultation session.",
      img: "/images/step-1.png",
    },
    {
      id: "02",
      title: "Design & Planning",
      desc: "Our team creates detailed design concepts, 3D visualizations, and comprehensive plans tailored to your needs.",
      img: "/images/step-2.png",
    },
    {
      id: "03",
      title: "Implementation",
      desc: "We coordinate seamlessly with contractors and vendors to bring your design to life with precision and care.",
      img: "/images/step-3.png",
    },
    {
      id: "04",
      title: "Project Handover",
      desc: "Upon completion, we ensure every detail meets our high standards before handing over your dream space.",
      img: "/images/step-4.png",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto text-center space-y-4 pb-12">
        <span className="text-[#FE5443] text-sm sm:text-base font-bold uppercase tracking-[0.2em]">
          Our Process
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 tracking-tight">
          How We <span className="text-[#FE5443]">Work</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
          {`We've been making people's dreams come true`}{" "}
          <br className="hidden sm:block" />
          for decades.{" "}
          <a
            href="#contact"
            className="text-[#FE5443] hover:underline transition-all duration-300 decoration-2 underline-offset-4"
          >
            Reach out today
          </a>
        </p>
      </div>
      <div className="relative min-h-screen w-full py-20 overflow-hidden bg-gray-900">
        <Image
          src="/images/our-work.png"
          alt="Background"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <Container>
          <div className="relative z-10 py-12">
            {/* Staggered Grid Layout */}
            <div className="flex flex-col md:flex-row gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => (stepsRef.current[index] = el)}
                  className={`bg-zinc-900/60 border border-zinc-900 rounded-[10px] backdrop-blur-2xl overflow-hidden h-full flex flex-col hover:bg-zinc-900/70 transition-all group md:mt-0 ${
                    index % 2 === 0 ? "md:-mt-25" : "md:mt-25"
                  }`}
                >
                  {/* Image Container - Flush to top/sides */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={step.img}
                      alt={step.title}
                      priority
                      width={1200}
                      height={800}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Area */}
                  <div className="p-5 sm:p-6 md:p-8 flex flex-col relative rounded-[10px]">
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-3 md:mb-4 tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-snug font-light max-w-[90%]">
                      {step.desc}
                    </p>

                    {/* Numbering - Positioned Bottom Right */}
                    <div className="mt-auto flex justify-end">
                      <span className="text-white/20 text-6xl sm:text-7xl md:text-8xl font-bold leading-none select-none">
                        {step.id}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default HowWeWork;
