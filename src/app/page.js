import AboutDesign from "./_components/AboutDesign";
import ClientReview from "./_components/ClientReview";
import HeroSectionSecondary from "./_components/HeroSectionSecondary";
import PortfolioSection from "./_components/PortfolioSection";
import ServiceSection from "./_components/ServiceSection";
import StatsSection from "./_components/StateSection";
import TestimonialSection from "./_components/Testimonial";
import Footer from "./_components/common/Footer";
import Header from "./_components/common/Header";

export default function Home() {
  return (
    <>
      <Header />
      {/* <HeroSection /> */}
      <HeroSectionSecondary />
      <StatsSection />
      <AboutDesign />
      <ClientReview />
      <PortfolioSection />
      <ServiceSection />
      <TestimonialSection />
      <Footer />
    </>
  );
}
