'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { galleryImages } from '@/data/demoData';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
}

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen">
     
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 to-orange-600/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>

        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Gallery</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore our campus life and facilities through our photo gallery
          </p>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">


        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Campus Gallery</h2>
            <p className="text-xl text-gray-600">Get a glimpse of our vibrant learning environment</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group cursor-pointer overflffow-hidden rounded-lg shadow-lg"
                onClick={() => openModal(image)}
              >
                <div className="aspect-w-16 aspect-h-12">
                  <div className="w-full h-64 relative overflow-hidden">
                    <Image 
                      src={image.imageUrl} 
                      alt={image.title} 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                
        
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold">{image.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Image Container */}
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative">
                <div className="w-full h-96 md:h-[500px] relative">
                  <Image 
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.title} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                </div>
              </div>

              {/* Image Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600">
                  Experience the vibrant atmosphere and modern facilities at FIBS College. 
                  Our campus provides an ideal learning environment for students pursuing excellence 
                  in driving and technical education.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
