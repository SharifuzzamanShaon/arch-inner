import Container from "@/app/_components/common/Container";
import Image from "next/image";

const MissionSection = () => {
  return (
    <Container>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Our mission is to transform ordinary spaces into extraordinary
            experiences. At Arch Inner, we are committed to delivering
            innovative interior solutions that balance aesthetics,
            functionality, and sustainability. We believe every space has a
            story to tell, and we craft designs that honor your vision while
            exceeding expectations.
          </p>
          <button className="px-8 py-3 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-all font-medium">
            Learn More
          </button>
        </div>

        {/* Notched Image Container */}
        <div className="relative flex justify-center lg:justify-end">
          <div
            className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg"
            style={{
              clipPath:
                "polygon(0% 10%, 10% 10%, 10% 0%, 90% 0%, 90% 10%, 100% 10%, 100% 90%, 90% 90%, 90% 100%, 10% 100%, 10% 90%, 0% 90%)",
            }}
          >
            <Image
              src="/images/mission-img.png" 
              alt="Interior Design Sketch"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MissionSection;
