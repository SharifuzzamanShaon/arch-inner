import Container from '@/app/_components/common/Container';
import Image from 'next/image';
import React from 'react';

const ProjectGallery = () => {
  // Replace these with your actual image paths
  const thumbnails = [
"/images/gallery-1.png",
"/images/gallery-2.png",
"/images/gallery-3.png",
"/images/gallery-4.png",
  ];

  return (
    <Container>        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Project Gallery
          </h2>
          <p className="text-gray-400 text-lg">
            Explore the stunning details of this project
          </p>
        </div>

        {/* Featured Main Image */}
        <div className="relative mb-10 group overflow-hidden rounded-[2rem] shadow-xl">
          <Image 
            width={1200}
            height={800} 
            src="/images/gallery-1.png" 
            alt="Main Project View" 
            className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {thumbnails.map((src, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
            >
              <Image 
                src={src}
                width={400}
                height={400} 
                alt='thumbnail'
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
    </Container>
  );
};

export default ProjectGallery;