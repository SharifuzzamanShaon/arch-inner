import Container from "@/app/_components/common/Container";
import Image from "next/image";
import { FaMessage, FaPen, FaTruck } from "react-icons/fa6";
import { FiLayout, FiSettings } from "react-icons/fi";
import { MdCheckCircleOutline } from "react-icons/md";

const ServiceDesignProcess = () => {
  const processes = [
    {
      title: "Project Brief & Consultation",
      description: "Understand your vision, needs and budget.",
      icon: <FaMessage className="text-orange-500" size={24} />,
      align: "text-right",
      flexDir: "flex-row-reverse",
    },
    {
      title: "Concept Development",
      description: "Create design concepts, color schemes and mood boards.",
      icon: <FaPen className="text-orange-500" size={24} />,
      align: "text-left",
      flexDir: "flex-row",
    },
    {
      title: "Detailed Planning & Visualization",
      description: "Produce floor plans, 3D renderings and material boards.",
      icon: <FiLayout className="text-orange-500" size={24} />,
      align: "text-right",
      flexDir: "flex-row-reverse",
    },
    {
      title: "Design Approval & Finalization",
      description:
        "Review and finalize all design elements with your approval before execution begins.",
      icon: <MdCheckCircleOutline className="text-orange-500" size={24} />,
      align: "text-left",
      flexDir: "flex-row",
    },
    {
      title: "Final Walkthrough & Delivery",
      description: "Ensure quality and client satisfaction.",
      icon: <FaTruck className="text-orange-500" size={24} />,
      align: "text-right",
      flexDir: "flex-row-reverse",
    },
    {
      title: "Implementation & Project Management",
      description: "Oversee construction, procurement and installation.",
      icon: <FiSettings className="text-orange-500" size={24} />,
      align: "text-left",
      flexDir: "flex-row",
    },
  ];

  return (
    <Container>
      <div className="py-10 sm:py-12 md:py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 md:mb-20 text-gray-900">
          Design Process
        </h2>
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-center">
          <div className="space-y-10 sm:space-y-14 lg:space-y-24 order-1 lg:order-1">
            {[processes[0], processes[1], processes[2]].map((item, idx) => (
              <div key={idx} className="flex gap-4 flex-row text-left">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-2 lg:order-2 flex justify-center items-end lg:items-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-auto aspect-square transform scale-100 lg:scale-110 translate-y-6 sm:translate-y-8 lg:translate-y-12">
              <Image
                width={400}
                height={400}
                src="/images/design-porcess-img.png"
                alt="Room Isometric View"
              />
            </div>
          </div>
          <div className="space-y-10 sm:space-y-14 lg:space-y-24 order-3 lg:order-3">
            {[processes[3], processes[4], processes[5]].map((item, idx) => (
              <div key={idx} className="flex gap-4 flex-row text-left">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ServiceDesignProcess;
