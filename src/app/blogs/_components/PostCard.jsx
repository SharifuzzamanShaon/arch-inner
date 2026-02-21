import Image from "next/image";

const PostCard = ({ post }) => {
  return (
    <article className="group cursor-pointer">
      <div
        className={`overflow-hidden rounded-2xl mb-4 ${post.isHero ? "aspect-video" : "aspect-[16/9]"}`}
      >
        <Image
          src={post.image}
          alt={post.title}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
        <span className="text-black">{post.category}</span>
        <span>•</span>
        <span>
          {post.date} - Posted by {post.author}
        </span>
      </div>

      <h2
        className={`${post.isHero ? "text-3xl" : "text-2xl"} font-bold mb-3 hover:text-orange-600 transition-colors`}
      >
        {post.title}
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
        {post.excerpt}
      </p>

      <button className="text-orange-600 font-bold text-sm border-b-2 border-orange-600 pb-1">
        Read More
      </button>

      {post.isHero && <hr className="mt-12 border-gray-100" />}
    </article>
  );
};

export default PostCard;
