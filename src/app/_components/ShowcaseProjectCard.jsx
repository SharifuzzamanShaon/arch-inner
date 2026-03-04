"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";

const ShowcaseProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  const maskStyles = {
    maskImage: `url("data:image/svg+xml,%3Csvg width='571' height='503' viewBox='0 0 571 503' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M571 421C571 434.255 560.255 445 547 445H436C416.118 445 400 461.118 400 481C400 493.15 390.15 503 378 503H24C10.7452 503 0 492.255 0 479V24C0 10.7452 10.7452 0 24 0H547C560.255 0 571 10.7452 571 24V421Z' fill='black'/%3E%3C/svg%3E")`,
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='571' height='503' viewBox='0 0 571 503' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M571 421C571 434.255 560.255 445 547 445H436C416.118 445 400 461.118 400 481C400 493.15 390.15 503 378 503H24C10.7452 503 0 492.255 0 479V24C0 10.7452 10.7452 0 24 0H547C560.255 0 571 10.7452 571 24V421Z' fill='black'/%3E%3C/svg%3E")`,
    WebkitMaskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
  };

  useEffect(() => {
    // Skip GSAP animations on mobile screens
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    const ctx = gsap.context(() => {
      // Initial animation on mount
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(imageRef.current, {
        scale: 1.2,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
      });

      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: 0.6,
      });

      // Hover animations
      const card = cardRef.current;

      const handleMouseEnter = () => {
        gsap.to(imageRef.current, {
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full group max-w-[571px] mx-auto">
      <Card
        ref={cardRef}
        className="relative flex min-h-[420px] lg:min-h-[500px] flex-col justify-between border-none bg-[#2B1411] text-white shadow-xl overflow-hidden"
        style={maskStyles}
      >
        <div ref={imageRef} className="absolute inset-0 z-0">
          <Image
            src={project?.image || "/api/placeholder/400/400"}
            alt={project?.title || "Project"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700"
            priority
            unoptimized
          />
        </div>

        <div className="flex items-start justify-between px-4 sm:px-6 pt-16 xl:pt-6 relative z-10">
          <Badge className="rounded-full bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1 text-[10px] sm:text-xs text-white border-none">
            {project?.category || "Interior"}
          </Badge>
          <div className="flex items-start gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] sm:text-xs text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FE5443] animate-pulse" />
            {project?.location || "Dhaka"}
          </div>
        </div>

        <CardContent
          ref={contentRef}
          className="relative z-10 mt-auto px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24 pt-0"
        >
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 leading-tight text-left">
            {project?.title || "Modern Living"}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 line-clamp-2 max-w-[85%] text-left">
            {project?.description ||
              "A beautiful blend of modern aesthetics and functional design."}
          </p>
        </CardContent>
      </Card>

      <div
        ref={buttonRef}
        className="absolute bottom-[20px] right-[12px] md:bottom-px md:right-[2px] z-20 p-1"
      >
        <Link href={`/portfolio/${project?.id}`}>
          <Button className="flex items-center gap-3 rounded-full cursor-pointer hover:bg-transparent hover:border hover:border-[#FE5443] hover:text-[#FE5443] bg-[#FE5443] h-8 sm:h-10 px-4 text-xs sm:text-sm font-bold text-white shadow-2xl transition-all active:scale-95">
            <span className="hidden lg:inline">View Project</span>
            <span className="lg:hidden">View</span>
            <FaArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ShowcaseProjectCard;
