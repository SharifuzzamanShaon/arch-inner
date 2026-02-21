import Image from "next/image";

const TestimonialCard = ({ service }) => {
  // This SVG mask creates a unique notched corner at the bottom right
  const customMask = `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M400 320C400 333.255 390.255 344 377 344H286C266.118 344 250 360.118 250 380C250 392.15 240.15 400 228 400H24C10.7452 400 0 389.255 0 376V24C0 10.7452 10.7452 0 24 0H377C390.255 0 400 10.7452 400 24V320Z' fill='black'/%3E%3C/svg%3E")`;

  return (
    <div className="relative w-full max-w-[350px] sm:max-w-[400px] mt-12 mx-auto group">
      {/* Profile Image - Elevated higher and given a thicker border */}
      <div className="absolute -top-12 left-1/2 z-30 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl transition-transform duration-300 group-hover:scale-105">
        <Image
          src={service?.image || "/api/placeholder/100/100"}
          width={96}
          height={96}
          alt={service?.name || "Profile"}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Main Card Body */}
      <article
        className="relative bg-white pt-25 pb-14 px-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)]"
        style={{
          maskImage: customMask,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskImage: customMask,
          WebkitMaskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Rating Stars */}
          <div className="flex gap-1 text-[#FE5443] mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-sm">
                ★
              </span>
            ))}
          </div>

          {/* Name & Title */}
          <div className="mb-4">
            <h4 className="text-xl font-bold text-gray-900 tracking-tight">
              {service?.name || "Md Rafi Islam"}
            </h4>
            <p className="text-[#FE5443] text-xs font-semibold uppercase tracking-widest">
              Verified Client
            </p>
          </div>

          {/* Testimonial Quote */}
          <div className="relative">
            <span className="absolute -top-2 -left-4 text-4xl text-gray-100 font-serif leading-none">
              “
            </span>
            <p className="text-gray-600 leading-relaxed text-sm italic relative z-10">
              {service?.testimonial ||
                "Being a part of Arc Inner is my greatest pleasure as I have been working with really wonderful projects last 2 Years. We didn't compromise with quality and commitment."}
            </p>
          </div>
        </div>
      </article>
      {/* Read More Button - Positioned specifically for the SVG notch */}
      {/* <div className="absolute bottom-1 right-2 z-40">
        <button className="flex items-center gap-2 rounded-full bg-[#FE5443] py-2.5 px-5 text-xs font-bold text-white transition-all hover:bg-[#e04839] hover:shadow-lg active:scale-95">
          <span>READ MORE</span>
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default TestimonialCard;
