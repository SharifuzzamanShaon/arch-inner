"use client";

import { useRef, useState } from "react";
import Footer from "../_components/common/Footer";
import Header from "../_components/common/Header";

const OPENINGS = [
  {
    id: "project-architect",
    title: "Project Architect",
    type: "Full Time",
    location: "Dhaka, Bangladesh",
  },
  {
    id: "senior-architect",
    title: "Senior Architect",
    type: "Full Time",
    location: "Dhaka, Bangladesh",
  },
  {
    id: "interior-designer",
    title: "Interior Designer",
    type: "Full Time",
    location: "Dhaka, Bangladesh",
  },
  {
    id: "site-engineer-intern",
    title: "Site Engineer Intern",
    type: "Internship",
    location: "Dhaka, Bangladesh",
  },
];

const MAX_WORDS = 120;

const countWords = (text) =>
  text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

export default function CareerPage() {
  const [selected, setSelected] = useState(null);
  const [fileName, setFileName] = useState("");
  const [about, setAbout] = useState("");
  const [form, setForm] = useState({ name: "", email: "" });
  const formRef = useRef(null);

  const wordCount = countWords(about);

  const handleAbout = (e) => {
    const val = e.target.value;
    const words = val.trim() === "" ? [] : val.trim().split(/\s+/);
    if (words.length <= MAX_WORDS) {
      setAbout(val);
    } else {
      setAbout(words.slice(0, MAX_WORDS).join(" "));
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  const handleApply = (opening) => {
    setSelected(opening.id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputClass =
    "w-full bg-transparent border-b border-[#383636]/15 py-4 text-base text-[#383636]/80 placeholder-[#383636]/30 font-normal tracking-wide outline-none focus:border-[#383636] transition-colors duration-300";
  const labelClass =
    "block text-[11px] tracking-[0.28em] uppercase text-[#383636]/40 font-normal mb-2";

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-white pt-28 sm:pt-36 pb-16 sm:pb-20 border-b border-[#383636]/10">
        <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#383636]/40 font-normal mb-8">
            / Careers
          </p>
          <h1
            className="font-normal text-[#383636] leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Join Our <span className="text-[#383636]/30">Studio</span>
          </h1>
          <p className="mt-6 text-sm text-[#383636]/45 font-normal leading-relaxed max-w-md">
            We are always looking for thoughtful designers and architects who
            care deeply about space, craft, and people.
          </p>
        </div>
      </section>

      {/* Current Job Openings */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#383636]/40 font-normal mb-10">
            / Current Job Openings
          </p>

          <div className="divide-y divide-[#383636]/10 border-t border-[#383636]/10">
            {OPENINGS.map((opening, i) => (
              <div
                key={opening.id}
                className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-7 sm:py-8"
              >
                <div className="flex items-start sm:items-center gap-5 sm:gap-8">
                  <span className="text-[10px] text-[#383636]/20 font-normal tracking-widest pt-1 sm:pt-0 w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="font-normal text-[#383636] leading-tight group-hover:text-[#383636]/60 transition-colors duration-300"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
                    >
                      {opening.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#383636]/35 font-normal">
                        {opening.type}
                      </span>
                      <span className="w-3 h-px bg-[#383636]/20" />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#383636]/35 font-normal">
                        {opening.location}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(opening)}
                  className="self-start sm:self-auto cursor-pointer shrink-0 inline-flex items-center gap-2.5 text-[10px] tracking-[0.2em] uppercase font-normal text-[#383636]/40 hover:text-[#383636] transition-colors duration-300 group/btn"
                >
                  <span>Apply Now</span>
                  <span className="inline-block w-4 h-px bg-current group-hover/btn:w-7 transition-all duration-300" />
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        ref={formRef}
        className="bg-[#F7F4F0] border-t border-[#383636]/8 py-16 sm:py-24"
      >
        <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#383636]/40 font-normal mb-5">
              / Apply
            </p>
            <h2
              className="font-normal text-[#383636] leading-tight mb-10 sm:mb-14"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Send Your <span className="text-[#383636]/35">Application</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Position */}
              <div>
                <label className={labelClass}>Position *</label>
                <div className="relative">
                  <select
                    required
                    value={selected ?? ""}
                    onChange={(e) => setSelected(e.target.value || null)}
                    className={`${inputClass} appearance-none cursor-pointer pr-8`}
                  >
                    <option value="">Select a position</option>
                    {OPENINGS.map((o) => (
                      <option key={o.id} value={o.id} className="bg-white">
                        {o.title}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#383636]/25 pointer-events-none text-xs">
                    ↓
                  </span>
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Resume upload */}
              <div>
                <label className={labelClass}>Resume / CV *</label>
                <label className="group flex items-center gap-4 border-b border-[#383636]/15 py-4 cursor-pointer hover:border-[#383636] transition-colors duration-300">
                  <input
                    required
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    className="sr-only"
                  />
                  <span className="shrink-0 text-[10px] tracking-[0.2em] uppercase text-[#383636]/35 group-hover:text-[#383636]/60 transition-colors duration-300 border border-[#383636]/20 px-3 py-1.5">
                    Choose File
                  </span>
                  <span className="text-sm text-[#383636]/40 font-normal truncate">
                    {fileName || "PDF, DOC or DOCX — max 5 MB"}
                  </span>
                </label>
              </div>

              {/* About */}
              <div>
                <div className="flex items-end justify-between mb-2">
                  <label className={labelClass}>Tell Us About Yourself *</label>
                  <span
                    className={`text-[10px] font-normal tabular-nums ${
                      wordCount >= MAX_WORDS
                        ? "text-[#FE5443]"
                        : "text-[#383636]/25"
                    }`}
                  >
                    {wordCount} / {MAX_WORDS}
                  </span>
                </div>
                <textarea
                  required
                  rows={6}
                  placeholder="Share your background, passion for design, and what draws you to arch INNER…"
                  value={about}
                  onChange={handleAbout}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="group relative w-full py-5 bg-transparent border border-[#383636]/20 text-[#383636]/60 hover:border-[#383636] hover:text-[#383636] text-sm tracking-[0.2em] uppercase font-normal transition-all duration-400 overflow-hidden"
              >
                <span className="relative z-10 flex cursor-pointer items-center justify-center gap-4">
                  Submit Application
                  <span className="inline-block w-6 h-px bg-current group-hover:w-12 transition-all duration-400" />
                  <span>→</span>
                </span>
                <span className="absolute inset-0 bg-[#383636]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
