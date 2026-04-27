const SectionTitle = ({
  title,
  titleHighlight,
  subtitle,
  subtitleClassName,
}) => {
  return (
    <>
      <h3 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center md:text-left leading-tight">
        {title}{" "}
        <span className="text-(--color-secondary) text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center md:text-left">
          {titleHighlight}
        </span>
      </h3>
      <p
        className={`text-sm sm:text-base md:text-base lg:text-lg max-w-full sm:max-w-[85%] md:max-w-[75%] ${subtitleClassName || "text-white"} text-center md:text-left mt-2 sm:mt-3 md:mt-4 leading-relaxed`}
      >
        {subtitle}
      </p>
    </>
  );
};

export default SectionTitle;
