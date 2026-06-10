import Link from "next/link";

const ServicesHero = () => {
  return (
    <section
      className="relative w-full overflow-hidden flex items-end bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/service-hero.png')",
        height: "clamp(420px, 70vh, 720px)",
      }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-[#383636]/45" />
      <div className="absolute inset-0 bg-linear-to-t from-[#383636]/75 via-transparent to-transparent" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/50 z-20" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-360 mx-auto px-6 sm:px-10 lg:px-16 pb-14 sm:pb-20">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-light mb-5">
          / Services
        </p>
        <h1
          className="font-thin text-white leading-tight mb-8"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
        >
          Spaces Designed
          <br />
          <span className="text-white/50">With Purpose</span>
        </h1>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-4 text-sm tracking-[0.15em] uppercase text-white/70 hover:text-white font-light transition-colors duration-300"
        >
          <span>Book Consultation</span>
          <span className="inline-block w-8 h-px bg-white/50 group-hover:w-14 transition-all duration-400" />
          <span className="text-white/70">→</span>
        </Link>
      </div>
    </section>
  );
};

export default ServicesHero;
