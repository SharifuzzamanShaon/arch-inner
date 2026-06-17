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
      title: "Preparation & Briefing",
      desc: "Understanding your vision, requirements, budget, and timeline to establish a clear project brief.",
      img: "/images/step-1.png",
    },
    {
      id: "02",
      title: "Concept Design",
      desc: "Developing mood boards, colour schemes, and spatial concepts aligned with the project's identity.",
      img: "/images/step-2.png",
    },
    {
      id: "03",
      title: "Spatial Coordination",
      desc: "Refining floor plans and furniture layouts so every area is purposeful, functional, and cohesive.",
      img: "/images/step-3.png",
    },
    {
      id: "04",
      title: "Technical Design",
      desc: "Producing detailed drawings, 3D visualisations, and construction documents for precise execution.",
      img: "/images/step-4.png",
    },
    {
      id: "05",
      title: "Manufacturing & Construction",
      desc: "Overseeing fabrication, procurement, and on-site build to the standard set in design documentation.",
      img: "/images/BAT%20KUSHTIA_BD-FARMER%20WAITING%20STATION%20AND%20TRAINING%20CENTER%20AT%20MLD./MASTER%20PLAN.png",
    },
    {
      id: "06",
      title: "Handover",
      desc: "Final walkthrough to verify quality and completeness before formally handing over the space.",
      img: "/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION/INTERIOR%20VIEW%20RECEPTION%20AREA.png",
    },
    {
      id: "07",
      title: "Use & Aftercare",
      desc: "Remaining available post-handover for maintenance guidance and future phase planning.",
      img: "/images/IELTS/WORKING%20ZONE%202.png",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto text-center space-y-5 pb-12">
        <h2
          className="font-normal text-[#383636] leading-tight"
          style={{ fontSize: "clamp(1rem, 4vw, 3.75rem)" }}
        >
          How We Work
        </h2>
      </div>
      <div className="relative w-full py-16 overflow-hidden bg-gray-900">
        <Image
          src="/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION/INTERIOR%20VIEW%20RECEPTION%20AREA_2.png"
          alt="Fervent Chairman Floor"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <Container>
          <div className="relative z-10 py-8 flex flex-col gap-6">

            {/* Row 1 — steps 1–4 */}
            <div className="flex flex-col md:flex-row gap-8">
              {steps.slice(0, 4).map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => (stepsRef.current[index] = el)}
                  className={`bg-zinc-900/60 border border-zinc-900 rounded-[10px] backdrop-blur-2xl overflow-hidden flex flex-col hover:bg-zinc-900/70 transition-all group md:mt-0 ${
                    index % 2 === 0 ? "md:-mt-12" : "md:mt-12"
                  }`}
                >
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      src={step.img}
                      alt={step.title}
                      priority
                      width={1200}
                      height={800}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="text-white text-base sm:text-lg font-normal mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed font-normal max-w-[95%]">
                      {step.desc}
                    </p>
                    <div className="mt-auto flex justify-end pt-4">
                      <span
                        className="text-white/10 font-normal leading-none select-none"
                        style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                      >
                        {step.id}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 — steps 5–7 */}
            <div className="flex flex-col md:flex-row md:justify-center gap-8">
              {steps.slice(4).map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => (stepsRef.current[index + 4] = el)}
                  className={`bg-zinc-900/60 border border-zinc-900 rounded-[10px] backdrop-blur-2xl overflow-hidden flex flex-col hover:bg-zinc-900/70 transition-all group md:w-1/4 md:mt-0 ${
                    index % 2 === 0 ? "md:-mt-12" : "md:mt-12"
                  }`}
                >
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      src={step.img}
                      alt={step.title}
                      priority
                      width={1200}
                      height={800}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="text-white text-base sm:text-lg font-normal mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed font-normal max-w-[95%]">
                      {step.desc}
                    </p>
                    <div className="mt-auto flex justify-end pt-4">
                      <span
                        className="text-white/10 font-normal leading-none select-none"
                        style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
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
