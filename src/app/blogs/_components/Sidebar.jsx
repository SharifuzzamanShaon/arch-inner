import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="space-y-10">
      {/* Search Bar */}
      <div>
        <h3 className="text-xl font-bold mb-4">Search blogs</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 rounded-full py-3 px-6 outline-none focus:ring-2 focus:ring-orange-500"
          />
          <span className="absolute right-5 top-3.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xl font-bold mb-4">Categories</h3>
        <ul className="space-y-3 text-gray-600">
          {[
            "Residential Interior",
            "Commercial Interior",
            "3D Visualization",
            "Renovation",
          ].map((cat) => (
            <li
              key={cat}
              className="hover:text-orange-600 cursor-pointer transition-colors"
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-xl font-bold mb-6">Recent Posts</h3>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 group cursor-pointer">
              <Image
                src={`/thumb-${i}.jpg`}
                alt={`Thumb ${i}`}
                className="w-24 h-20 rounded-lg object-cover"
                width={96}
                height={80}
              />
              <div>
                <h4 className="font-bold text-sm line-clamp-2 group-hover:text-orange-600">
                  The Top Interior Design Trends...
                </h4>
                <p className="text-xs text-gray-400 mt-1">Jan 1, 2026</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
