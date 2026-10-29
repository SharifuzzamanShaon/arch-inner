import Footer from "../_components/common/Footer";
import Header from "../_components/common/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
