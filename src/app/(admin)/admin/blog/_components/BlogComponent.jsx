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

const BlogComponent = () => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    excerpt: "",
    categoryId: "",
    thumbnail: "",
    author: "",
    featured: false,
  });

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [Editor, setEditor] = useState({
    CKEditor: null,
    ClassicEditor: null,
  });

  useEffect(() => {
    const loadEditor = async () => {
      const ckEditorModule = await import("@ckeditor/ckeditor5-react");
      const classicModule = await import("@ckeditor/ckeditor5-build-classic");
      setEditor({
        CKEditor: ckEditorModule.CKEditor,
        ClassicEditor: classicModule.default,
      });
      setEditorLoaded(true);
    };
    loadEditor();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/blog-category`, {
        headers: { ...getAuthHeader() },
      });
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryInput.trim()) return;
    try {
      await axios.post(
        `${API_BASE}/admin/blog-category/create`,
        { name: categoryInput.trim() },
        { headers: { ...getAuthHeader() } }
      );
      setCategoryInput("");
      fetchCategories();
      toast.success("Category created");
    } catch (err) {
      toast.error(
        "Failed to create category: " +
          (err?.response?.data?.message || err.message)
      );
    }
  };

  function uploadAdapter(loader) {
    return {
      upload: async () => {
        const file = await loader.file;
        const formData = new FormData();
        formData.append("upload", file);
        try {
          const res = await axios.post(
            `${API_BASE}/admin/upload-content-img`,
            formData,
            {
              headers: {
                ...getAuthHeader(),
                "Content-Type": "multipart/form-data",
              },
            }
          );
          return { default: res.data.data.url };
        } catch (error) {
          toast.error("Image upload failed");
          throw error;
        }
      },
    };
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlog((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setBlog((prev) => ({ ...prev, content: data }));
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("upload", file);
    try {
      const res = await axios.post(
        `${API_BASE}/admin/upload-content-img`,
        formData,
        {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBlog((prev) => ({ ...prev, thumbnail: res.data.data.url }));
      toast.success("Thumbnail uploaded");
    } catch (err) {
      toast.error("Thumbnail upload failed");
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!blog.categoryId) {
      toast.error("Please select a category");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        title: blog.title,
        thumbnail: blog.thumbnail,
        content: blog.content,
        excerpt: blog.excerpt || "",
        author: blog.author || "",
        featured: blog.featured,
        status: "PUBLISHED",
      };
      await axios.post(
        `${API_BASE}/admin/blog/post/${blog.categoryId}`,
        payload,
        {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Blog created successfully");
      setBlog({
        title: "",
        content: "",
        excerpt: "",
        categoryId: "",
        thumbnail: "",
        author: "",
        featured: false,
      });
    } catch (err) {
      toast.error("Failed to create blog");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ===== CREATE CATEGORY ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Create Blog Category</h2>
          <form onSubmit={handleCategorySubmit} className="flex gap-4">
            <input
              type="text"
              placeholder="Category Name"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="flex-1 border px-4 py-2 rounded-md"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </form>
        </div>

        {/* ===== CREATE BLOG ===== */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-6">Create Blog</h1>
          <form onSubmit={handleBlogSubmit} className="space-y-6">
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              placeholder="Blog Title"
              className="w-full border px-3 py-2 rounded-md"
              required
            />

            <select
              name="categoryId"
              value={blog.categoryId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />

            <textarea
              name="excerpt"
              value={blog.excerpt}
              onChange={handleChange}
              placeholder="Short description"
              rows={3}
              className="w-full border px-3 py-2 rounded-md"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <input
                type="text"
                name="author"
                value={blog.author}
                onChange={handleChange}
                placeholder="Author (defaults to arch Inner)"
                className="w-full border px-3 py-2 rounded-md"
              />
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="featured"
                  checked={blog.featured}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Featured post
              </label>
            </div>

            <div className="border rounded-md">
              {editorLoaded && Editor.CKEditor ? (
                <Editor.CKEditor
                  editor={Editor.ClassicEditor}
                  data={blog.content}
                  onChange={handleContentChange}
                  onReady={(editor) => {
                    editor.plugins.get(
                      "FileRepository"
                    ).createUploadAdapter = (loader) => uploadAdapter(loader);
                  }}
                  config={{
                    toolbar: [
                      "heading", "|", "bold", "italic", "link",
                      "bulletedList", "numberedList", "|",
                      "blockQuote", "insertTable", "|",
                      "imageUpload", "mediaEmbed", "|",
                      "undo", "redo",
                    ],
                  }}
                />
              ) : (
                <div className="p-3 text-gray-500">Loading editor...</div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
