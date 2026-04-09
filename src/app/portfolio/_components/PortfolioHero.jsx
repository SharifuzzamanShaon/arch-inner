const PortfolioHero = () => {
  return (
    <section className="relative h-[520px] w-full overflow-hidden flex items-center justify-center">
      {/* 1. Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 min-w-full min-h-full object-cover"
      >
        <source src="/images/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. Dark Overlay to match image_b1057d.png */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* 3. Content */}
      <div className="relative z-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
          If You can imagine it, we can <br className="hidden md:block" />
          help bring it to you
        </h1>

        <button className="bg-[#FE5443] cursor-pointer hover:bg-[#ff6657] text-white px-8 py-2 md:py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
          Book Consultation
        </button>
      </div>
    </section>
  );
};

export default PortfolioHero;
