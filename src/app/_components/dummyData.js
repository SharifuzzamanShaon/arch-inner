export const dummyCategories = [
  {
    id: "interior",
    name: "Interior",
    type: "Interior",
  },
  {
    id: "exterior",
    name: "Exterior",
    type: "Exterior",
  },
  {
    id: "commercial",
    name: "Commercial",
    type: "Commercial",
  },
];

export const dummyProjects = [
  {
    id: 1,
    title: "Modern Living Room Design",
    thumbnail: "/images/project-1.png",
    category: "interior",
    type: "Interior",
    client: "Dhaka Residence",
    strategy:
      "Contemporary design with minimalist approach focusing on space optimization and natural lighting.",
    description:
      "A stunning living room transformation featuring clean lines, neutral colors, and functional furniture.",
  },
  {
    id: 2,
    title: "Luxury Villa Exterior",
    thumbnail: "/images/project-1.png",
    category: "exterior",
    type: "Exterior",
    client: "Gulshan Heights",
    strategy:
      "Modern architectural design combining traditional elements with contemporary aesthetics.",
    description:
      "Complete exterior renovation creating a sophisticated facade with premium materials.",
  },
  {
    id: 3,
    title: "Office Space Interior",
    thumbnail: "/images/project-1.png",
    category: "commercial",
    type: "Commercial",
    client: "Corporate Hub",
    strategy: "Ergonomic design promoting productivity and employee wellbeing.",
    description:
      "Modern office interior with collaborative spaces and advanced technology integration.",
  },
  {
    id: 4,
    title: "Bedroom Makeover",
    thumbnail: "/images/project-1.png",
    category: "interior",
    type: "Interior",
    client: "Banani Apartment",
    strategy:
      "Cozy yet sophisticated design focusing on comfort and functionality.",
    description:
      "Complete bedroom renovation with custom furniture and ambient lighting.",
  },
  {
    id: 5,
    title: "Restaurant Interior",
    thumbnail: "/images/project-1.png",
    category: "commercial",
    type: "Commercial",
    client: "Downtown Dining",
    strategy: "Atmospheric design creating memorable dining experience.",
    description:
      "Themed restaurant interior with unique seating arrangements and mood lighting.",
  },
  {
    id: 6,
    title: "Garden House Exterior",
    thumbnail: "/images/project-1.png",
    category: "exterior",
    type: "Exterior",
    client: "Uttara Gardens",
    strategy:
      "Harmonious blend with natural surroundings using sustainable materials.",
    description:
      "Eco-friendly exterior design maximizing outdoor living space.",
  },
];

export const getProjectsByCategory = (categoryId) => {
  if (categoryId === "all") return dummyProjects;
  return dummyProjects.filter((project) => project.category === categoryId);
};
