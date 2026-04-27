import React from 'react';
import Image from 'next/image';

const AboutHero = () => {
  return (
    <section className="relative h-70 sm:h-85 md:h-100 lg:h-120 w-full overflow-hidden flex items-center justify-center mt-16 md:mt-0">
      <Image
        src="/images/Aboutus-hero.png"
        alt="Interior Design Services"
        fill
        className="absolute inset-0 object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40"></div>

      <h1 className="relative z-10 text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center px-4">
        About Us
      </h1>
    </section>
  );
};

export default AboutHero;