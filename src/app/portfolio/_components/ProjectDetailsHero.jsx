import Image from "next/image";
import Link from "next/link";

const ProjectDetailsHero = ({ project }) => {
  const meta = [
    { label: "Type", value: project.type || project.category },
    { label: "Architect", value: project.architect || "Arch Inner" },
    { label: "Client", value: project.client || "—" },
    { label: "Location", value: project.location },
    { label: "Concept", value: project.concept || "Minimal Design" },
    { label: "Year", value: project.year || "2024" },
  ];

  const heroImage =
    project.gallery?.[1] || project.gallery?.[0] || project.thumbnail;

  const titleWords = project.title.split(" ");
  const half = Math.ceil(titleWords.length / 2);
  const titleLine1 = titleWords.slice(0, half).join(" ");
  const titleLine2 = titleWords.slice(half).join(" ");

  return (
    <section className="bg-white pt-24 sm:pt-28 pb-0 border-b border-[#383636]/10">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">
        {/* Breadcrumb */}
        <p className="text-xs tracking-[0.3em] uppercase text-black/50 font-normal mb-6 sm:mb-10 flex items-center gap-2">
          <Link
            href="/portfolio"
            className="hover:text-black transition-colors duration-200"
          >
            Portfolio
          </Link>
          <span className="opacity-50">/</span>
          <span>{project.category}</span>
          <span className="opacity-50">/</span>
          <span className="text-black font-medium truncate max-w-xs">
            {project.title}
          </span>
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end pb-16 sm:pb-24">
          {/* Left — text + meta */}
          <div className="flex flex-col gap-10">
            <div>
              <h1
                className="font-normal text-black leading-[1.08] mb-8"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                {titleLine1}
                <br />
                <span className="text-black">{titleLine2}</span>
              </h1>
              <p className="text-black/70 text-sm sm:text-base lg:text-lg leading-relaxed max-w-sm">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 border-t border-[#383636]/10">
              {meta.map(({ label, value }, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1.5 py-5 pr-4 border-b border-[#383636]/10 border-r border-r-[#383636]/10 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(2n)]:border-r-[#383636]/10 sm:[&:nth-child(3n)]:border-r-0"
                >
                  <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium pl-2">
                    {label}
                  </span>
                  <span className="text-base text-black font-normal tracking-wide leading-snug pl-2">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image */}
          <div className="relative">
            <div className="absolute -top-4 left-0 w-10 h-px bg-[#383636]" />

            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={heroImage}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt={project.title}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1C1917]/30 via-transparent to-transparent pointer-events-none" />

              {/* Category badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="bg-white/10 backdrop-blur-sm text-white text-xs tracking-[0.2em] uppercase px-3 py-1.5 border border-white/15">
                  {project.category}
                </span>
              </div>

              {/* Location bottom */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-normal">
                  {project.location}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-normal">
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-[#383636]/8" />
    </section>
  );
};

export default ProjectDetailsHero;
