import Image from "next/image";

const TestimonialCard = ({ service }) => {
  return (
    <div className="relative w-full max-w-[350px] sm:max-w-[400px] mt-16 mx-auto group pb-4">
      <div className="absolute -top-12 left-1/2 z-30 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-4 bg-white shadow-xl transition-transform duration-300 group-hover:scale-105">
        <Image
          src={service?.image || "/api/placeholder/100/100"}
          width={96}
          height={96}
          alt={service?.name || "Profile"}
          className="h-full w-full object-cover"
        />
      </div>
      <article className="relative bg-white pt-16 pb-8 px-6 sm:px-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)] rounded-lg transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        <div className="flex flex-col items-center text-center h-full">
          {/* Rating Stars */}
          <div className="flex gap-0.5 text-[#FE5443] mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-base sm:text-lg">
                ★
              </span>
            ))}
          </div>

          {/* Name & Title */}
          <div className="mb-6">
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-1">
              {service?.name || "Md Rafi Islam"}
            </h4>
            <p className="text-[#FE5443] text-xs font-semibold uppercase tracking-widest">
              Verified Client
            </p>
          </div>

          {/* Testimonial Quote */}
          <div className="relative mb-6">
            <span className="absolute -top-3 -left-2 text-5xl text-gray-200 font-serif leading-none">
              &ldquo;
            </span>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base italic relative z-10 px-4">
              {service?.testimonial ||
                "Being a part of Arc Inner is my greatest pleasure as I have been working with really wonderful projects last 2 Years. We didn't compromise with quality and commitment."}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TestimonialCard;
