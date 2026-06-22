"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";


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

const InquiryForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    phone: "",
    brief: "",
  });
  const country = { flag: "🇧🇩", dialCode: "+880" };
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
        rightRef.current.querySelectorAll(".r-item"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => e.preventDefault();

  const inputCls =
    "w-full bg-transparent border-b border-[#383636]/15 py-4 text-sm text-[#383636] placeholder-[#383636]/30 font-normal tracking-wide outline-none focus:border-[#383636] transition-colors duration-300";
  const labelCls =
    "block text-[10px] tracking-[0.28em] uppercase text-[#383636]/40 font-normal mb-1.5";

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
              { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Right — form panel ── */}
        <div
          ref={rightRef}
          className="order-first lg:order-last bg-[#F7F4F0] flex flex-col justify-center px-8 sm:px-12 lg:px-16 pt-10 lg:pt-10 pb-14 sm:pb-16"
        >
          <p className="r-item text-[10px] tracking-[0.35em] uppercase text-[#383636]/40 font-normal mb-6">
            / Send a Message
          </p>
          <h2
            className="r-item font-normal text-[#383636] leading-tight mb-10 sm:mb-12"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}
          >
            Tell Us About{" "}
            <span className="text-[#383636]/30">Your Project</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7 max-w-lg">
            {/* Name + Email */}
            <div className="r-item grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Email Address *</label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Project Type */}
            <div className="r-item">
              <label className={labelCls}>Project Type *</label>
              <div className="relative">
                <select
                  required
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={`${inputCls} appearance-none pr-8`}
                >
                  <option value="">Choose your project type</option>
                  <option value="architecture" className="bg-white">
                    Architecture
                  </option>
                  <option value="interior-architecture" className="bg-white">
                    Interior Architecture
                  </option>
                  <option value="master-plan-landscape" className="bg-white">
                    Master Plan &amp; Landscape
                  </option>
                  <option value="product-design" className="bg-white">
                    Product Design
                  </option>
                  <option value="project-management" className="bg-white">
                    Project Management
                  </option>
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#383636]/25 pointer-events-none text-xs">
                  ↓
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="r-item">
              <label className={labelCls}>Phone Number</label>
              <div className="flex items-end gap-4">
                {/* Dial code */}
                <div className="flex items-center gap-1.5 pb-4 border-b border-[#383636]/15 text-[#383636]/50 text-sm font-normal shrink-0">
                  <span>{country.flag}</span>
                  <span className="text-xs tracking-wide">{country.dialCode}</span>
                </div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="000-000-0000"
                  value={form.phone}
                  onChange={handleChange}
                  className={`${inputCls} flex-1`}
                />
              </div>
            </div>

            {/* Brief */}
            <div className="r-item">
              <label className={labelCls}>Project Brief</label>
              <textarea
                name="brief"
                rows={5}
                placeholder="Describe your project, timeline, and vision…"
                value={form.brief}
                onChange={handleChange}
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Notice */}
            <p className="r-item text-[10px] tracking-[0.18em] uppercase text-[#383636]/30 font-normal">
              * We respond within 24 – 48 hours.
            </p>

            {/* Submit */}
            <div className="r-item">
              <button
                type="submit"
                className="group relative w-full py-5 bg-[#1C1917] text-white/70 hover:text-white text-xs tracking-[0.25em] uppercase font-normal transition-all duration-400 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  Send Inquiry
                  <span className="inline-block w-5 h-px bg-current group-hover:w-10 transition-all duration-400" />
                  <span>→</span>
                </span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
