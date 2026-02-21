"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const getAuthHeader = () => {
  const token = Cookies.get("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ShowBlogs = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await axios.get(`${API_BASE}/admin/blog-category`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...getAuthHeader(),
        },
      });
      const cats = res?.data?.data || res.data || [];
      setCategories(cats);

      if (cats.length > 0) {
        setSelectedCategoryId(cats[0].id);
        fetchBlogsByCategory(cats[0].id);
      }
    } catch (err) {
      console.error("Blog category fetch error:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchBlogsByCategory = async (categoryId) => {
    if (!categoryId) return;
    try {
      setLoadingBlogs(true);
      const res = await axios.get(
        `${API_BASE}/admin/blog/blogs-by-category/${categoryId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...getAuthHeader(),
          },
        }
      );

      // { data: { blogs: [], totalCount } }
      const payload = res?.data?.data || {};
      setBlogs(payload.blogs || []);
    } catch (err) {
      console.error("Blogs fetch error:", err);
      setBlogs([]);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    fetchBlogsByCategory(categoryId);
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-xl font-semibold text-gray-800">
          Blogs by Category
        </h2>
        <div className="flex flex-wrap gap-2">
          {loadingCategories && categories.length === 0 && (
            <span className="text-sm text-gray-500">Loading categories...</span>
          )}
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                selectedCategoryId === cat.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
          {!loadingCategories && categories.length === 0 && (
            <span className="text-sm text-gray-500">No categories found.</span>
          )}
        </div>
      </div>

      <div className="border-t pt-4 overflow-x-auto">
        {loadingBlogs ? (
          <p className="text-sm text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-sm text-gray-500">
            {selectedCategoryId
              ? "No blogs found for this category."
              : "Select a category to see blogs."}
          </p>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-3 py-2 font-semibold">Thumbnail</th>
                <th className="px-3 py-2 font-semibold">Title</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2">
                    {b.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={b.thumbnail}
                        alt={b.title}
                        className="w-16 h-12 object-cover rounded-md border"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-3 py-2">{b.title}</td>
                  <td className="px-3 py-2">{b.status}</td>
                  <td className="px-3 py-2">
                    {b.createdAt
                      ? new Date(b.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ShowBlogs;