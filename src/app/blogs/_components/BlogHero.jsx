const BlogHero = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/your-bedroom-image.jpg")', // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
          Let’s Design Something{" "}
          <span className="text-[#FF6B50]">Meaningful.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 font-light tracking-wide">
          Tell us about your space. We’ll take care of the rest.
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
