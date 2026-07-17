import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project }) => {
  const Inner = (
    <div
      className="group relative w-full overflow-hidden bg-[#1C1917] transition-transform duration-300 hover:-translate-y-1"
      style={{ minHeight: "clamp(380px, 48vh, 500px)" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {project?.thumbnail && (
          <Image
            src={project.thumbnail}
            alt={project.title || "Project"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-8 py-7 sm:py-8 min-h-75">
        {project?.category && (
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">
            {project.category}
          </p>
        )}
        <h4
          className="font-normal text-white leading-tight mb-3"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
        >
          {project?.title || "Modern Living"}
        </h4>
        <div className="inline-flex items-center gap-2 text-white/40 group-hover:text-white/65 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 opacity-100 sm:opacity-0 group-hover:opacity-100">
          <span>View Project</span>
          <span className="w-4 h-px bg-current group-hover:w-7 transition-all duration-300" />
        </div>
      </div>
    </div>
  );

  return <Link href={`/portfolio/${project?.slug}`}>{Inner}</Link>;
};

export default ProjectCard;
