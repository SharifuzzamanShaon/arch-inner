"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import ContactModal from "./common/ContactModal";

export default function StickyContact() {
  const [modalOpen, setModalOpen] = useState(false);
  const barRef = useRef(null);

  // Slide in from right after page load
  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 1.8 },
    );
  }, []);

  const dismiss = () => {
    gsap.to(barRef.current, {
      x: 60,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => gsap.set(barRef.current, { display: "none" }),
    });
  };

  return (
    <>
      <div
        ref={barRef}
        style={{ opacity: 0 }}
        className="fixed bottom-8 right-0 z-40 flex items-stretch"
      >
        {/* Get In Touch trigger */}
        <button
          onClick={() => setModalOpen(true)}
          className="group flex items-center cursor-pointer gap-3 bg-[#383636] text-white/75 hover:text-white px-5 py-3.5 text-[10px] tracking-[0.25em] uppercase font-normal transition-colors duration-200"
        >
          <span>Get In Touch</span>
          <span className="inline-block w-4 h-px bg-current opacity-50 group-hover:w-6 group-hover:opacity-100 transition-all duration-300" />
        </button>

        {/* Divider */}
        <div className="w-px bg-white/10 self-stretch" />

        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="bg-[#383636] hover:bg-[#2a2828] text-white/35 hover:text-white/70 px-3.5 py-3.5 transition-colors duration-200"
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path
              d="M1 1l7 7M8 1L1 8"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
