"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const getAuthHeader = () => {
  const token = Cookies.get("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ShowService = ({ onEdit, onRefreshReady }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const refreshReadyCalled = useRef(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/admin/service`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...getAuthHeader(),
        },
      });
      // backend returns { success, message, data: [...] }
      const data = res?.data?.data || [];
      setServices(data);
    } catch (err) {
      console.error("Failed to load services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Expose refresh function to parent (only once)
  useEffect(() => {
    if (onRefreshReady && !refreshReadyCalled.current) {
      onRefreshReady(fetchServices);
      refreshReadyCalled.current = true;
    }
  }, [onRefreshReady]);

  return (
    <div className="mt-10 bg-white rounded-xl shadow p-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Services</h2>
        <button
          type="button"
          onClick={fetchServices}
          className="text-sm px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-sm text-gray-500">No services found.</p>
      ) : (
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 text-xs uppercase tracking-wide">
              <th className="px-3 py-2 font-semibold">Thumbnail</th>
              <th className="px-3 py-2 font-semibold">Name</th>
              <th className="px-3 py-2 font-semibold">Details count</th>
              <th className="px-3 py-2 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b hover:bg-gray-50 last:border-b-0"
              >
                <td className="px-3 py-2">
                  {service.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={service.thumbnail}
                      alt={service.name}
                      className="w-16 h-12 object-cover rounded-md border"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-3 py-2">{service.name}</td>
                <td className="px-3 py-2">
                  {Array.isArray(service.details)
                    ? service.details.length
                    : 0}
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => {
                        if (onEdit) onEdit(service);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                      onClick={async () => {
                        const ok = window.confirm(
                          "Are you sure you want to delete this service?"
                        );
                        if (!ok) return;
                        try {
                          await axios.delete(
                            `${API_BASE}/admin/service/delete/${service.id}`,
                            {
                              headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                ...getAuthHeader(),
                              },
                            }
                          );
                          setServices((prev) =>
                            prev.filter((s) => s.id !== service.id)
                          );
                        } catch (err) {
                          console.error("Failed to delete service", err);
                        }
                      }}
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
  );
};

export default ShowService;
