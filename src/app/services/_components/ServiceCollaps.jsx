"use client";
import Image from "next/image";
import { useState } from "react";
import { SERVICES } from "../_data/services";

const ServiceCollaps = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white border-t border-[#383636]/10">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-20">
          <h2
            className="font-normal text-[#383636] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Our Services
          </h2>
          <p className="text-sm text-[#383636]/50 font-normal max-w-xs leading-relaxed">
            Seven stages of design — from brief to handover — across five core
            disciplines.
          </p>
        </div>

        <div className="space-y-0 divide-y divide-[#383636]/8">
          {SERVICES.map((service, serviceIndex) => (
            <div key={service.id}>
              {/* Service header row */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === serviceIndex ? null : serviceIndex)
                }
                className="w-full flex items-start justify-between gap-8 py-8 text-left group"
              >
                <div className="flex items-start gap-6 flex-1 min-w-0">
                  <span className="text-[11px] tracking-[0.2em] text-[#383636]/30 font-normal pt-1 shrink-0 w-6">
                    {String(serviceIndex + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-normal text-[#383636] group-hover:text-[#383636]/70 transition-colors duration-300"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
                  >
                    {service.name}
                  </h3>
                </div>
                <span
                  className={`text-[#383636]/30 text-3xl shrink-0 transition-transform duration-300 leading-none ${openIndex === serviceIndex ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>

              {/* Expanded content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${openIndex === serviceIndex ? "max-h-200 pb-10" : "max-h-0"}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pl-12">
                  {/* Details list */}
                  <div className="space-y-0 divide-y divide-[#383636]/8">
                    {service.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="py-6">
                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#383636]/35 font-medium mb-3">
                          {String(detailIndex + 1).padStart(2, "0")} —{" "}
                          {detail.title}
                        </p>
                        <p className="text-xl text-[#383636]/60 font-normal leading-relaxed">
                          {detail.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Service image / logo */}
                  <div className="flex items-center justify-center lg:justify-end">
                    <div className="w-full max-w-sm aspect-4/3 relative overflow-hidden bg-[#383636]/5">
                      <Image
                        src={service.image}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        alt={service.name}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCollaps;
