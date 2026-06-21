"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const ContactModal = ({ isOpen, onClose }) => {
  const backdropRef = useRef(null);
  const cardRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });

  // Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // GSAP open / close
  useEffect(() => {
    if (!backdropRef.current || !cardRef.current) return;
    if (isOpen) {
      gsap.set(backdropRef.current, { display: "flex" });
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(cardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.08 }
      );
    } else {
      gsap.to(cardRef.current, { y: 24, opacity: 0, duration: 0.28, ease: "power2.in" });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.32,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => gsap.set(backdropRef.current, { display: "none" }),
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const inputCls =
    "w-full bg-transparent border-b border-[#383636]/15 py-3.5 text-sm text-[#383636]/80 placeholder-[#383636]/30 font-normal tracking-wide outline-none focus:border-[#383636] transition-colors duration-300";
  const labelCls =
    "block text-[10px] tracking-[0.28em] uppercase text-[#383636]/40 font-normal mb-1.5";

  return (
    <div
      ref={backdropRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1C1917]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-lg bg-[#F7F4F0] px-8 sm:px-10 py-10 sm:py-12 overflow-y-auto max-h-[90vh]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#383636]/35 hover:text-[#383636] transition-colors duration-200 border border-[#383636]/12 hover:border-[#383636]/30"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Label */}
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#383636]/40 font-normal mb-5">
          / Get In Touch
        </p>

        {/* Heading */}
        <h2
          className="font-normal text-[#383636] leading-tight mb-8"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
        >
          Let&apos;s Talk About{" "}
          <span className="text-[#383636]/30">Your Project</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
              <label className={labelCls}>Email *</label>
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

          <div>
            <label className={labelCls}>Project Type *</label>
            <div className="relative">
              <select
                required
                name="type"
                value={form.type}
                onChange={handleChange}
                className={`${inputCls} appearance-none cursor-pointer pr-8`}
              >
                <option value="">Choose project type</option>
                <option value="architecture" className="bg-white">Architecture</option>
                <option value="interior-architecture" className="bg-white">Interior Architecture</option>
                <option value="master-plan-landscape" className="bg-white">Master Plan &amp; Landscape</option>
                <option value="product-design" className="bg-white">Product Design</option>
                <option value="project-management" className="bg-white">Project Management</option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#383636]/25 pointer-events-none text-xs">
                ↓
              </span>
            </div>
          </div>

          <div>
            <label className={labelCls}>Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Describe your project and vision…"
              value={form.message}
              onChange={handleChange}
              className={`${inputCls} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="group relative w-full py-4 bg-transparent border border-[#383636]/20 text-[#383636]/60 hover:border-[#383636] hover:text-[#383636] text-xs tracking-[0.22em] uppercase font-normal transition-all duration-400 overflow-hidden"
          >
            <span className="relative z-10 flex cursor-pointer items-center justify-center gap-3">
              Send Inquiry
              <span className="inline-block w-5 h-px bg-current group-hover:w-10 transition-all duration-400" />
              <span>→</span>
            </span>
            <span className="absolute inset-0 bg-[#383636]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
