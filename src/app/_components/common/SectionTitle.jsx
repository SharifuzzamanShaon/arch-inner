const SectionTitle = ({
  title,
  titleHighlight,
  subtitle,
  subtitleClassName,
}) => {
  return (
    <>
      <h3 className="font-semibold text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-center md:text-left">
        {title}{" "}
        <span className="text-(--color-secondary) text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-center md:text-left">
          {titleHighlight}
        </span>
      </h3>
      <p
        className={`text-xl sm:text-2xl md:text-lg  sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] ${subtitleClassName || "text-white"} text-center md:text-left mt-2 sm:mt-3 md:mt-4`}
      >
        {subtitle}
      </p>
    </>
  );
};

export default SectionTitle;
