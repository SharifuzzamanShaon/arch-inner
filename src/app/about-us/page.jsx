import AboutDesign from "../_components/AboutDesign";
import ClientReview from "../_components/ClientReview";
import Footer from "../_components/common/Footer";
import Header from "../_components/common/Header";
import HowWeWork from "./_components/HowWeWork";
import MissionSection from "./_components/MissionSection";
import OurTeam from "./_components/OurTeam";
const page = () => {
  return (
    <>
      <Header />
      {/* <AboutDesign /> */}
      {/* <ClientReview /> */}
      <MissionSection />
      <HowWeWork />
      <OurTeam />
      <Footer />
    </>
  );
};

export default page;
