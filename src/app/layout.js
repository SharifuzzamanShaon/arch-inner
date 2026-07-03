import "./globals.css";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoader from "./_components/PageLoader";
import StickyContact from "./_components/StickyContact";

const clashGrotesk = localFont({
  src: [
    {
      path: "../../assets/fonts/ClashGrotesk-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ClashGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ClashGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ClashGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ClashGrotesk-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ClashGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
});

export const metadata = {
  title: "arch Inner",
  description: "Modern Architecture Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={clashGrotesk.variable}>
      <body className={clashGrotesk.className}>
        <PageLoader />
        <ToastContainer />
        <StickyContact />
        {children}
      </body>
    </html>
  );
}
