import React from "react";

const SectionTopTitle = ({
  label = "Portfolio",
  title = "A Curated Selection of Our Interior",
  highlight = "Project",
}) => {
  return (
    <div className="text-center mb-6 sm:mb-8 md:mb-10">
      <p className="text-[10px] sm:text-xs font-semibold max-w-2xl mx-auto tracking-[0.15em] sm:tracking-[0.2em] text-[#FE5443] uppercase px-4">
        {label}
      </p>
      <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-md mx-auto font-semibold text-gray-900 leading-snug px-4">
        {title}{" "}
        <span className="text-[#FE5443]">  
          {highlight}
        </span>
      </h2>
    </div>
  );
};

export default SectionTopTitle;