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
      img: "/images/DIU/MEETING%20ROOM.png",
    },
    {
      id: "02",
      title: "Design & Planning",
      desc: "Our team creates detailed design concepts, 3D visualizations, and comprehensive plans tailored to your needs.",
      img: "/images/IELTS/2D%20PLAN.png",
    },
    {
      id: "03",
      title: "Implementation",
      desc: "We coordinate seamlessly with contractors and vendors to bring your design to life with precision and care.",
      img: "/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION/INTERIOR%20VIEW%20RECEPTION%20AREA_3.png",
    },
    {
      id: "04",
      title: "Project Handover",
      desc: "Upon completion, we ensure every detail meets our high standards before handing over your dream space.",
      img: "/images/DBPlc%20Kalatia%20Branch%20Presentation/image.png",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto text-center space-y-5 pb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-[#383636]/40 font-normal">
          / Our Process
        </p>

        <h2
          className="font-normal text-[#383636] leading-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
        >
          How We Work
        </h2>

        <p className="text-[#383636]/50 max-w-sm mx-auto text-sm font-normal leading-relaxed">
          {`We've been making people's dreams come true for decades.`}{" "}
          <a
            href="#contact"
            className="text-[#383636] underline underline-offset-4 hover:text-[#383636]/60 transition-colors duration-300"
          >
            Reach out today
          </a>
        </p>
      </div>
      <div className="relative min-h-screen w-full py-20 overflow-hidden bg-gray-900">
        <Image
          src="/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION/INTERIOR%20VIEW%20RECEPTION%20AREA_2.png"
          alt="Fervent Chairman Floor"
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
                    <h3 className="text-white text-base sm:text-lg font-normal mb-2">
                      {step.title}
                    </h3>

                    <p className="text-white/45 text-sm leading-relaxed font-normal max-w-[95%]">
                      {step.desc}
                    </p>

                    {/* Numbering - Positioned Bottom Right */}
                    <div className="mt-auto flex justify-end pt-4">
                      <span
                        className="text-white/10 font-normal leading-none select-none"
                        style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
                      >
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
