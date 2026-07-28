"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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

  const handleDeleteCategory = async (cat) => {
    if (!cat?.id) return;
    const ok = window.confirm(
      `Delete category "${cat.name}"? All associated blogs may also be affected.`
    );
    if (!ok) return;
    try {
      await axios.delete(`${API_BASE}/admin/blog-category/delete/${cat.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...getAuthHeader(),
        },
      });
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      if (selectedCategoryId === cat.id) {
        setSelectedCategoryId(null);
        setBlogs([]);
      }
      toast.success(`Category "${cat.name}" deleted.`);
    } catch (err) {
      toast.error(
        "Delete category error: " +
          (err?.response?.data?.message || err.message)
      );
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (!blog?.id) return;
    const ok = window.confirm("Are you sure you want to delete this blog?");
    if (!ok) return;
    try {
      await axios.delete(`${API_BASE}/admin/blog/delete/${blog.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...getAuthHeader(),
        },
      });
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      toast.success("Blog deleted.");
    } catch (err) {
      toast.error(
        "Delete blog error: " +
          (err?.response?.data?.message || err.message)
      );
    }
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
            <div
              key={cat.id}
              className={`flex items-center gap-1 pl-3 pr-1 py-1 rounded-full text-sm border transition ${
                selectedCategoryId === cat.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              <button
                type="button"
                onClick={() => handleSelectCategory(cat.id)}
                className="leading-none"
              >
                {cat.name}
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCategory(cat)}
                title="Delete category"
                className={`ml-1 w-4 h-4 flex items-center justify-center rounded-full text-xs leading-none transition ${
                  selectedCategoryId === cat.id
                    ? "hover:bg-blue-500 text-white"
                    : "hover:bg-red-100 text-gray-500 hover:text-red-600"
                }`}
              >
                ×
              </button>
            </div>
          ))}
          {!loadingCategories && categories.length === 0 && (
            <span className="text-sm text-gray-500">
              No categories found. Create one above first.
            </span>
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
                <th className="px-3 py-2 font-semibold">Author</th>
                <th className="px-3 py-2 font-semibold">Featured</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Created</th>
                <th className="px-3 py-2 font-semibold text-center">Actions</th>
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
                  <td className="px-3 py-2">{b.author || "-"}</td>
                  <td className="px-3 py-2">{b.featured ? "Yes" : "No"}</td>
                  <td className="px-3 py-2">{b.status}</td>
                  <td className="px-3 py-2">
                    {b.createdAt
                      ? new Date(b.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteBlog(b)}
                        className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
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
