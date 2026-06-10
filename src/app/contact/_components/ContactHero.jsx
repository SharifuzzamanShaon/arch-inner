import Image from "next/image";

const ContactHero = () => {
  return (
    <section className="relative h-70 sm:h-85 md:h-100 lg:h-120 w-full overflow-hidden flex items-center justify-center mt-16 md:mt-0">
      <div className="absolute inset-0 bg-black/40"></div>

      <h3 className="relative z-10 text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-center px-4">
        Contact Us
      </h3>
    </section>
  );
};

export default ContactHero;
