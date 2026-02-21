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
  const [loading, setLoading] = useState(false);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    excerpt: "",
    categoryId: "",
    thumbnail: "",
  });

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [Editor, setEditor] = useState({
    CKEditor: null,
    ClassicEditor: null,
  });

  // ================= LOAD CKEDITOR SAFELY =================
  useEffect(() => {
    const loadEditor = async () => {
      const ckEditorModule = await import("@ckeditor/ckeditor5-react");
      const classicModule = await import(
        "@ckeditor/ckeditor5-build-classic"
      );

      setEditor({
        CKEditor: ckEditorModule.CKEditor,
        ClassicEditor: classicModule.default,
      });

      setEditorLoaded(true);
    };

    loadEditor();
  }, []);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/blog-category`, {
        headers: {
          ...getAuthHeader(),
        },
      });

      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= CKEDITOR IMAGE UPLOAD ADAPTER =================
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

          return {
            default: res.data.data.url,
          };
        } catch (error) {
          console.error("Upload failed:", error);
          toast.error("Image upload failed");
          throw error;
        }
      },
    };
  }

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
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

      setBlog((prev) => ({
        ...prev,
        thumbnail: res.data.data.url,
      }));

      toast.success("Thumbnail uploaded");
    } catch (err) {
      toast.error("Thumbnail upload failed");
      console.error(err);
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
        urlSlug: blog.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        status: "PUBLISHED",
      };

     const res = await axios.post(
        `${API_BASE}/admin/blog/post/${blog.categoryId}`,
        payload,
        {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      toast.success("Blog created successfully ✅");

      setBlog({
        title: "",
        content: "",
        excerpt: "",
        categoryId: "",
        thumbnail: "",
      });
    } catch (err) {
      toast.error("Failed to create blog ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Create Blog</h1>

        <form onSubmit={handleBlogSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          {/* Category */}
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

          {/* Thumbnail */}
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          {/* Excerpt */}
          <textarea
            name="excerpt"
            value={blog.excerpt}
            onChange={handleChange}
            placeholder="Short description"
            rows={3}
            className="w-full border px-3 py-2 rounded-md"
          />
          {/* CKEditor */}
          <div className="border rounded-md">
            {editorLoaded && Editor.CKEditor ? (
              <Editor.CKEditor
                
                editor={Editor.ClassicEditor}
                data={blog.content}
                onChange={handleContentChange}
                onReady={(editor) => {
                  editor.plugins.get(
                    "FileRepository"
                  ).createUploadAdapter = (loader) => {
                    return uploadAdapter(loader);
                  };
                }}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "blockQuote",
                    "insertTable",
                    "|",
                    "imageUpload",
                    "mediaEmbed",
                    "|",
                    "undo",
                    "redo",
                  ],
                  height: "500px", 
                }}
              />
            ) : (
              <div className="p-3 text-gray-500">Loading editor...</div>
            )}
          </div>

          {/* Submit */}
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
  );
};

export default BlogComponent;
