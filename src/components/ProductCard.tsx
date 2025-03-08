
import React, { useState } from 'react';
import { Product } from '../utils/productData';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <div 
        className="product-card min-w-[160px] w-[160px] cursor-pointer animate-slide-in-right"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="product-card-img bg-lilac-50 relative">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-lilac-100 rounded-xl shimmer-effect" />
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-poppins font-semibold text-sm">{product.name}</h3>
          <p className="text-peach-600 text-sm mt-1 font-medium">{product.price}</p>
          <div className="mt-2">
            <span className="badge bg-lilac-100 text-lilac-800">
              {product.category}
            </span>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <ProductModal 
          product={product} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;
