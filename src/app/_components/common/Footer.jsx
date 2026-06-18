"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current.querySelectorAll(".f-reveal"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0F0E0D] border-t border-white/5">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">
        {/* Main grid */}
        <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="f-reveal lg:col-span-5 flex flex-col">
            <Image
              src="/images/site-logo.png"
              width={80}
              height={80}
              alt="Arch Inner"
              className="w-12 h-12 object-contain mb-6"
            />
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4 font-normal">
              / Arch Inner
            </p>
            <p className="text-base text-white/30 font-normal leading-relaxed max-w-xs">
              We design spaces that bridge architecture and emotion — crafting
              interiors that feel timeless and deeply personal.
            </p>
            <div className="flex items-center gap-5 mt-8">
              {[
                { icon: FaInstagram, href: "#" },
                { icon: FaFacebookF, href: "#" },
                { icon: FaLinkedinIn, href: "#" },
                { icon: FaYoutube, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href + Icon.name}
                  href={href}
                  className="text-white/20 hover:text-white/70 transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            <div className="f-reveal">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/35 mb-6 font-normal">
                / Studio
              </p>
              <ul className="space-y-4">
                {[
                  { label: "About Us", href: "/about-us" },
                  { label: "Blogs", href: "/blogs" },
                  { label: "Careers", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-base text-white/30 hover:text-white/70 font-normal tracking-wide transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="f-reveal">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/35 mb-6 font-normal">
                / Work
              </p>
              <ul className="space-y-4">
                {[
                  { label: "Project", href: "/project" },
                  { label: "Services", href: "/services" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-base text-white/30 hover:text-white/70 font-normal tracking-wide transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="f-reveal">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/35 mb-6 font-normal">
                / Contact
              </p>
              <ul className="space-y-4">
                {[
                  { label: "Get In Touch", href: "/contact" },
                  { label: "Instagram", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-base text-white/30 hover:text-white/70 font-normal tracking-wide transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/6" />

        {/* Bottom bar */}
        <div className="f-reveal py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/20 font-normal tracking-widest">
            © {new Date().getFullYear()} Arch Inner. All rights reserved.
          </p>
          <p className="text-xs text-white/12 font-normal tracking-[0.15em] uppercase">
            Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Display text */}
      <div className="overflow-hidden border-t border-white/4">
        <p
          className="f-reveal text-center font-normal tracking-[0.35em] text-white/4 select-none pointer-events-none py-4 sm:py-6 whitespace-nowrap"
          style={{ fontSize: "clamp(2rem, 10vw, 10rem)" }}
        >
          ARCH INNER
        </p>
      </div>
    </footer>
  );
};

export default Footer;
