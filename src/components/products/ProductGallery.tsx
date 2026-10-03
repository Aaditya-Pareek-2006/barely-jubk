import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  return (
    <div className="space-y-4">
      {/* Main Selected Display */}
      <div className="relative aspect-square bg-paper-dark border-3 border-brand-black shadow-brutal overflow-hidden">
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnail Selector */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 bg-paper-dark border-2 border-brand-black flex-shrink-0 transition-all ${
                selectedImage === img
                  ? 'border-brand-orange shadow-brutal-sm scale-105'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${productName} thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
