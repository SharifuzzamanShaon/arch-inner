"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "./common/Container";
import ShowcaseProjectCard from "./ShowcaseProjectCard";

const ShowcaseProject = () => {
  // shocase projest
  const projects = [
    {
      title: "Interior Design for a Modern Apartment",
      description:
        "A calm, natural-toned apartment designed with soft textures and a warm modern aesthetic.",
      location: "Uttara, Dhaka",
      category: "Residential",
      image: "/images/project-1.png",
    },
    {
      title: "Luxury Villa Interior Design",
      description:
        "A calm, natural-toned apartment designed with soft textures and a warm modern aesthetic.",
      location: "Uttara, Dhaka",
      category: "Residential",
      image: "/images/project-1.png",
    },
    {
      title: "Restaurant Interior Design",
      description:
        "A calm, natural-toned apartment designed with soft textures and a warm modern aesthetic.",
      location: "Uttara, Dhaka",
      category: "Residential",
      image: "/images/project-1.png",
    },
    {
      title: "Office Space Design",
      description:
        "A modern office space with ergonomic design and collaborative work areas.",
      location: "Gulshan, Dhaka",
      category: "Commercial",
      image: "/images/project-1.png",
    },
    {
      title: "Retail Store Interior",
      description:
        "A contemporary retail space with innovative display solutions and customer flow optimization.",
      location: "Banani, Dhaka",
      category: "Commercial",
      image: "/images/project-1.png",
    },
  ];

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
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              enabled: false, // Disabled by default, will be enabled on desktop breakpoints
            }}
            loop={true}
            centeredSlides={true}
            allowTouchMove={true} // Enable swipe on mobile
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: {
                  enabled: false, // Keep disabled on mobile/tablet
                },
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: {
                  enabled: true, // Enable on desktop
                },
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
                autoplay: {
                  enabled: true, // Enable on desktop
                },
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 30,
                autoplay: {
                  enabled: true, // Enable on desktop
                },
              },
            }}
            className="showcaseSwiper"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.title}>
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
