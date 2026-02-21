const SectionTitle = ({ title, titleHighlight, subtitle }) => {
  return (
    <>
      <h3 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center md:text-left">
        {title}{" "}
        <span className="text-(--color-secondary) text-2xl text-center md:text-left sm:text-3xl md:text-4xl">
          {titleHighlight}
        </span>
      </h3>
      <p className="text-xs sm:text-sm text-zinc-600 text-center md:text-left dark:text-zinc-400 mt-1 sm:mt-2">
        {subtitle}
      </p>
    </>
  );
};

export default SectionTitle;
