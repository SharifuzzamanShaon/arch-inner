import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

const ServicesHero = () => {
  return (
    <section className="relative w-full mt-20 md:mt-0 h-[600px] overflow-hidden min-h-[420px] md:min-h-[520px]">
      <Image
        src="/images/service-hero.png"
        alt="Interior Design Services"
        fill
        className="absolute inset-0 object-cover"
        priority
      />
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

        <button className="group flex items-center gap-2 bg-[#FE5443] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-[#FE5443]/20">
          Explore Our Services
          <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default ServicesHero;
