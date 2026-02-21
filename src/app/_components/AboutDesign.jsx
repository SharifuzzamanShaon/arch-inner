import Image from "next/image";
import BtnSecondary from "./common/BtnSecondary";
import Container from "./common/Container";
import SectionTitle from "./common/SectionTitle";

const AboutDesign = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row items-center pt-24 md:pt-15 lg:items-center gap-8 sm:gap-10 lg:gap-13 relative">
        <div className="flex flex-col flex-1 gap-4 sm:gap-5 md:gap-6 w-full lg:max-w-xl order-1 lg:order-1">
          <SectionTitle
            title="Design Rooted in Craft, "
            titleHighlight="Materiality and Emotion"
            subtitle="At Arch Inner, we blend architecture and interior design seamlessly. We don't just decorate within boundaries-we reimagine them. Our studio specializes in creating spaces that feel both deeply personal and effortlessly elegant, where every detail serves a purpose."
          />
          <div className="flex gap-3 sm:gap-4">
            <BtnSecondary text="Learn More" />
          </div>
        </div>
        <div className="flex-1 relative w-full min-w-0 order-2 lg:order-2">
          <Image
            src="/images/hero-image.png"
            alt="Modern Architecture"
            width={600}
            height={400}
            className="rounded-xl sm:rounded-2xl object-cover w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
          <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xs sm:text-sm text-gray-400">
            Scroll Down
          </span>
        </div>
      </div>
    </Container>
  );
};

export default AboutDesign;
