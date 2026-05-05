"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { toast } from "react-toastify";
import Container from "./common/Container";
import SectionTopTitle from "./common/SectionTopTitle";
import ProjectCard from "./ProjectCard";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("====================================");
console.log(BASE_URL);
console.log("====================================");
const PortfolioSection = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [projectsByCategory, setProjectsByCategory] = useState({});
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const portfolioRef = useRef(null);
  const tabsRef = useRef(null);
  const projectsRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Skip GSAP animations on mobile screens
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Animate the entire portfolio section
    gsap.fromTo(
      portfolioRef.current,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Animate tabs
    gsap.fromTo(
      tabsRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Animate projects
    gsap.fromTo(
      projectsRef.current,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Animate button
    gsap.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories
        const res = await axios.get(`${BASE_URL}/public/project-category`);
        if (Array.isArray(res?.data?.data) && res.data.data.length > 0) {
          setCategories(res.data.data);
        }
      } catch (error) {
        // categories remain empty
        toast.error(
          "Failed to load project categories. Please try again later.",
        );
      }
    };

    fetchCategories();
  }, []);

  // Fetch Projects by Category
  const fetchProjects = async (categoryId) => {
    if (!categoryId || projectsByCategory[categoryId]) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `${BASE_URL}/public/project-by-category/${categoryId}`,
      );

      const apiProjects = res?.data?.data?.projects;

      if (apiProjects && apiProjects.length > 0) {
        setProjectsByCategory((prev) => ({
          ...prev,
          [categoryId]: apiProjects,
        }));
      }
    } catch (error) {
      // projects remain empty for this category
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value !== "All") fetchProjects(value);
  };

  // All Projects (Flattened)
  const allProjects = useMemo(() => {
    return Object.values(projectsByCategory).flat();
  }, [projectsByCategory]);

  // Helper to render project list
  const renderProjects = (projects, categoryName = "Project") => (
    <>
      {/* Mobile Slider */}
      <div className="block md:hidden">
        <Swiper spaceBetween={16} slidesPerView={1.1}>
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 max-w-[1240px] mx-auto">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );

  return (
    <Container>
      <div ref={portfolioRef} className="text-center mt-10 sm:mt-12 md:my-15">
        <SectionTopTitle
          title="A Curated Selection of Our Interior"
          highlight="Project"
        />

        <div ref={tabsRef}>
          <Tabs defaultValue="All" onValueChange={handleTabChange}>
            {/* Tabs Header */}
            <div className="flex justify-center mb-2 md:mb-10  px-2">
              <TabsList className="flex-wrap gap-2">
                <TabsTrigger value="All">All</TabsTrigger>
                {categories.map((cat) => (
                  <TabsTrigger
                    className={"cursor-pointer"}
                    key={cat.id}
                    value={cat.id}
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* All Tab */}
            <TabsContent value="All">
              <div ref={projectsRef}>{renderProjects(allProjects)}</div>
            </TabsContent>

            {/* Category Tabs */}
            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <div ref={projectsRef}>
                  {loading && activeTab === cat.id ? (
                    <p className="text-center">Loading...</p>
                  ) : (
                    renderProjects(projectsByCategory[cat.id] || [], cat.name)
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div
          ref={buttonRef}
          className="text-center px-4 md:pt-12 hidden sm:block"
        >
          <button
            onClick={() => router.push("/portfolio")}
            className="px-6 py-2 rounded-full border cursor-pointer border-[#FE5443] text-[#FE5443] hover:border-[#FE5443] hover:bg-[#FE5443] hover:text-[#ffffff] transition-colors duration-300"
          >
            Explore all Project →
          </button>
        </div>
      </div>
    </Container>
  );
};

export default PortfolioSection;
