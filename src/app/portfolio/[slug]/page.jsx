import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProjectDetailsHero from "../_components/ProjectDetailsHero";
import ProjectGallery from "../_components/ProjectGallery";
import { PROJECTS } from "../_data/projects";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

const MoreProjects = ({ currentSlug }) => {
  const others = PROJECTS.filter((p) => p.slug !== currentSlug).slice(0, 3);
  return (
    <section className="bg-white border-t border-[#383636]/10">
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-[#383636] font-normal mb-4">
              / More Work
            </p>
            <h2
              className="font-normal text-[#383636] leading-tight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              Related <span className="text-[#383636]/35">Projects</span>
            </h2>
          </div>
          <Link
            href="/project"
            className="hidden sm:inline-flex items-center gap-3 text-base tracking-[0.15em] uppercase text-[#383636]/50 hover:text-[#383636] transition-colors duration-300 font-normal pb-1"
          >
            <span>All Projects</span>
            <span className="inline-block w-6 h-px bg-current" />
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map((p) => (
            <Link
              key={p.id}
              href={`/project/${p.slug}`}
              className="group relative overflow-hidden bg-[#1C1917] block"
              style={{ aspectRatio: "4/3" }}
            >
              {p.thumbnail && (
                <Image
                  src={p.thumbnail}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  alt={p.title}
                  className="object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                <span className="text-xs tracking-[0.2em] uppercase text-white/45 font-normal block mb-1.5">
                  {p.category}
                </span>
                <h3 className="text-base font-normal text-white leading-snug">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConsultationCTA = () => (
  <section className="bg-[#0F0E0D]">
    <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-32 flex flex-col items-center text-center">
      <p className="text-xs tracking-[0.35em] uppercase text-white/30 font-normal mb-6">
        / Start Your Project
      </p>
      <h2
        className="font-normal text-white leading-tight max-w-2xl mb-4"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
      >
        Ready to design your{" "}
        <span className="text-white/35">next space?</span>
      </h2>
      <p className="text-base text-white/35 font-normal leading-relaxed max-w-md mb-10">
        Let&apos;s talk about your vision. Book a free consultation and we&apos;ll
        walk you through how we can bring it to life.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-4 px-8 py-4 bg-white text-[#0F0E0D] text-sm tracking-[0.18em] uppercase font-normal hover:bg-white/85 transition-colors duration-300"
      >
        <span>Book a Consultation</span>
        <span className="text-base leading-none">→</span>
      </Link>
    </div>
  </section>
);

const ProjectDetailPage = async ({ params }) => {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <>
      <ProjectDetailsHero project={project} />
      <ProjectGallery project={project} />
      <MoreProjects currentSlug={project.slug} />
      <ConsultationCTA />
    </>
  );
};

export default ProjectDetailPage;
