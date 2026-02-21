"use client";

import Container from "@/app/_components/common/Container";
import Image from "next/image";
import { useState } from "react";

// Country Data List
const countries = [
  { code: "BD", flag: "🇧🇩", dialCode: "+880", name: "Bangladesh" },
  { code: "US", flag: "🇺🇸", dialCode: "+1", name: "United States" },
  { code: "GB", flag: "🇬🇧", dialCode: "+44", name: "United Kingdom" },
  { code: "IN", flag: "🇮🇳", dialCode: "+91", name: "India" },
  { code: "CA", flag: "🇨🇦", dialCode: "+1", name: "Canada" },
];

const InquiryForm = () => {
  // State Management
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectType: "",
    phone: "",
    projectBrief: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <div className="max-w-6xl mx-auto p-4 md:p-8rounded-3xl  flex flex-col md:flex-row gap-8 lg:gap-16 items-start my-16">
        <div className="w-full md:w-1/2 top-8">
          <div className="relative group">
            <Image
              src="/images/contact-img.png"
              width={800}
              height={600}
              alt="Interior Design Background"
              className="w-full rounded-3xl"
            />
            <div className="absolute bottom-6 left-5 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-sm font-bold text-slate-800">
                Available Lot #402
              </p>
              <p className="text-xs text-slate-500">Premium Residential Zone</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6 py-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name*
              </label>
              <input
                required
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address*
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="Enter your email address"
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Type*
              </label>
              <div className="relative">
                <select
                  required
                  name="projectType"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none appearance-none cursor-pointer text-slate-600"
                >
                  <option value="">Choose your preferred type</option>
                  <option value="residential">Residential Villa</option>
                  <option value="commercial">Commercial Complex</option>
                  <option value="industrial">Industrial Plot</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="flex gap-3 relative">
                {/* Flag Dropdown Trigger */}
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  <span
                    className={`text-[10px] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-16 left-0 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl z-50 py-2 animate-in fade-in zoom-in duration-200">
                    {countries.map((c) => (
                      <div
                        key={c.code}
                        onClick={() => {
                          setSelectedCountry(c);
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors"
                      >
                        <span className="text-2xl">{c.flag}</span>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">
                            {c.name}
                          </span>
                          <span className="text-xs text-slate-400">
                            {c.dialCode}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  name="phone"
                  type="tel"
                  placeholder={`e.g. ${selectedCountry.dialCode} 000-000`}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Brief
              </label>
              <textarea
                name="projectBrief"
                rows={4}
                placeholder="Write your project brief..."
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <p className="text-xs text-slate-400 font-medium italic">
              * We usually respond within 24-48 hours.
            </p>

            <button
              type="submit"
              className="w-full py-4 bg-[#f06a4f] hover:bg-[#d95a42] text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-200 active:scale-[0.98]"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default InquiryForm;
