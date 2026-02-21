import Header from "../_components/common/Header";
import BlogComponent from "./_components/BlogComponent";
import BlogHero from "./_components/BlogHero";

const page = () => {
  return (
    <>
      <Header />
      <BlogHero />
      <BlogComponent />
    </>
  );
};

export default page;
