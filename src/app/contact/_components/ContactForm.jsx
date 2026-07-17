"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const DETAILS = [
  { label: "Phone", value: "01717-038194", href: "tel:+8801717038194" },
  {
    label: "Email",
    value: "archinner@gmail.com",
    href: "mailto:archinner@gmail.com",
  },
  {
    label: "Address",
    value: "Ja-80, Siddique Manjil,\nMohakhali C/A, Dhaka 1212",
  },
  { label: "Hours", value: "Sun – Thu  ·  10am – 7pm" },
];

const MAP_LINK = "https://maps.app.goo.gl/nGCtAU3gSfPrJL717";
const MAP_EMBED =
  "https://maps.google.com/maps?q=23.7812174,90.4067962&z=16&output=embed";

const InquiryForm = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current.querySelectorAll(".l-item"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen pt-20 sm:pt-18 lg:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* ── Left — dark info panel ── */}
        <div
          ref={leftRef}
          className="order-last lg:order-first bg-[#1C1917] flex flex-col justify-between px-8 sm:px-12 lg:px-16 pt-16 sm:pt-10 pb-14 sm:pb-16"
        >
          {/* Top content */}
          <div>
            <p className="l-item text-[10px] tracking-[0.35em] uppercase text-white/35 font-normal mb-8">
              / Contact
            </p>
            <h1
              className="l-item font-normal text-white leading-[1.06] mb-8"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
            >
              Let&apos;s Create
              <br />
              <span className="text-white/30">Something</span>
              <br />
              Remarkable.
            </h1>
            <p className="l-item text-sm text-white/35 font-normal leading-relaxed max-w-xs mb-12">
              We&apos;d love to hear about your next project — whether it&apos;s
              a concept sketch or a fully developed brief.
            </p>

            {/* Divider */}
            <div className="l-item w-10 h-px bg-white/15 mb-12" />

            {/* Contact details */}
            <div className="space-y-7">
              {DETAILS.map(({ label, value, href }) => (
                <div key={label} className="l-item flex items-start gap-6">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-normal w-14 pt-0.5 shrink-0">
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-white/50 hover:text-white font-normal leading-relaxed transition-colors duration-200 whitespace-pre-line"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-white/50 font-normal leading-relaxed whitespace-pre-line">
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom — socials */}
          <div className="l-item mt-14 flex items-center gap-5 border-t border-white/8 pt-8">
            {[
              {
                Icon: FaFacebookF,
                href: "https://www.facebook.com/archinner1/",
                label: "Facebook",
              },
              {
                Icon: FaInstagram,
                href: "https://www.instagram.com/arch.inner",
                label: "Instagram",
              },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Right — map panel ── */}
        <div
          ref={rightRef}
          className="order-first lg:order-last relative bg-[#F7F4F0] min-h-[60vh] lg:min-h-0 overflow-hidden"
        >
          <iframe
            title="arch INNER — Office Location"
            src={MAP_EMBED}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Open in Google Maps */}
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-3 bg-[#1C1917] text-white/80 hover:text-white text-[10px] tracking-[0.22em] uppercase font-normal px-5 py-3 transition-colors duration-300"
          >
            <span>Open in Google Maps</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
