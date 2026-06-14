"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { posts } from "../blogs/_data/posts";

const latest = posts.slice(0, 3);

const NewsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".reveal"),
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 84%" },
        },
      );
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".news-card"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 84%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white border-t border-[#383636]/10 py-20 sm:py-28"
    >
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">
        {/* Heading */}
        <div
          ref={headingRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <p className="reveal text-xs tracking-[0.3em] uppercase text-[#383636]/50 mb-4 font-normal">
              / News &amp; Insights
            </p>
            <h2
              className="reveal font-normal text-[#383636] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Latest from <span className="text-[#383636]/40">Arch Inner</span>
            </h2>
          </div>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {latest.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="news-card group flex flex-col gap-4"
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "16/10" }}
              >
                <Image
                  src={post.image}
                  fill
                  alt={post.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#383636]/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#383636] font-normal">
                  {post.category}
                </span>
                <span className="w-3 h-px bg-[#383636]/20" />
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#383636]/35 font-normal">
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-[#383636] leading-snug group-hover:text-[#383636]/60 transition-colors duration-300">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-[#383636]/45 font-normal leading-relaxed line-clamp-2 flex-1">
                {post.excerpt}
              </p>

              {/* CTA */}
              <span className="inline-flex items-center gap-2.5 text-[10px] tracking-[0.15em] uppercase text-[#383636]/35 group-hover:text-[#383636] transition-colors duration-300 font-normal mt-auto pt-2">
                <span>Read Article</span>
                <span className="inline-block w-4 h-px bg-current group-hover:w-8 transition-all duration-300" />
                <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
