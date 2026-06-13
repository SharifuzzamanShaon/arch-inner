import Image from "next/image";

const ServiceCard = ({ service }) => {
  return (
    <div
      className="group relative w-full overflow-hidden bg-[#1C1917] transition-transform duration-300 hover:-translate-y-1"
      style={{ minHeight: "300px" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {service?.thumbnail && (
          <Image
            src={service.thumbnail}
            alt={service.title || "Service"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-8 py-7 sm:py-8 min-h-75">
        <h4
          className="font-normal text-white leading-tight mb-3"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
        >
          {service?.title || "Residential Interior Design"}
        </h4>
        <p className="text-sm text-white/50 font-normal leading-relaxed mb-5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {service?.description ||
            "Creating homes that blend comfort with sophistication."}
        </p>
        <div className="inline-flex items-center gap-2 text-white/40 group-hover:text-white/65 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 opacity-100 sm:opacity-0 group-hover:opacity-100">
          <span>Explore</span>
          <span className="w-4 h-px bg-current group-hover:w-7 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
