// Assuming you have these components in your components folder
import PostCard from "./PostCard";
import Sidebar from "./Sidebar";

const BlogComponent = () => {
  const posts = [
    {
      id: 1,
      category: "Residential Interior",
      date: "Jan 1, 2026",
      author: "Admin",
      title: "The Top Interior Design Trends Defining Modern Homes",
      excerpt:
        "An analytical overview of the most influential interior design trends shaping contemporary homes, including color palettes, materials, and furniture forms.",
      image: "/images/blog-img.png",
      isHero: true,
    },
    // ... add more post objects here
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans text-gray-900">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content Area */}
        <main className="lg:w-2/3 space-y-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </main>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-10">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default BlogComponent;
