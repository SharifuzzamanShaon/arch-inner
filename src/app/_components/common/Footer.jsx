"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8e6e3] via-[#efe8e3] to-[#e6b3a4]" />

      {/* Big Faded Background Text */}
      <div className="absolute bottom-0 left-0 w-full text-[140px] font-bold tracking-widest text-black/5 select-none pointer-events-none">
        <div className="pl-10 pb-6 text-center">ARCH INNER</div>
      </div>

      <Container>
        <div className="relative z-10 pt-20 pb-16">
          <div className="grid grid-cols-12 gap-10">
            {/* LEFT BIG TEXT */}
            <div className="col-span-12 lg:col-span-5">
              <h2
                className="uppercase text-[32px] leading-[1.6] tracking-widest text-transparent"
                style={{
                  WebkitTextStroke: "1px #2c2c2c",
                }}
              >
                Design is the
                <br />
                silent
                <br />
                ambassador
                <br />
                of your brand
                <br />
                and lifestyle.
              </h2>
            </div>

            {/* RIGHT LINKS */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-3 gap-16">
              {/* Company */}
              <div>
                <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#2c2c2c]">
                  Company
                </h4>
                <ul className="space-y-4 text-sm uppercase tracking-wide">
                  <li>
                    <Link href="#">About Us</Link>
                  </li>
                  <li>
                    <Link href="#">Blog</Link>
                  </li>
                  <li>
                    <Link href="#">Careers</Link>
                  </li>
                  <li>
                    <Link href="#">Partnerships</Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#2c2c2c]">
                  Resources
                </h4>
                <ul className="space-y-4 text-sm uppercase tracking-wide">
                  <li>
                    <Link href="#">Customer Support</Link>
                  </li>
                  <li>
                    <Link href="#">Blog</Link>
                  </li>
                  <li>
                    <Link href="#">Careers</Link>
                  </li>
                  <li>
                    <Link href="#">Partnerships</Link>
                  </li>
                </ul>
              </div>

              {/* Account */}
              <div>
                <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#2c2c2c]">
                  Account
                </h4>
                <ul className="space-y-4 text-sm uppercase tracking-wide">
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

          {/* Social + Legal */}
          <div className="mt-16 border-t border-black/10 pt-10 flex flex-col items-center gap-8">
            {/* Social Icons */}
            <div className="flex items-center gap-6 text-[#2c2c2c]">
              <FaLinkedinIn className="h-5 w-5" />
              <FaInstagram className="h-5 w-5" />
              <FaFacebookF className="h-5 w-5" />
              <FaYoutube className="h-5 w-5" />
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-8 text-sm uppercase tracking-wide text-[#2c2c2c]">
              <Link href="#">Media Inquiries</Link>
              <Link href="#">Terms & Conditions</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Supplier</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
