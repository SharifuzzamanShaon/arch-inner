"use client";

import { useState } from "react";
import Footer from "../../_components/common/Footer";
import PostCard from "./PostCard";
import Sidebar from "./Sidebar";

const CATEGORIES = [
  "All",
  "Residential Interior",
  "Commercial Interior",
  "Institutional",
  "Tech Office",
];

export const posts = [
  {
    id: 1,
    category: "Residential Interior",
    date: "Jan 1, 2026",
    author: "arch INNER",
    title: "The Top Interior Design Trends Defining Modern Homes",
    excerpt:
      "An analytical overview of the most influential interior design trends shaping contemporary homes, including color palettes, materials, and furniture forms.",
    image: "/images/blog-img.png",
    featured: true,
  },
  {
    id: 2,
    category: "Commercial Interior",
    date: "Dec 15, 2025",
    author: "arch INNER",
    title: "Designing Executive Spaces: Authority Through Material",
    excerpt:
      "How high-end material selection — stone, veneer, and precision lighting — communicates leadership and refinement in corporate environments.",
    image: "/images/fervent-chairman.jpg",
  },
  {
    id: 3,
    category: "Institutional",
    date: "Nov 28, 2025",
    author: "arch INNER",
    title: "Academic Interiors: Crafting Environments for Focused Learning",
    excerpt:
      "Thoughtful spatial design in educational buildings supports concentration, collaboration, and institutional identity.",
    image: "/images/du-conference.jpg",
  },
  {
    id: 4,
    category: "Tech Office",
    date: "Nov 10, 2025",
    author: "arch INNER",
    title: "The Open Office Reimagined: Energy, Acoustics, and Brand",
    excerpt:
      "Modern IT offices demand more than rows of desks. Colour zoning, acoustic panels, and branded environments drive productivity and retention.",
    image: "/images/servisol-workstation.jpg",
  },
  {
    id: 5,
    category: "Residential Interior",
    date: "Oct 22, 2025",
    author: "arch INNER",
    title: "Warm Minimalism: The Case for Restraint in Home Design",
    excerpt:
      "How limiting a palette to three materials and two tones creates spaces that feel curated rather than sparse.",
    image: "/images/du-dean-room.jpg",
  },
];

const BlogComponent = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);
  const filtered =
    activeCategory === "All"
      ? rest
      : rest.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Page hero */}
      <section className="bg-white pt-24 sm:pt-28 border-b border-[#383636]/10">
        <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#383636]/40 font-light mb-10">
            / Insights
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h1
              className="font-light text-[#383636] leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Journal &amp;{" "}
              <span className="text-[#383636]/30">Perspectives</span>
            </h1>
            <p className="text-xs text-[#383636]/35 font-light leading-relaxed max-w-xs pb-1">
              Design thinking, project insights, and studio notes from arch INNER.
            </p>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="bg-[#F7F4F0] border-b border-[#383636]/8">
          <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
            <PostCard post={featured} featured />
          </div>
        </section>
      )}

      {/* Main content + sidebar */}
      <section className="bg-white">
        <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          {/* Category filter */}
          <div className="flex items-center gap-1 flex-wrap mb-14 border-b border-[#383636]/10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-3 text-xs font-light tracking-widest uppercase transition-colors duration-200 ${
                  activeCategory === cat
                    ? "text-[#383636]"
                    : "text-[#383636]/35 hover:text-[#383636]/70"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[#383636]" />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Posts */}
            <div className="lg:col-span-2 space-y-0">
              {filtered.length > 0 ? (
                filtered.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <p className="text-base text-[#383636]/35 font-light py-10 tracking-wide">
                  No posts in this category yet.
                </p>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar
                posts={posts}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogComponent;
