import Container from "@/app/_components/common/Container";
import Image from "next/image";

const VisionSection = () => {
  return (
    <Container>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
        {/* Notched Image Container */}
        <div className="relative flex justify-center lg:justify-start">
          <div
            className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg"
            style={{
              clipPath:
                "polygon(0% 10%, 10% 10%, 10% 0%, 90% 0%, 90% 10%, 100% 10%, 100% 90%, 90% 90%, 90% 100%, 10% 100%, 10% 90%, 0% 90%)",
            }}
          >
            <Image
              src="/images/vision-img.png" 
              alt="Interior Design Vision"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-gray-900">Our Vision</h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Our vision is to become a leading name in interior design, recognized for excellence,
            integrity, and innovation. We aspire to set new standards in the industry by
            continuously pushing creative boundaries and embracing sustainable practices. At
            Arch Inner, we envision a future where every project we undertake becomes a
            benchmark of quality and a testament to the power of thoughtful design. We strive
            to build lasting relationships with clients, turning their dreams into beautifully
            realized spaces.
          </p>
          <button className="px-8 py-3 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-all font-medium">
            Learn More
          </button>
        </div>
      </div>
    </Container>
  );
};

export default VisionSection;