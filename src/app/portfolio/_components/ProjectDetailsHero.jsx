import Image from 'next/image';
import React from 'react';
import { FaCalendar, FaClock, FaHouseMedical, FaLightbulb, FaUser } from 'react-icons/fa6';
const ProjectDetailsHero = () => {
  const details = [
    { label: 'TYPE', value: 'Residential', icon: <FaHouseMedical size={16} /> },
    { label: 'ARCHITECT', value: 'Themelexus', icon: <FaUser size={16} /> },
    { label: 'CLIENT', value: 'David', icon: <FaUser size={16} /> },
    { label: 'DURATION', value: '9 months', icon: <FaClock size={16} /> },
    { label: 'STRATEGY', value: 'Minimalistic', icon: <FaLightbulb size={16} /> },
    { label: 'DATE', value: '06/12/25 - 06/12/25', icon: <FaCalendar size={16} /> },
  ];

  return (
    <section className="bg-[#f8f7f5] p-8 md:p-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text & Details */}
        <div className="space-y-8">
          <div>
            <span className="text-#FE5443 uppercase tracking-widest text-xs font-bold">Featured Project</span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4 leading-tight">
              The Serenity <br />
              <span className="text-#FE5443">House</span>
            </h1>
            <p className="text-gray-500 mt-6 max-w-md leading-relaxed">
              A contemporary residential masterpiece blending minimalist aesthetics with functional elegance. 
              This project showcases our commitment to creating spaces that inspire daily living.
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.map((item, index) => (
              <div key={index} className="bg-white/50 border border-orange-100 p-5 rounded-2xl flex flex-col gap-2 shadow-sm">
                <div className="flex items-center gap-2 text-orange-400">
                  {item.icon}
                  <span className="text-[10px] font-bold tracking-tighter text-gray-400 uppercase">{item.label}</span>
                </div>
                <span className="text-gray-800 font-bold text-lg">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image with "Notched" Border */}
        <div className="relative group">
          {/* Custom Shape Container */}
          <div 
            className="relative overflow-hidden rounded-[2rem] bg-gray-200"
          >
            <Image
              src="/images/details-hero.png" 
              width={600}
              height={600}
              alt="Interior Design" 
              className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Subtle background glow or frame if desired */}
          <div className="absolute -inset-4 bg-orange-100/30 -z-10 rounded-[3rem] blur-2xl"></div>
        </div>

      </div>
    </section>
  );
};

export default ProjectDetailsHero;