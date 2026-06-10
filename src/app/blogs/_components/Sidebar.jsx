"use client";

import Image from "next/image";
import { useState } from "react";

const CATEGORY_LIST = [
  "Residential Interior",
  "Commercial Interior",
  "Institutional",
  "Tech Office",
];

const Sidebar = ({ posts, activeCategory, setActiveCategory }) => {
  const [search, setSearch] = useState("");

  const recentPosts = posts.slice(0, 3);
  const searchResults =
    search.trim().length > 1
      ? posts.filter(
          (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()),
        )
      : [];

  return (
    <div className="space-y-12 lg:sticky lg:top-28">
      {/* Search */}
      <div>
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#383636]/35 font-light mb-5">
          / Search
        </p>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-transparent border-b border-[#383636]/15 py-3 text-base text-[#383636]/70 placeholder-[#383636]/25 font-light tracking-wide outline-none focus:border-[#383636] transition-colors duration-300 pr-6"
          />
          <span className="absolute right-0 top-3 text-[#383636]/25 text-xs pointer-events-none">
            ↗
          </span>
        </div>
        {searchResults.length > 0 && (
          <div className="mt-2 border border-[#383636]/10 bg-white">
            {searchResults.map((p) => (
              <div
                key={p.id}
                className="px-4 py-3 border-b border-[#383636]/8 last:border-0 hover:bg-[#F7F4F0] cursor-pointer transition-colors duration-200"
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#383636]/35 font-light mb-0.5">
                  {p.category}
                </p>
                <p className="text-xs text-[#383636]/60 font-light line-clamp-2">
                  {p.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div>
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#383636]/35 font-light mb-5">
          / Categories
        </p>
        <ul className="border-t border-[#383636]/10">
          {CATEGORY_LIST.map((cat) => (
            <li key={cat}>
              <button
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? "All" : cat)
                }
                className={`w-full flex items-center justify-between py-3.5 border-b border-[#383636]/8 text-left transition-colors duration-200 ${
                  activeCategory === cat
                    ? "text-[#383636]"
                    : "text-[#383636]/40 hover:text-[#383636]/70"
                }`}
              >
                <span className="text-xs font-light tracking-[0.08em]">
                  {cat}
                </span>
                {activeCategory === cat && (
                  <span className="text-[10px] text-[#383636]/30">×</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent posts */}
      <div>
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#383636]/35 font-light mb-5">
          / Recent
        </p>
        <div className="space-y-6">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="flex gap-4 group cursor-pointer"
            >
              <div className="relative w-16 h-16 shrink-0 overflow-hidden">
                <Image
                  src={post.image}
                  fill
                  sizes="64px"
                  alt={post.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#383636]/30 font-light">
                  {post.date}
                </p>
                <p className="text-xs text-[#383636]/55 font-light leading-snug line-clamp-2 group-hover:text-[#383636] transition-colors duration-200">
                  {post.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
