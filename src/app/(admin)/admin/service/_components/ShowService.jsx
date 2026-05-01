"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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

  const fetchAllServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/admin/service`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...getAuthHeader(),
        },
      });
      const data =
        res?.data?.data?.services || res?.data?.data || res?.data || [];
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Services fetch error:", err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  useEffect(() => {
    if (onRefreshReady && !refreshReadyCalled.current) {
      onRefreshReady(fetchAllServices);
      refreshReadyCalled.current = true;
    }
  });

  const handleDeleteService = async (service) => {
    if (!service?.id) return;
    const ok = window.confirm("Are you sure you want to delete this service?");
    if (!ok) return;
    try {
      await axios.delete(`${API_BASE}/admin/service/delete/${service.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...getAuthHeader(),
        },
      });
      setServices((prev) => prev.filter((s) => s.id !== service.id));
      toast.success("Service deleted.");
    } catch (err) {
      toast.error(
        "Delete service error: " +
          (err?.response?.data?.message || err.message),
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6 mt-10">
      <h2 className="text-xl font-semibold">All Services</h2>

      <div className="border-t pt-4 overflow-x-auto">
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
                        onClick={() => handleDeleteService(service)}
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

export default ShowService;
