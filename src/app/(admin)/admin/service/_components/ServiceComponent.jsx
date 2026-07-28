"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const getAuthHeader = () => {
  const token = Cookies.get("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ServiceComponent = ({
  editingService,
  clearEditing,
  onUpdateSuccess,
}) => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const emptyService = {
    name: "",
    categoryId: "",
    slug: "",
    shortDescription: "",
    thumbnail: "",
    image: "",
    details: [
      { title: "", description: "" },
      { title: "", description: "" },
    ],
  };
  const [service, setService] = useState(emptyService);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    if (editingService) {
      setService({
        name: editingService.name || "",
        categoryId: editingService.categoryId || "",
        slug: editingService.slug || "",
        shortDescription: editingService.shortDescription || "",
        thumbnail: editingService.thumbnail || "",
        image: editingService.image || "",
        details: Array.isArray(editingService.details)
          ? editingService.details
          : [
              { title: "", description: "" },
              { title: "", description: "" },
            ],
      });
      setThumbnailFile(null);
      setImageFile(null);
    } else {
      setService(emptyService);
      setThumbnailFile(null);
      setImageFile(null);
    }
  }, [editingService]);

  // const fetchCategories = async () => {
  //   try {
  //     const res = await axios.get(`${API_BASE}/admin/service-category`, {
  //       headers: { ...getAuthHeader() },
  //     });
  //     setCategories(res?.data?.data || []);
  //   } catch (err) {
  //     console.error("Service category fetch error:", err);
  //   }
  // };

  // const handleCategorySubmit = async (e) => {
  //   e.preventDefault();
  //   if (!categoryInput.trim()) return;
  //   try {
  //     await axios.post(
  //       `${API_BASE}/admin/service-category/create`,
  //       { name: categoryInput.trim() },
  //       { headers: { ...getAuthHeader() } },
  //     );
  //     setCategoryInput("");
  //     fetchCategories();
  //     toast.success("Category created");
  //   } catch (err) {
  //     toast.error(
  //       "Failed to create category: " +
  //         (err?.response?.data?.message || err.message),
  //     );
  //   }
  // };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("upload", file);
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
      if (res.data?.data?.url) {
        toast.success("Thumbnail uploaded");
        return res.data.data.url;
      }
      toast.error("Thumbnail upload failed");
      return null;
    } catch (err) {
      toast.error("Thumbnail upload failed");
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailsChange = (index, field, value) => {
    setService((prev) => {
      const details = [...prev.details];
      details[index] = { ...details[index], [field]: value };
      return { ...prev, details };
    });
  };

  const handleAddDetail = () => {
    setService((prev) => ({
      ...prev,
      details: [...prev.details, { title: "", description: "" }],
    }));
  };

  const handleRemoveDetail = (index) => {
    setService((prev) => {
      if (prev.details.length === 1) return prev;
      return { ...prev, details: prev.details.filter((_, i) => i !== index) };
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let thumbnailUrl = service.thumbnail;
      if (thumbnailFile) {
        const uploaded = await uploadImage(thumbnailFile);
        if (!uploaded) return;
        thumbnailUrl = uploaded;
      }
      let imageUrl = service.image;
      if (imageFile) {
        const uploaded = await uploadImage(imageFile);
        if (!uploaded) return;
        imageUrl = uploaded;
      }
      const payload = {
        name: service.name,
        slug: service.slug,
        shortDescription: service.shortDescription,
        thumbnail: thumbnailUrl,
        image: imageUrl,
        details: service.details,
      };

      if (editingService?.id) {
        await axios.patch(
          `${API_BASE}/admin/service/update/${editingService.id}`,
          payload,
          {
            headers: { ...getAuthHeader(), "Content-Type": "application/json" },
          },
        );
        toast.success("Service updated successfully");
        if (clearEditing) clearEditing();
        if (onUpdateSuccess) onUpdateSuccess();
      } else {
        await axios.post(`${API_BASE}/admin/service/create`, payload, {
          headers: { ...getAuthHeader(), "Content-Type": "application/json" },
        });
        toast.success("Service created successfully");
        if (onUpdateSuccess) onUpdateSuccess();
      }

      setService(emptyService);
      setThumbnailFile(null);
      setImageFile(null);
    } catch (err) {
      toast.error("Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* ===== CREATE CATEGORY ===== */}
        {/* <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Create Service Category
          </h2>
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
        </div> */}

        {/* ===== CREATE / EDIT SERVICE ===== */}
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {editingService ? "Edit Service" : "Create Service"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleChange}
                placeholder="Service name"
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            {/* Category */}
            {/* <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="categoryId"
                value={service.categoryId}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required={!editingService}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Slug */}
            <div>
              <label className="block mb-1 font-medium">Slug</label>
              <input
                type="text"
                name="slug"
                value={service.slug}
                onChange={handleChange}
                placeholder="Auto-generated from name if left blank"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Short description */}
            <div>
              <label className="block mb-1 font-medium">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={service.shortDescription}
                onChange={handleChange}
                rows={3}
                placeholder="Shown on the service detail page overview"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block mb-1 font-medium">
                Thumbnail (card image)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              {service.thumbnail && (
                <p className="mt-1 text-xs text-gray-500 break-all">
                  Current: {service.thumbnail}
                </p>
              )}
            </div>

            {/* Hero image */}
            <div>
              <label className="block mb-1 font-medium">
                Image (detail page hero)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              {service.image && (
                <p className="mt-1 text-xs text-gray-500 break-all">
                  Current: {service.image}
                </p>
              )}
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-gray-800">Details</h2>
                <button
                  type="button"
                  onClick={handleAddDetail}
                  className="text-sm px-3 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                >
                  + Add detail
                </button>
              </div>
              {service.details.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-4 border rounded-md p-3 items-start"
                >
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Title {idx + 1}
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleDetailsChange(idx, "title", e.target.value)
                      }
                      className="w-full border px-3 py-2 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Description {idx + 1}
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleDetailsChange(idx, "description", e.target.value)
                      }
                      className="w-full border px-3 py-2 rounded-md text-sm"
                    />
                  </div>
                  <div className="flex md:justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveDetail(idx)}
                      disabled={service.details.length === 1}
                      className="mt-6 px-3 py-2 text-xs rounded-md border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit / Cancel */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingService
                    ? "Update Service"
                    : "Create Service"}
              </button>
              {editingService && (
                <button
                  type="button"
                  onClick={() => {
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

export default ServiceComponent;
