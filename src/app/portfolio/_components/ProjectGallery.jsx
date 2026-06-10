"use client";

import Image from "next/image";
import { useState } from "react";

const ProjectGallery = ({ project }) => {
  const images = project?.gallery || [project?.thumbnail].filter(Boolean);
  const labels = project?.galleryLabels || [];
  const ratio = project?.galleryAspectRatio || "4/5";
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <section className="bg-[#F7F4F0] border-t border-[#383636]/8">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">

        {/* Heading row */}
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#383636]/40 font-light mb-3">
              / Gallery
            </p>
            <h2
              className="font-thin text-[#383636] leading-none"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Project{" "}
              <span className="text-[#383636]/25">Showcase</span>
            </h2>
          </div>
          <div className="text-right pb-0.5">
            <span
              className="font-thin text-[#383636]"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              {String(active + 1).padStart(2, "0")}
            </span>
            <span
              className="text-[#383636]/25 font-thin"
              style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}
            >
              {" "}/ {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Desktop: main image + thumbnail panel */}
        <div className="flex gap-3 lg:gap-4">

          {/* Main featured image */}
          <div className="relative flex-1 overflow-hidden group" style={{ aspectRatio: ratio, maxHeight: "500px" }}>
            <Image
              key={images[active]}
              src={images[active]}
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              alt={labels[active] || `View ${active + 1}`}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />

            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-[#1C1917]/50 via-[#1C1917]/5 to-transparent pointer-events-none" />

            {/* Label + location */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 z-10 flex items-end justify-between">
              <span className="text-[11px] tracking-[0.28em] uppercase text-white/60 font-light">
                {labels[active] || `View ${active + 1}`}
              </span>
              <span className="text-[10px] tracking-[0.2em] text-white/30 font-light">
                {project?.location}
              </span>
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/8 backdrop-blur-xs border border-white/12 text-white/50 hover:text-white hover:bg-white/18 transition-all duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/8 backdrop-blur-xs border border-white/12 text-white/50 hover:text-white hover:bg-white/18 transition-all duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            )}

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-10">
              <div
                className="h-full bg-white/40 transition-all duration-500"
                style={{ width: `${((active + 1) / images.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Thumbnail panel — desktop only */}
          {images.length > 1 && (
            <div className="hidden lg:flex flex-col gap-3 w-50 xl:w-60 shrink-0" style={{ maxHeight: "500px" }}>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative overflow-hidden flex-1 group/thumb transition-all duration-300 ${
                    active === i
                      ? "ring-1 ring-[#383636]/60"
                      : "opacity-40 hover:opacity-70"
                  }`}
                  style={{ aspectRatio: ratio }}
                  aria-label={labels[i] || `View ${i + 1}`}
                >
                  <Image
                    src={src}
                    fill
                    sizes="240px"
                    alt={labels[i] || `View ${i + 1}`}
                    className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                  />
                  {active === i && (
                    <div className="absolute inset-0 bg-[#383636]/8 pointer-events-none" />
                  )}
                  <span className="absolute top-2 right-2.5 text-[9px] tracking-[0.22em] text-white/50 font-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {active === i && (
                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5">
                      <span className="text-[8px] tracking-[0.18em] uppercase text-white/55 font-light line-clamp-1">
                        {labels[i] || `View ${i + 1}`}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile thumbnail strip */}
        {images.length > 1 && (
          <div
            className={`lg:hidden grid gap-2 mt-3 ${
              images.length <= 4
                ? `grid-cols-${images.length}`
                : "grid-cols-5"
            }`}
          >
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative overflow-hidden transition-all duration-300 ${
                  active === i
                    ? "ring-1 ring-[#383636]/60"
                    : "opacity-40 hover:opacity-70"
                }`}
                style={{ aspectRatio: ratio }}
                aria-label={labels[i] || `View ${i + 1}`}
              >
                <Image
                  src={src}
                  fill
                  sizes="20vw"
                  alt={labels[i] || `View ${i + 1}`}
                  className="object-cover"
                />
                <span className="absolute bottom-1.5 right-1.5 text-[8px] tracking-[0.2em] text-white/50 font-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectGallery;
