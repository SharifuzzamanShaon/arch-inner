import Header from "../_components/common/Header";
import BlogComponent from "../blogs/_components/BlogComponent";

export const metadata = {
  title: "News & Insights — arch Inner",
  description:
    "Design thinking, project insights, and studio notes from arch Inner.",
};

const NewsPage = () => {
  return (
    <>
      <Header />
      <BlogComponent />
    </>
  );
};

export default NewsPage;
