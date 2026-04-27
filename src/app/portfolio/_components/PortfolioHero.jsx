import Link from "next/link";

const PortfolioHero = () => {
  return (
    <section className="relative h-80 sm:h-100 md:h-120 lg:h-130 w-full overflow-hidden flex items-center justify-center mt-16 md:mt-0">
      {/* 1. Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src="/images/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* 3. Content */}
      <div className="relative z-20 text-center px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8">
          If You can imagine it, we can <br className="hidden sm:block" />
          help bring it to you
        </h1>
        <Link href="/contact">
          <button className="bg-[#FE5443] cursor-pointer hover:bg-[#ff6657] text-white px-6 py-2.5 sm:px-8 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
            Book Consultation
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PortfolioHero;
