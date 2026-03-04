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
} from "react-icons/fa6";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);
const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;

    // Set initial state for all sections
    gsap.set(footer, {
      opacity: 0,
      y: 100,
    });

    // Animate in sections one by one
    gsap.to(footer, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        once: true,
      },
    });

    // Animate individual sections with stagger
    const sections = footer.querySelectorAll(".animate-section");
    gsap.set(sections, {
      opacity: 0,
      y: 50,
    });

    gsap.to(sections, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: footer,
        start: "top 70%",
        once: true,
      },
    });
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#efe8e3] to-[#ff170057]" />
      <Container>
        <div className="relative z-10 pt-20 pb-16 lg:pt-12 lg:pb-40">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-4 animate-section">
              <Image
                src="/images/design-txt-footer.png"
                width={280}
                height={280}
                alt="Footer Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
                <div className="animate-section">
                  <h4 className="mb-4 lg:mb-6 text-sm uppercase tracking-wider text-[#2c2c2c] font-bold">
                    Company
                  </h4>
                  <ul className="space-y-3 lg:space-y-4 text-sm uppercase tracking-wide">
                    <li>
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link href="/blogs">Blogs</Link>
                    </li>
                    <li>
                      <Link href="#">Careers</Link>
                    </li>
                    <li>
                      <Link href="#">Partnerships</Link>
                    </li>
                    <li>
                      <div className="flex items-center gap-4 mt-16 lg:gap-6 text-[#2c2c2c]">
                        <FaLinkedinIn className="h-4 w-4 lg:h-5 lg:w-5 cursor-pointer" />
                        <FaInstagram className="h-4 w-4 lg:h-5 lg:w-5 cursor-pointer" />
                        <FaFacebookF className="h-4 w-4 lg:h-5 lg:w-5 cursor-pointer" />
                        <FaYoutube className="h-4 w-4 lg:h-5 lg:w-5 cursor-pointer" />
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="animate-section">
                  <h4 className="mb-4 lg:mb-6 text-sm uppercase tracking-wider text-[#2c2c2c] font-bold">
                    Resources
                  </h4>
                  <ul className="space-y-3 lg:space-y-4 text-sm uppercase tracking-wide">
                    <li>
                      <Link href="#">Customer Support</Link>
                    </li>
                    <li>
                      <Link href="#">Partnerships</Link>
                    </li>
                  </ul>
                </div>
                <div className="animate-section">
                  <h4 className="mb-4 lg:mb-6 text-sm uppercase tracking-wider text-[#2c2c2c] font-bold">
                    Account
                  </h4>
                  <ul className="space-y-3 lg:space-y-4 text-sm uppercase tracking-wide">
                    <li>
                      <Link href="#">Log-in</Link>
                    </li>
                    <li>
                      <Link href="#">Orders</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className=" lg:mt-10 pt-8 lg:pt-10 flex flex-col items-center gap-6 lg:gap-8">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8 text-xs sm:text-sm uppercase tracking-wide text-[#2c2c2c]">
              {/* <Link href="#">Media Inquiries</Link>
              <Link href="#">Terms & Conditions</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Supplier</Link> */}
            </div>
          </div>
        </div>
      </Container>
      <div className=" absolute bottom-[-10%] left-0 w-full text-[40px] mb-20 md:mb-16 lg:pt-16 sm:text-[80px] lg:text-[120px] font-bold tracking-widest text-black/5 select-none pointer-events-none text-center">
        <div className="pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 sm:pb-10 text-center flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 animate-section">
          <span>
            <Image
              src="/images/footer-logo.png"
              width={30}
              height={30}
              alt="Footer Logo"
              className="w-full h-full object-cover sm:w-[60px] sm:h-[60px]"
            />
          </span>
          ARCH INNER
        </div>
      </div>
    </footer>
  );
};

export default Footer;
