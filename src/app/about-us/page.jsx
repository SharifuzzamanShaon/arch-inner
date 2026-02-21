import AboutDesign from "../_components/AboutDesign";
import ClientReview from "../_components/ClientReview";
import Footer from "../_components/common/Footer";
import Header from "../_components/common/Header";
import HowWeWork from "./_components/HowWeWork";
import MissionSection from "./_components/MissionSection";
import VisionSection from "./_components/VisionSection";

const page = () => {
  return (
    <>
      <Header />
      <AboutDesign />
      <ClientReview />
      <MissionSection />
      <VisionSection />
      <HowWeWork />
      <Footer />
    </>
  );
};

export default page;
