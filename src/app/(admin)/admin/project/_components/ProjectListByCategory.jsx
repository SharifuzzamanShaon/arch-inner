"use client";

import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
  "http://localhost:8000";

// Get auth header
const getAuthHeader = () => {
  const token = Cookies.get("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ProjectListByCategory = ({ onEdit, categories = [], onCategoryDeleted }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Auto-select first category when categories first load
  useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      handleSelectCategory(categories[0].id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const fetchProjectsByCategory = async (categoryId) => {
    if (!categoryId) return;
    try {
      setLoadingProjects(true);
      const res = await axios.get(
        `${API_BASE}/admin/project/porjcet-by-category/${categoryId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...getAuthHeader(),
          },
        },
      );

      const projects = res?.data?.data.projects;
      setProjects([...projects]);
    } catch (err) {
      toast.error("Project fetch error:", err);
      setProjects([]);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    fetchProjectsByCategory(categoryId);
  };

  const handleDeleteCategory = async (cat) => {
    if (!cat?.id) return;
    const ok = window.confirm(
      `Delete category "${cat.name}"? All associated projects may also be affected.`,
    );
    if (!ok) return;

    try {
      await axios.delete(
        `${API_BASE}/admin/project-category/delete/${cat.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...getAuthHeader(),
          },
        },
      );
      if (onCategoryDeleted) onCategoryDeleted(cat.id);
      if (selectedCategoryId === cat.id) {
        setSelectedCategoryId(null);
        setProjects([]);
      }
      toast.success(`Category "${cat.name}" deleted.`);
    } catch (err) {
      toast.error(
        "Delete category error: " +
          (err?.response?.data?.message || err.message),
      );
    }
  };

  const handleEdit = (project) => {
    if (onEdit) {
      onEdit(project);
    }
  };

  const handleDelete = async (project) => {
    if (!project?.id) return;
    const ok = window.confirm("Are you sure you want to delete this project?");
    if (!ok) return;

    try {
      await axios.delete(`${API_BASE}/admin/project/delete/${project.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...getAuthHeader(),
        },
      });
      // Remove from local list
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch (err) {
      toast.error("Delete project error:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6 mt-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-xl font-semibold">Projects by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.length === 0 && (
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
          {categories.length === 0 && (
            <span className="text-sm text-gray-500">
              No categories found. Create one above first.
            </span>
          )}
        </div>
      </div>

      <div className="border-t pt-4 overflow-x-auto">
        {loadingProjects ? (
          <p className="text-gray-500 text-sm">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 text-sm">
            {selectedCategoryId
              ? "No projects found for this category."
              : "Select a category to see projects."}
          </p>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-3 py-2 font-semibold">Thumbnail</th>
                <th className="px-3 py-2 font-semibold">Title</th>
                <th className="px-3 py-2 font-semibold">Type</th>
                <th className="px-3 py-2 font-semibold">Client</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold">Created At</th>
                <th className="px-3 py-2 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((proj) => (
                <tr key={proj.id} className="hover:bg-gray-50 border-b">
                  <td className="px-3 py-2">
                    <Image
                      src={proj.thumbnail || "/images/no-image.png"}
                      alt={proj.title || "Project thumbnail"}
                      width={50}
                      height={50}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-3 py-2">{proj.title}</td>
                  <td className="px-3 py-2">{proj.type}</td>
                  <td className="px-3 py-2">{proj.client}</td>
                  <td className="px-3 py-2">{proj.status}</td>
                  <td className="px-3 py-2">
                    {proj.createdAt
                      ? new Date(proj.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(proj)}
                        className="px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(proj)}
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

export default ProjectListByCategory;
