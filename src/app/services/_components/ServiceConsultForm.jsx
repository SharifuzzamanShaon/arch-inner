import Container from '@/app/_components/common/Container';
import Image from 'next/image';
import React from 'react';
import { FaArrowRight, FaCheck } from 'react-icons/fa6';

const ServiceConsultForm = () => {
  const benefits = [
    "Personalized Interior Design Advice",
    "Expert Space Planning Guidance",
    "Material And Finish Recommendations",
    "Budget And Timeline Clarity"
  ];

  return (
    <section className="relative min-h-[560px] md:min-h-[700px] w-full flex items-center mt-16 sm:mt-20">
      {/* Background Image */}
      <Image 
        src="/images/contact-img-1.png"
        alt="Interior Design Background"
        fill
        className="absolute inset-0 object-cover -z-10"
        priority
      />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] -z-10"></div>

      <Container>
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 sm:py-14 md:py-16">
        
        {/* Left Side: Content */}
        <div className="text-white max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-500 bg-black/20 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            Free Consultation
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6">
            Start Your <span className="text-orange-500">Interior</span><br />
            Design journey Today
          </h2>
          
          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-lg">
            Schedule a free consultation with Arch Inner to explore your interior design goals. 
            Our team listens carefully to your needs while evaluating style, space and functionality.
          </p>

          <ul className="space-y-4">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-200">
                <FaCheck size={18} className="text-orange-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Glassmorphism Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
          <form className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Message</label>
              <textarea 
                rows="4"
                placeholder="Tell us about your project"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              ></textarea>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange-500/30">
              Consultation Now
              <FaArrowRight size={20} />
            </button>
          </form>
        </div>

        </div>
      </Container>
    </section>
  );
};


export default ServiceConsultForm