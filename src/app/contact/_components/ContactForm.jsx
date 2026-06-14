"use client";

import Image from "next/image";
import { useState } from "react";

const countries = [
  { code: "BD", flag: "🇧🇩", dialCode: "+880", name: "Bangladesh" },
  { code: "US", flag: "🇺🇸", dialCode: "+1", name: "United States" },
  { code: "GB", flag: "🇬🇧", dialCode: "+44", name: "United Kingdom" },
  { code: "IN", flag: "🇮🇳", dialCode: "+91", name: "India" },
  { code: "CA", flag: "🇨🇦", dialCode: "+1", name: "Canada" },
];

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectType: "",
    phone: "",
    projectBrief: "",
  });
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputClass =
    "w-full bg-transparent border-b border-[#383636]/15 py-4 text-base text-[#383636]/80 placeholder-[#383636]/30 font-medium tracking-wide outline-none focus:border-[#383636] transition-colors duration-300";

  const labelClass =
    "block text-[13px] tracking-[0.25em] uppercase text-[#383636]/50 font-semibold mb-2";

  return (
    <section className="bg-white border-t border-[#383636]/10">
      <div className="max-w-360 mx-auto px-6 sm:px-14 lg:px-16 py-20 sm:py-28">
        {/* Section label */}
        <p className="text-xs tracking-[0.3em] uppercase text-[#383636] mb-5 font-normal">
          / Get In Touch
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — image + info */}
          <div className="flex flex-col gap-10">
            <h2
              className="font-normal text-[#383636] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Let&apos;s Talk About
              <br />
              <span className="text-[#383636]/50">Your Project</span>
            </h2>

            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-white/70 to-transparent">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#383636] font-normal mb-1">
                  / Studio
                </p>
                <p className="text-sm text-[#383636]/60 font-normal">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-6 border-t border-[#383636]/12 pt-8">
              {[
                { label: "Phone", value: "+880 1721-700702" },
                { label: "Hours", value: "Sun – Thu, 10am – 7pm" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-6">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#383636]/30 font-normal w-14 pt-0.5">
                    {label}
                  </span>
                  <span className="text-sm text-[#383636]/60 font-normal">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    required
                    name="fullName"
                    type="text"
                    placeholder="Your full name"
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Project Type *</label>
                <div className="relative">
                  <select
                    required
                    name="projectType"
                    onChange={handleInputChange}
                    className={`${inputClass} appearance-none cursor-pointer pr-8`}
                  >
                    <option value="" className="bg-white">
                      Choose your project type
                    </option>
                    <option value="residential" className="bg-white">
                      Residential Villa
                    </option>
                    <option value="commercial" className="bg-white">
                      Commercial Complex
                    </option>
                    <option value="industrial" className="bg-white">
                      Industrial Plot
                    </option>
                  </select>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#383636]/25 pointer-events-none text-xs">
                    ↓
                  </span>
                </div>
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <div className="relative flex items-end gap-4">
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 pb-4 border-b border-[#383636]/15 text-[#383636]/50 hover:text-[#383636]/80 transition-colors duration-300 text-base font-medium"
                    >
                      <span className="text-lg">{selectedCountry.flag}</span>
                      <span className="text-xs tracking-wide">
                        {selectedCountry.dialCode}
                      </span>
                      <span
                        className={`text-[9px] text-[#383636]/25 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#383636]/12 z-50 py-1 shadow-sm">
                        {countries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#383636]/4 transition-colors text-left"
                          >
                            <span className="text-lg">{c.flag}</span>
                            <span className="text-xs text-[#383636]/60 font-normal flex-1">
                              {c.name}
                            </span>
                            <span className="text-[10px] text-[#383636]/30">
                              {c.dialCode}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    name="phone"
                    type="tel"
                    placeholder={`${selectedCountry.dialCode} 000-000`}
                    onChange={handleInputChange}
                    className={`${inputClass} flex-1`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Project Brief</label>
                <textarea
                  name="projectBrief"
                  rows={5}
                  placeholder="Describe your project, timeline, and vision..."
                  onChange={handleInputChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <p className="text-xs text-[#383636]/40 tracking-[0.15em] uppercase font-medium">
                * We respond within 24–48 hours.
              </p>

              <button
                type="submit"
                className="group relative w-full py-5 bg-transparent border border-[#383636]/20 text-[#383636]/60 hover:border-[#383636] hover:text-[#383636] text-base tracking-[0.2em] uppercase font-semibold transition-all duration-400 overflow-hidden"
              >
                <span className="relative z-10 flex cursor-pointer items-center justify-center gap-4">
                  Send Inquiry
                  <span className="inline-block w-6 h-px bg-current group-hover:w-12 transition-all duration-400" />
                  <span>→</span>
                </span>
                <span className="absolute inset-0 bg-[#383636]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
