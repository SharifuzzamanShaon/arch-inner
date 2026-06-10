import Image from "next/image";
import Link from "next/link";

const PostCard = ({ post, featured }) => {
  if (featured) {
    return (
      <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center group cursor-pointer">
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <Image
            src={post.image}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            alt={post.title}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1C1917]/20 via-transparent to-transparent" />
          <div className="absolute top-5 left-5">
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1.5 border border-white/15">
              Featured
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#383636] font-light">
              {post.category}
            </span>
            <span className="w-4 h-px bg-[#383636]/20" />
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#383636]/35 font-light">
              {post.date}
            </span>
          </div>

          <h2
            className="font-light text-[#383636] leading-snug"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
          >
            {post.title}
          </h2>

          <p className="text-base text-[#383636]/50 font-light leading-relaxed">
            {post.excerpt}
          </p>

          <Link
            href={`/blogs/${post.id}`}
            className="group/btn inline-flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-[#383636]/45 hover:text-[#383636] transition-colors duration-300 font-light self-start pt-2"
          >
            <span>Read Article</span>
            <span className="inline-block w-6 h-px bg-current group-hover/btn:w-10 transition-all duration-300" />
            <span>→</span>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group cursor-pointer border-b border-[#383636]/8 py-10 first:pt-0">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-start">
        <div
          className="sm:col-span-2 relative overflow-hidden"
          style={{ aspectRatio: "4/3" }}
        >
          <Image
            src={post.image}
            fill
            sizes="(max-width: 640px) 100vw, 40vw"
            alt={post.title}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[#383636]/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <div className="sm:col-span-3 flex flex-col gap-3 sm:py-1">
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#383636] font-light">
              {post.category}
            </span>
            <span className="w-3 h-px bg-[#383636]/20" />
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#383636]/35 font-light">
              {post.date}
            </span>
          </div>

          <h2 className="text-lg font-light text-[#383636] leading-snug group-hover:text-[#383636]/60 transition-colors duration-300">
            {post.title}
          </h2>

          <p className="text-xs text-[#383636]/45 font-light leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          <Link
            href={`/blogs/${post.id}`}
            className="group/btn inline-flex items-center gap-2.5 text-[10px] tracking-[0.15em] uppercase text-[#383636]/35 hover:text-[#383636] transition-colors duration-300 font-light self-start mt-2"
          >
            <span>Read Article</span>
            <span className="inline-block w-4 h-px bg-current group-hover/btn:w-7 transition-all duration-300" />
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
