"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Get last segment (project, service, blog)
  const activePage = pathname.split("/")[2]; // <-- FIXED INDEX

  return (
    <div className="flex h-screen bg-[#f8f7f5] font-sans">
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">
          arch Inner
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin/project"
            className={`block p-3 rounded ${
              activePage === "project" ? "bg-slate-800" : ""
            } hover:bg-slate-800 transition`}
          >
            Projects
          </Link>

          <Link
            href="/admin/service"
            className={`block p-3 rounded ${
              activePage === "service" ? "bg-slate-800" : ""
            } hover:bg-slate-800 transition`}
          >
            Service
          </Link>

          <Link
            href="/admin/blog"
            className={`block p-3 rounded ${
              activePage === "blog" ? "bg-slate-800" : ""
            } hover:bg-slate-800 transition`}
          >
            Blog
          </Link>

          <Link
            href="/admin/settings"
            className={`block p-3 rounded ${
              activePage === "settings" ? "bg-slate-800" : ""
            } hover:bg-slate-800 transition`}
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                Cookies.remove("admin_token");
                router.push("/login");
              }}
              className="px-4 py-2 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Logout
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
              Shaon
            </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
