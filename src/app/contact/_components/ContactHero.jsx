import Image from "next/image";

const ContactHero = () => {
  return (
    <section className="relative h-105 w-full overflow-hidden flex items-center justify-center">
      <Image
        src="/images/Aboutus-hero.png"
        alt="Interior Design Services"
        fill
        className="absolute inset-0 object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40"></div>

      <h1 className="relative z-10 text-white text-5xl md:text-7xl font-bold text-center">
        Contact Us
      </h1>
    </section>
  );
};

export default ContactHero;
