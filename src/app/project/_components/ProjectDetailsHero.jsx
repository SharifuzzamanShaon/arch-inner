import Image from "next/image";

const ProjectDetailsHero = ({ project }) => {
  const meta = [
    { label: "Type", value: project.type || project.category },
    { label: "Architect", value: project.architect || "arch Inner" },
    { label: "Client", value: project.client || "—" },
    { label: "Location", value: project.location },
    { label: "Concept", value: project.concept || "Minimal Design" },
    { label: "Year", value: project.year || "2024" },
  ];

  const heroImage =
    project.gallery?.[1] || project.gallery?.[0] || project.thumbnail;

  return (
    <section className="bg-white border-b border-[#383636]/10 pt-20 sm:pt-24">
      {/* Full-width banner image */}
      <div className="relative w-full bg-white h-[56vh] min-h-85 sm:h-[80vh] sm:min-h-110 sm:max-h-240">
        {heroImage && (
          <Image
            src={heroImage}
            fill
            sizes="100vw"
            alt={project.title}
            className="object-contain"
            priority
          />
        )}
        {/* Bottom row — category badge + location/year */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 pb-8 sm:pb-10 flex items-end justify-between">
            <span className="bg-[#383636]/8 text-[#383636] text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 border border-[#383636]/15 font-normal">
              {project.category}
            </span>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-[#383636]/55 font-normal">
              <span>{project.location}</span>
              <span className="w-3 h-px bg-[#383636]/30" />
              <span>{project.year || "2024"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Title + description + meta below banner */}
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div>
            <h1
              className="font-normal text-[#383636] leading-[1.08]"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              {project.title}
            </h1>
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-[#383636]/60 text-sm sm:text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>
        </div>

        {/* Meta grid */}
        <div className="mt-12 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 gap-0 border-t border-[#383636]/10">
          {meta.map(({ label, value }, i) => (
            <div
              key={i}
              className="flex flex-col gap-1.5 py-5 pr-4 border-b border-[#383636]/10 border-r border-r-[#383636]/10 nth-[2n]:border-r-0 sm:nth-[2n]:border-r sm:nth-[2n]:border-r-[#383636]/10 sm:nth-[3n]:border-r-0"
            >
              <span className="text-[10px] pl-2 tracking-[0.3em] uppercase text-[#383636]/35 font-normal">
                {label}
              </span>
              <span className="text-sm pl-2 text-[#383636] font-normal tracking-wide leading-snug">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsHero;
