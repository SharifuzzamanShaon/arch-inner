const SectionTitle = ({ title, titleHighlight, subtitle }) => {
  return (
    <>
      <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center md:text-left">
        {title}{" "}
        <span className="text-(--color-secondary) text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center md:text-left">
          {titleHighlight}
        </span>
      </h3>
      <p className="text-xs sm:text-sm md:text-base max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] text-zinc-600 text-center md:text-left dark:text-zinc-400 mt-2 sm:mt-3 md:mt-4">
        {subtitle}
      </p>
    </>
  );
};

export default SectionTitle;
