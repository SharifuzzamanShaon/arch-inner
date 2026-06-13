import Image from "next/image";

const TestimonialCard = ({ service, dark }) => {
  return (
    <article
      className={`group relative flex flex-col h-full border transition-all duration-400 ${
        dark
          ? "bg-white/4 border-white/8 hover:bg-white/6 hover:border-white/15"
          : "bg-[#383636]/4 border-[#383636]/10 hover:border-[#383636]/20 hover:bg-[#383636]/6"
      }`}
    >
      {/* Project image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={service?.image || "/images/avater.png"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          alt={service?.name || "Client"}
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.04]"
        />
        <div className={`absolute inset-0 ${dark ? "bg-[#0F0E0D]/40" : "bg-[#383636]/20"} group-hover:opacity-0 transition-opacity duration-500`} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-7 sm:p-8">
        {/* Stars */}
        <div className={`flex gap-0.5 mb-5 ${dark ? "text-white/40" : "text-[#383636]"}`}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-xs">★</span>
          ))}
        </div>

        {/* Quote */}
        <div className="relative flex-1 mb-7">
          <span
            className={`absolute -top-2 -left-1 text-4xl font-serif leading-none select-none ${
              dark ? "text-white/8" : "text-[#383636]/10"
            }`}
          >
            &ldquo;
          </span>
          <p
            className={`text-base font-normal leading-relaxed italic pl-4 ${
              dark ? "text-white/50" : "text-[#383636]/60"
            }`}
          >
            {service?.testimonial}
          </p>
        </div>

        {/* Author */}
        <div
          className={`pt-5 border-t ${dark ? "border-white/10" : "border-[#383636]/10"}`}
        >
          <p
            className={`text-sm font-normal tracking-wide ${
              dark ? "text-white/80" : "text-[#383636]"
            }`}
          >
            {service?.name}
          </p>
          <p
            className={`text-[10px] tracking-[0.12em] mt-1 leading-snug ${
              dark ? "text-white/35" : "text-[#383636]/50"
            }`}
          >
            {service?.role || "Verified Client"}
          </p>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;
