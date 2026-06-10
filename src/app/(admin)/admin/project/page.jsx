"use client";

import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import ProjectComponent from "./_components/ProjectComponent";
import ProjectListByCategory from "./_components/ProjectListByCategory";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const getAuthHeader = () => {
  const token = Cookies.get("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const Page = () => {
  const [editingProject, setEditingProject] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/admin/project-category`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...getAuthHeader(),
          },
        });
        setCategories(res?.data?.data || res.data || []);
      } catch {}
    };
    fetchCategories();
  }, []);

  return (
    <>
      <ProjectComponent
        editingProject={editingProject}
        clearEditing={() => setEditingProject(null)}
        categories={categories}
        onCategoryAdded={(cat) => setCategories((prev) => [...prev, cat])}
      />
      <ProjectListByCategory
        onEdit={(project) => setEditingProject(project)}
        categories={categories}
        onCategoryDeleted={(id) =>
          setCategories((prev) => prev.filter((c) => c.id !== id))
        }
      />
    </>
  );
};

export default Page;
