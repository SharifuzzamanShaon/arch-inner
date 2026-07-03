import ClientReview from "./_components/ClientReview";
import HeroSectionSecondary from "./_components/HeroSectionSecondary";
import PortfolioSection from "./_components/PortfolioSection";
import ServiceSection from "./_components/ServiceSection";
import StatsSection from "./_components/StateSection";
import TestimonialSection from "./_components/Testimonial";
import NewsSection from "./_components/NewsSection";
import Footer from "./_components/common/Footer";
import Header from "./_components/common/Header";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSectionSecondary />
      <div data-nav-title="By The Numbers">
        <StatsSection />
      </div>
      <div data-nav-title="Selected Works">
        <PortfolioSection />
      </div>
      {/* <ServiceSection /> */}
      <div data-nav-title="Clients">
        <ClientReview />
      </div>
      <div data-nav-title="Testimonials">
        <TestimonialSection />
      </div>
      <div data-nav-title="News">
        <NewsSection />
      </div>
      <Footer />
    </>
  );
}
