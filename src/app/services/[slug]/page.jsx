import Footer from "@/app/_components/common/Footer";
import Header from "@/app/_components/common/Header";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "../_data/services";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

const ServiceDetailPage = async ({ params }) => {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return notFound();

  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />

      {/* Hero */}
      <section
        className="relative w-full overflow-hidden mt-16 sm:mt-18 lg:mt-20 bg-[#1C1917]"
        style={{ height: "clamp(440px, 80vh, 960px)" }}
      >
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 pb-14 w-full">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-normal mb-4 flex items-center gap-2">
              <Link
                href="/services"
                className="hover:text-white/70 transition-colors duration-200"
              >
                Services
              </Link>
              <span className="opacity-50">/</span>
              <span>{service.name}</span>
            </p>
            <h1
              className="font-normal text-white leading-tight max-w-2xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
              {service.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-white border-t border-[#383636]/10">
        <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left — short description */}
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#383636]/40 font-normal mb-6">
                / Overview
              </p>
              <p
                className="font-normal text-[#383636] leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
              >
                {service.shortDescription}
              </p>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#383636] border border-[#383636] px-7 py-3.5 hover:bg-[#383636] hover:text-white transition-all duration-300 font-normal"
                >
                  Start a Project
                </Link>
              </div>
            </div>

            {/* Right — detail items */}
            <div className="lg:col-span-8 space-y-0 divide-y divide-[#383636]/8">
              {service.details.map((detail, i) => (
                <div key={i} className="py-8">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-[#383636]/35 font-normal mb-3">
                    {String(i + 1).padStart(2, "0")} — {detail.title}
                  </p>
                  <p className="text-sm text-[#383636]/60 font-normal leading-relaxed max-w-xl">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-[#F7F4F0] border-t border-[#383636]/8">
        <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#383636]/40 font-normal mb-4">
                / More Services
              </p>
              <h2
                className="font-normal text-[#383636] leading-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 3rem)" }}
              >
                Other <span className="text-[#383636]/40">Disciplines</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-[#383636]/50 hover:text-[#383636] transition-colors duration-300 font-normal pb-1"
            >
              <span>All Services</span>
              <span className="inline-block w-6 h-px bg-current" />
              <span>→</span>
            </Link>
          </div>

          {/* Mobile: native snap-scroll */}
          <div className="flex sm:hidden gap-3 -mx-6 px-6 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none">
            {others.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="group relative overflow-hidden bg-[#1C1917] shrink-0 w-[78vw] snap-start block"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={s.image}
                  fill
                  sizes="80vw"
                  alt={s.name}
                  className="object-cover pl-2 opacity-70 group-hover:opacity-85 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-sm font-normal text-white leading-snug">
                    {s.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-4 sm:gap-5">
            {others.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="group relative overflow-hidden bg-[#1C1917] block"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={s.image}
                  fill
                  sizes="33vw"
                  alt={s.name}
                  className="object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-normal block mb-1.5">
                    0{s.id}
                  </span>
                  <h3 className="text-sm font-normal text-white leading-snug">
                    {s.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ServiceDetailPage;
