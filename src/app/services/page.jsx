import ClientReview from "../_components/ClientReview";
import Footer from "../_components/common/Footer";
import Header from "../_components/common/Header";
import ShowcaseProject from "../_components/ShowcaseProject";
import ServiceCollaps from "./_components/ServiceCollaps";
import ServiceConsultForm from "./_components/ServiceConsultForm";
import ServiceDesignProcess from "./_components/ServiceDesignProcess";
import ServiceHero from "./_components/ServiceHero";

const page = () => {
  return (
    <>
      <Header />
      <ServiceHero />
      <ServiceCollaps />
      <ServiceDesignProcess />
      <ShowcaseProject />
      <ServiceConsultForm />
      <ClientReview />
      <Footer />
    </>
  );
};

export default page;
