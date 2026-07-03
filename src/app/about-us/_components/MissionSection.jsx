"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

const cells = [
  { type: "text", key: "arch" },
  {
    type: "image",
    src: "/images/BAT%20KUSHTIA_BD-FARMER%20WAITING%20STATION%20AND%20TRAINING%20CENTER%20AT%20MLD./FARMERS%20LOUNGE%20COURTYARD%20ARCHEGROUND%20LTD.png",
    alt: "BAT Farmer Station courtyard",
  },
  {
    type: "image",
    src: "/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION/INTERIOR%20VIEW%20RECEPTION%20AREA.png",
    alt: "Fervent reception interior",
  },
  {
    type: "image",
    src: "/images/DIU/CONFERENCE%20ROOM.png",
    alt: "University of Dhaka conference room",
  },
  { type: "text", key: "interior Architecture" },
  {
    type: "image",
    src: "/images/IELTS/WORKING%20ZONE.png",
    alt: "Servisol ITES workspace",
  },
  {
    type: "image",
    src: "/images/DBPlc%20Kalatia%20Branch%20Presentation/image.png",
    alt: "Dhaka Bank PLC Kalatia branch",
  },
  {
    type: "image",
    src: "/images/BAT%20KUSHTIA_BD-FARMER%20WAITING%20STATION%20AND%20TRAINING%20CENTER%20AT%20MLD./VIEW%20FROM%20ENTRY%20GATE.png",
    alt: "BAT Farmer Station entry view",
  },
  { type: "text", key: "management" },
];

const TEXT = {
  arch: {
    num: "01",
    label: "Architecture",
    body: "We follow the 'less is more' principle when designing — from small-scale residences to large-scale commercial complexes — keeping in consideration the climate, surroundings, and the impact a building has on society. We believe in quality spaces that are well ventilated, well-lit, and efficient.",
  },
  "interior Architecture": {
    num: "02",
    label: "Interior Architecture",
    body: "Our interior work spans corporate head offices, residential apartments, schools, and recreational spaces. We strive for perfection and spend considerable time on the meticulous details that elevate an interior from good to memorable.",
  },
  management: {
    num: "03",
    label: "Project Management",
    body: "Every project runs on our seven-stage work strategy — preparation & briefing, concept design, spatial coordination, technical design, manufacturing & construction, handover, and use. Refined across projects like the BAT Farmer Station and Dhaka Bank PLC, this framework ensures every responsibility is met and each space reaches a considered, useful completion.",
  },
};

const MissionSection = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const items = gridRef.current?.querySelectorAll(".grid-cell");
    if (!items) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      },
    );
  }, []);

  return (
    <section
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-3 border-t border-[#383636]/10 pt-16 sm:pt-18 lg:pt-20"
    >
      {cells.map((cell, i) => {
        if (cell.type === "image") {
          return (
            <div
              key={i}
              className="grid-cell relative aspect-4/3 overflow-hidden"
            >
              <Image
                src={cell.src}
                alt={cell.alt}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          );
        }

        const { num, label, body } = TEXT[cell.key];
        return (
          <div
            key={i}
            className="grid-cell py-12 sm:aspect-4/3 flex flex-col justify-center px-8 sm:px-8 lg:px-12 bg-[#F7F4F0] border-[#383636]/8"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#383636]/40 mb-4 font-normal">
              / {num}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-[#383636] mb-4 uppercase tracking-widest">
              {label}
            </h2>
            <p className="text-[#383636]/55 text-sm leading-relaxed font-normal max-w-xs">
              {body}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default MissionSection;
