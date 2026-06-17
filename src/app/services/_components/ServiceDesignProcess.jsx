import Image from "next/image";
import { DESIGN_PROCESS } from "../_data/services";

const ServiceDesignProcess = () => {
  return (
    <section className="bg-[#383636]/3 border-t border-[#383636]/10">
      <div className="max-w-360 mx-auto px-6 sm:px-14 lg:px-16 py-20 sm:py-28">
        <p className="text-xs tracking-[0.3em] uppercase text-[#383636] mb-5 font-normal">
          / How We Work
        </p>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 sm:mb-20">
          <h2
            className="font-normal text-[#383636] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Design Process
          </h2>
          <p className="text-sm text-[#383636]/50 font-normal max-w-xs leading-relaxed">
            A structured seven-stage framework that ensures every project is
            delivered with precision and clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 divide-[#383636]/8">
          {DESIGN_PROCESS.map((process, i) => (
            <div
              key={i}
              className="py-8 pr-0 sm:pr-8 lg:pr-12 border-r-0 sm:border-r border-[#383636]/8 last:border-r-0 nth-[2n]:border-r-0 sm:nth-[2n]:border-r lg:nth-[2n]:border-r lg:nth-[4n]:border-r-0"
            >
              {/* B&W image */}
              <div className="w-full aspect-video overflow-hidden mb-6 bg-[#383636]/5">
                <Image
                  src={process.image}
                  width={400}
                  height={225}
                  alt={process.title}
                  className="w-full h-full pl-2 object-cover grayscale"
                />
              </div>

              <span className="text-[10px] tracking-[0.3em] pl-2 uppercase text-[#383636]/25 font-normal block mb-4">
                {process.step}
              </span>
              <h3 className="text-base font-medium text-[#383636] pl-2 mb-3 leading-snug">
                {process.title}
              </h3>
              <p className="text-sm text-[#383636]/50 pl-2 font-normal leading-relaxed">
                {process.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-[#383636]/10">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#383636]/30 font-normal">
            We follow local good practice standards across all stages of
            delivery.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceDesignProcess;
