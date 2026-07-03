import Footer from "../../_components/common/Footer";
import Header from "../../_components/common/Header";
import { posts } from "../../blogs/_data/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — arch Inner`, description: post.excerpt };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);
  const fallback = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const relatedPosts = related.length ? related : fallback;

  return (
    <>
      <Header />

      {/* Hero image */}
      <div className="relative w-full h-[55vw] max-h-150 min-h-70 mt-16 sm:mt-18 lg:mt-20">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0F0E0D]/50" />
      </div>

      {/* Article */}
      <article className="bg-white">
        <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 pt-10 pb-8 border-b border-[#383636]/8">
            <Link
              href="/"
              className="text-[10px] tracking-[0.2em] uppercase text-[#383636]/35 hover:text-[#383636] transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-[#383636]/20 text-xs">/</span>
            <Link
              href="/blogs"
              className="text-[10px] tracking-[0.2em] uppercase text-[#383636]/35 hover:text-[#383636] transition-colors duration-200"
            >
              News
            </Link>
            <span className="text-[#383636]/20 text-xs">/</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#383636]/60 line-clamp-1">
              {post.title}
            </span>
          </div>

          {/* Header */}
          <header className="py-12 sm:py-16 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#FE5443] font-normal">
                {post.category}
              </span>
              <span className="w-4 h-px bg-[#383636]/20" />
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#383636]/35 font-normal">
                {post.date}
              </span>
              <span className="w-4 h-px bg-[#383636]/20" />
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#383636]/35 font-normal">
                {post.author}
              </span>
            </div>

            <h1
              className="font-semibold text-[#383636] leading-tight mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
            >
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[#383636]/55 font-normal leading-relaxed border-l-2 border-[#FE5443] pl-5">
              {post.excerpt}
            </p>
          </header>

          {/* Body */}
          <div className="max-w-3xl pb-16 sm:pb-24 space-y-7 border-t border-[#383636]/8 pt-12">
            {post.content.map((para, i) => (
              <p
                key={i}
                className="text-[#383636]/70 text-base leading-[1.85] font-normal"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#F7F4F0] border-t border-[#383636]/8 py-16 sm:py-20">
          <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#383636]/40 mb-10 font-normal">
              / Related News
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/news/${p.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <Image
                      src={p.image}
                      fill
                      alt={p.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#383636] font-normal">
                      {p.category}
                    </span>
                    <span className="w-3 h-px bg-[#383636]/20" />
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#383636]/35 font-normal">
                      {p.date}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#383636] leading-snug group-hover:text-[#383636]/60 transition-colors duration-300">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
