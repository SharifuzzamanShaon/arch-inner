import Container from "@/app/_components/common/Container";
import { FaArrowRight, FaCheck } from "react-icons/fa6";

const ServiceConsultForm = () => {
  const benefits = [
    "Personalized Interior Design Advice",
    "Expert Space Planning Guidance",
    "Material And Finish Recommendations",
    "Budget And Timeline Clarity",
  ];

  return (
    <section
      className="relative min-h-[560px] md:min-h-[700px] w-full flex items-center mt-16 sm:mt-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/contact-img-1.png')" }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] -z-10"></div>

      <Container>
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 sm:py-14 md:py-16">
          {/* Left Side: Content */}
          <div className="text-white max-w-xl">
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-normal mb-5">
              / Free Consultation
            </p>

            <h2
              className="font-normal text-white leading-tight mb-4 sm:mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
              Start Your{" "}
              <span className="text-white/40">Interior</span>
              <br />
              Design Journey
            </h2>

            <p className="text-white/50 text-sm font-normal mb-8 max-w-lg leading-relaxed">
              Schedule a free consultation with Arch Inner to explore your
              interior design goals. Our team listens carefully to your needs
              while evaluating style, space and functionality.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/60 text-sm font-normal">
                  <FaCheck size={14} className="text-white/40 shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Form */}
          <div className="bg-white/8 backdrop-blur-xl border border-white/12 p-8 md:p-10 rounded-2xl">
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-normal mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-transparent border-b border-white/15 py-3 text-sm text-white font-normal placeholder:text-white/25 focus:outline-none focus:border-white/50 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-normal mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border-b border-white/15 py-3 text-sm text-white font-normal placeholder:text-white/25 focus:outline-none focus:border-white/50 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-normal mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us about your project"
                  className="w-full bg-transparent border-b border-white/15 py-3 text-sm text-white font-normal placeholder:text-white/25 focus:outline-none focus:border-white/50 transition-colors duration-300 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-4 bg-transparent border border-white/25 hover:border-white text-white text-xs tracking-[0.25em] uppercase font-normal transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                Book Consultation
                <FaArrowRight size={12} />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceConsultForm;
