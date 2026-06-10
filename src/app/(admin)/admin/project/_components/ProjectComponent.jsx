"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Get auth header
const getAuthHeader = () => {
  const token = Cookies.get("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ProjectComponent = ({ editingProject, clearEditing, categories = [], onCategoryAdded }) => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [project, setProject] = useState({
    title: "",
    categoryId: "",
    thumbnail: "",
    status: "PUBLISHED",
    type: "",
    architech: "",
    client: "",
    duration: "",
    strategy: "",
    date: "",
    gallery: [],
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [editingId, setEditingId] = useState(null);

  // When an editing project is provided, populate the form
  useEffect(() => {
    if (editingProject) {
      setEditingId(editingProject.id);
      setProject({
        title: editingProject.title || "",
        categoryId: editingProject.categoryId || "",
        thumbnail: editingProject.thumbnail || "",
        status: editingProject.status || "PUBLISHED",
        type: editingProject.type || "",
        architech: editingProject.architech || "",
        client: editingProject.client || "",
        duration: editingProject.duration || "",
        strategy: editingProject.strategy || "",
        date: editingProject.date ? editingProject.date.slice(0, 10) : "",
        gallery: editingProject.gallery || [],
      });
    } else {
      setEditingId(null);
    }
  }, [editingProject]);

  /* ================= IMAGE UPLOAD API ================= */
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("upload", file); // backend expects 'image'

      const res = await axios.post(
        `${API_BASE}/admin/upload-content-img`,
        formData,
        {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.data.data) {
        toast.success("Image uploaded successfully");
        return res.data.data.url;
      } else {
        toast.error("Image upload failed");
        return null;
      }
    } catch (err) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const uploadGalleryImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("gallery", file);
    });
    const res = await axios.post(
      `${API_BASE}/admin/upload-gallery-img`,
      formData,
      {
        headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" },
      },
    );
    if (res.data.data) {
      toast.success("Gallery images uploaded successfully");
      // API returns either array of URLs or objects with .url
      const data = res.data.data;
      const urls = Array.isArray(data)
        ? data
            .map((item) => (typeof item === "string" ? item : item.url))
            .filter(Boolean)
        : [];
      return urls;
    } else {
      toast.error("Gallery images upload failed");
      return [];
    }
  };
  const resetForm = () => {
    setEditingId(null);
    setProject({
      title: "",
      categoryId: "",
      thumbnail: "",
      status: "PUBLISHED",
      type: "",
      architech: "",
      client: "",
      duration: "",
      strategy: "",
      date: "",
      gallery: [],
    });
    setThumbnailFile(null);
  };

  /* ================= HANDLERS ================= */
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE}/admin/project-category/create`,
        { name: category },
        { headers: { ...getAuthHeader() } },
      );
      const newCat = res?.data?.data || { id: Date.now(), name: category };
      if (onCategoryAdded) onCategoryAdded(newCat);
      setCategory("");
      toast.success("Category added");
    } catch (err) {
      toast.error("Failed to add category");
      console.error(err);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const thumbnail = thumbnailFile
        ? await uploadImage(thumbnailFile)
        : project.thumbnail || "";

      // gallery is fully managed in project.gallery via handleGalleryChange
      const gallery = project.gallery || [];

      const payload = {
        ...project,
        thumbnail,
        gallery,
      };

      const categoryIdToUse = project.categoryId;
      if (!categoryIdToUse) {
        toast.error("Please select a category");
        return;
      }

      if (editingId) {
        // Update existing project
        const res = await axios.patch(
          `${API_BASE}/admin/project/update/${editingId}`,
          payload,
          {
            headers: { ...getAuthHeader(), "Content-Type": "application/json" },
          },
        );
        toast.success("Project Updated Successfully ✅");
        if (clearEditing) clearEditing();
      } else {
        // Create new project
        await axios.post(
          `${API_BASE}/admin/project/post/${categoryIdToUse}`,
          payload,
          {
            headers: { ...getAuthHeader(), "Content-Type": "application/json" },
          },
        );
        toast.success("Project Created Successfully ✅");
      }
      resetForm();
    } catch (err) {
      toast.error("Project creation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = async (e) => {
    e.preventDefault();
    const uploadedUrl = await uploadImage(e.target.files[0]);
    if (!uploadedUrl) return;
    setProject((prev) => ({ ...prev, thumbnail: uploadedUrl }));
  };

  const handleRemoveThumbnail = () => {
    setProject((prev) => ({ ...prev, thumbnail: "" }));
    setThumbnailFile(null);
  };

  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);
    const newUrls = await uploadGalleryImages(files);
    if (!newUrls.length) return;
    setProject((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), ...newUrls],
    }));
  };
  const handleSelectCategory = (value) => {
    setSelectedCategoryId(value);
    setProject((prev) => ({
      ...prev,
      categoryId: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-gray-800">Project Management</h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Create Project Category
          </h2>
          <form onSubmit={handleCategorySubmit} className="flex gap-4">
            <input
              type="text"
              placeholder="Category Name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 border px-4 py-2 rounded-md"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Add
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">
            {editingId ? "Edit Project" : "Create Project"}
          </h2>
          <form
            onSubmit={handleProjectSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Title */}
            <Input
              label="Title"
              name="title"
              value={project.title}
              onChange={handleChange}
              required
            />

            {/* Category Dropdown */}
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="categoryId"
                value={project.categoryId}
                onChange={(e) => handleSelectCategory(e.target.value)}
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
            </div>

            <div>
              <label className="block mb-1 font-medium">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full border px-3 py-2 rounded-md"
                required={!editingId}
              />
              {project.thumbnail && (
                <div className="mt-2 inline-flex items-center gap-2">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.thumbnail}
                      alt="Current thumbnail"
                      className="w-24 h-16 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveThumbnail}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shadow"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={project.status}
                className="w-full border px-3 py-2 rounded-md"
                onChange={handleChange}
                required
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>

            {/* Gallery Upload */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Gallery Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.gallery.map((url, idx) => (
                    <div key={`${url}-${idx}`} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`Gallery ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setProject((prev) => ({
                            ...prev,
                            gallery: prev.gallery.filter((_, i) => i !== idx),
                          }))
                        }
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center shadow"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit / Cancel */}
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingId
                    ? "Update Project"
                    : "Create Project"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    if (clearEditing) clearEditing();
                  }}
                  className="px-4 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ================= INPUT COMPONENT ================= */
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border px-3 py-2 rounded-md"
    />
  </div>
);

export default ProjectComponent;
