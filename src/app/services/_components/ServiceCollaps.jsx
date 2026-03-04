"use client";
import Container from "@/app/_components/common/Container";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { toast } from "react-toastify";

// Dummy data fallback
const dummyServices = [
  {
    id: "dummy-1",
    name: "Web Development",
    thumbnail: "/images/service-collaps-img.png",
    details: [
      {
        title: "Frontend Development",
        description:
          "Creating responsive and interactive user interfaces using modern frameworks like React, Vue, and Angular.",
      },
      {
        title: "Backend Development",
        description:
          "Building robust server-side applications with Node.js, Python, and database integration.",
      },
    ],
  },
  {
    id: "dummy-2",
    name: "Mobile App Development",
    thumbnail: "/images/service-collaps-img.png",
    details: [
      {
        title: "iOS Development",
        description:
          "Native iOS app development using Swift and SwiftUI for optimal performance and user experience.",
      },
      {
        title: "Android Development",
        description:
          "Creating Android applications with Kotlin and Jetpack Compose for modern mobile experiences.",
      },
      {
        title: "Cross-Platform",
        description:
          "Developing apps for both iOS and Android using React Native and Flutter for cost-effective solutions.",
      },
    ],
  },
];

const ServiceCollaps = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/public/services`,
        );

        setServices([...response?.data.data]);
        toast.success("Services loaded successfully");
      } catch {
        setServices(dummyServices);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <Container>
      <div className="py-10 sm:py-12 md:py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-14 md:mb-16 text-gray-900">
          Services
        </h2>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        ) : services.length > 0 ? (
          <>
            {error && (
              <div className="text-center py-4 mb-8">
                <p className="text-orange-600 bg-orange-50 px-4 py-2 rounded-lg inline-block">
                  {error}
                </p>
              </div>
            )}
            <div className="space-y-12 lg:space-y-16">
              {services.map((service, serviceIndex) => (
                <div
                  key={service.id || serviceIndex}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
                >
                  {/* Left Side: Service Image */}
                  <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] max-w-xl mx-auto w-full">
                    <Image
                      width={1200}
                      height={800}
                      src={
                        service.thumbnail || "/images/service-collaps-img.png"
                      }
                      alt={`${service.name} Image`}
                      className="w-full h-full object-cover"
                      unoptimized
                      onError={(e) => {
                        e.target.src = "/images/service-collaps-img.png";
                      }}
                    />
                  </div>

                  {/* Right Side: Service Accordion */}
                  <div className="space-y-2">
                    {/* Service Name Header */}
                    <div className="mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {service.name}
                      </h3>
                    </div>

                    {/* Service Details */}
                    {service.details?.map((detail, detailIndex) => (
                      <div
                        key={`${service.id}-${detailIndex}`}
                        className="border-b border-orange-200 last:border-0"
                      >
                        <button
                          onClick={() =>
                            setOpenIndex(
                              openIndex === `${serviceIndex}-${detailIndex}`
                                ? -1
                                : `${serviceIndex}-${detailIndex}`,
                            )
                          }
                          className="w-full py-3 sm:py-4 flex justify-between items-center text-left hover:text-orange-500 transition-colors"
                        >
                          <span
                            className={`text-lg md:text-xl font-semibold ${openIndex === `${serviceIndex}-${detailIndex}` ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {detail.title}
                          </span>
                          {openIndex === `${serviceIndex}-${detailIndex}` ? (
                            <FaChevronUp className="text-orange-500" />
                          ) : (
                            <FaChevronDown className="text-orange-400" />
                          )}
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${openIndex === `${serviceIndex}-${detailIndex}` ? "max-h-[260px] sm:max-h-[300px] md:max-h-40 pb-4 sm:pb-6" : "max-h-0"}`}
                        >
                          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg whitespace-pre-line">
                            {detail.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-red-600">No services available</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ServiceCollaps;
