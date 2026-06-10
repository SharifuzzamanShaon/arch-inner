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
      </div>

      {/* Content */}
    </section>
  );
};

export default BlogHero;
