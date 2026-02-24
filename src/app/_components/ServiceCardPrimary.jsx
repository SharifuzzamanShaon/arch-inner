const ServiceCard = ({ service }) => {
  return (
    /* 1. Outer Wrapper: handles the shadow and full grid width */
    <div className="relative w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <article
        className="relative min-h-[300px] w-full bg-white transition-colors duration-300"
        style={{
          maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' preserveAspectRatio='none'%3E%3Cpath d='M40,0 h320 a40,40 0 0 1 40,40 v250 a40,40 0 0 1 -40,40 h-80 a30,30 0 0 0 -30,30 v10 a30,30 0 0 1 -30,30 h-180 a40,40 0 0 1 -40,-40 v-320 a40,40 0 0 1 40,-40 z' fill='black'/%3E%3C/svg%3E")`,
          maskSize: "100% 100%",
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' preserveAspectRatio='none'%3E%3Cpath d='M40,0 h320 a40,40 0 0 1 40,40 v250 a40,40 0 0 1 -40,40 h-80 a30,30 0 0 0 -30,30 v10 a30,30 0 0 1 -30,30 h-180 a40,40 0 0 1 -40,-40 v-320 a40,40 0 0 1 40,-40 z' fill='black'/%3E%3C/svg%3E")`,
          WebkitMaskSize: "100% 100%",
        }}
      >
        <div className="relative z-10 flex h-full flex-col justify-between px-6 sm:px-8 py-6 sm:py-8 md:py-10">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-start text-gray-800">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6 sm:h-7 sm:w-7"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 leading-tight">
                {service?.title || "Residential Interior Design"}
              </h4>
              <p className="max-w-[90%] sm:max-w-[85%] text-sm sm:text-base font-normal leading-relaxed text-gray-500">
                {service?.description ||
                  "Creating homes that blend comfort with sophistication. Every element is thoughtfully chosen to reflect your lifestyle."}
              </p>
            </div>
          </div>
        </div>
      </article>
      <div className="absolute bottom-[5px] right-[-4px]">
        <button className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#FE5443] py-1.5 sm:py-2 pl-5 sm:pl-7 pr-2.5 sm:pr-3 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_20px_rgba(254,84,67,0.3)] transition-all hover:bg-[#ff6657] hover:shadow-[0_12px_24px_rgba(254,84,67,0.4)] active:scale-95">
          <span>Learn More</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 sm:h-5 sm:w-5"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
