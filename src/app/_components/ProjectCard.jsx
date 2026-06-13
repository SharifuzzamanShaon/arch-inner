import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative w-full overflow-hidden bg-[#1C1917]" style={{ minHeight: "420px" }}>
      {/* Background image */}
      {project?.thumbnail && (
        <Image
          src={project.thumbnail}
          alt={project.title || "Project"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-90"
          priority
        />
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />

      {/* Top row — category + location */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-20">
        <span className="bg-white/10 backdrop-blur-sm text-white text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border border-white/15">
          {project?.category || "Interior"}
        </span>
        <span className="text-white/45 text-[10px] tracking-[0.12em] uppercase">
          {project?.location || "Dhaka"}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8">
        <h3
          className="font-normal text-white leading-tight mb-2"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
        >
          {project?.title || "Modern Living"}
        </h3>
        <p className="text-sm text-white/45 font-normal leading-relaxed mb-6 max-w-xs">
          {project?.description ||
            "A beautiful blend of modern aesthetics and functional design."}
        </p>
        <Link
          href={`/portfolio/${project?.id}`}
          className="group/btn inline-flex items-center gap-3 text-white/50 hover:text-white text-xs tracking-[0.18em] uppercase transition-colors duration-300"
        >
          <span>View Project</span>
          <span className="inline-block w-5 h-px bg-current group-hover/btn:w-9 transition-all duration-300" />
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
