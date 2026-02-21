import Header from "./_components/common/Header";
import "./globals.css";
import localFont from 'next/font/local'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const clashGrotesk = localFont({
  src: '../../assets/fonts/ClashGrotesk-Regular.otf',
  weight: '400',
  style: 'normal',
  variable: '--font-clash',
})

export const metadata = {
  title: "Arch Inner",
  description: "Modern Architecture Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${clashGrotesk.className}`}
      >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
