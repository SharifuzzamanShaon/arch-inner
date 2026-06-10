import React from "react";
import ContactHero from "./_components/ContactHero";
import ContactForm from "./_components/ContactForm";
import Footer from "../_components/common/Footer";
import Header from "../_components/common/Header";
const page = () => {
  return (
    <>
      <Header />
      <ContactForm />
      {/* <MapComponent/> */}
      <Footer />
    </>
  );
};

export default page;
