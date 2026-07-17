"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "./common/Container";
import ShowcaseProjectCard from "./ShowcaseProjectCard";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ShowcaseProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/public/project`);
        const data = res?.data?.data;
        const list = Array.isArray(data) ? data : data?.projects;
        if (Array.isArray(list) && list.length > 0) {
          setProjects(
            list.map((p) => ({
              ...p,
              image: p.thumbnail
                ? p.thumbnail.startsWith("http")
                  ? p.thumbnail
                  : `${BASE_URL}${p.thumbnail}`
                : null,
              category: p.project_category?.name || p.category || "Interior",
            })),
          );
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading || !projects.length) return null;

  return (
    <Container>
      <div className="pt-10 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16">
        <h2 className="text-xl  md:text-5xl font-bold text-center md:mb-12 text-gray-900">
          Showcase Projects
        </h2>

        <div className="relative px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".showcase-swiper-button-next",
              prevEl: ".showcase-swiper-button-prev",
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            centeredSlides={true}
            allowTouchMove={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: { enabled: true },
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
                autoplay: { enabled: true },
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 30,
                autoplay: { enabled: true },
              },
            }}
            className="showcaseSwiper"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ShowcaseProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation arrows */}
          <button className="showcase-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#FE5443] p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="showcase-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#FE5443] p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ShowcaseProject;
