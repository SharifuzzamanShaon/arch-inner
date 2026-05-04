import { FaArrowRight } from "react-icons/fa6";

const ServicesHero = () => {
  return (
    <section
      className="relative w-full mt-20 md:mt-0 overflow-hidden min-h-[420px] md:min-h-[520px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/service-hero.png')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center py-16 md:py-0 min-h-[420px] md:min-h-[520px]">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2">
          Interior Design
        </h1>
        <h2 className="text-[#FE5443] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8">
          Services
        </h2>

        <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mb-8 sm:mb-10 leading-relaxed">
          Creating exceptional spaces that blend aesthetics, functionality, and
          your unique vision. From residential sanctuaries to inspiring
          commercial environments.
        </p>

        <button className="group cursor-pointer flex items-center gap-2 bg-[#FE5443] hover:bg-[#ff6657] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
          Explore Our Services
          <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default ServicesHero;
