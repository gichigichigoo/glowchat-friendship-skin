
import React, { useEffect, useState } from 'react';
import { Product } from '../utils/productData';
import { X, CheckCircle2, ShoppingBag, Heart } from 'lucide-react';
import BadgeNotification from './BadgeNotification';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [showBadge, setShowBadge] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTryNow = () => {
    setShowBadge(true);
    setTimeout(() => setShowBadge(false), 5000);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content p-0" onClick={e => e.stopPropagation()}>
          {/* Product image */}
          <div className="relative h-64 overflow-hidden rounded-t-3xl">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-lilac-100 shimmer-effect" />
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
            />
            <button 
              className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Product content */}
          <div className="px-6 py-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {product.badges.map((badge, index) => (
                <span key={index} className="badge bg-peach-100 text-peach-700">
                  {badge}
                </span>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold font-poppins">{product.name}</h2>
            <p className="text-peach-600 font-semibold mt-1">{product.price}</p>
            
            <div className="mt-5">
              <h3 className="text-lg font-semibold mb-2">Cách sản phẩm giúp da bạn:</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mt-5">
              <h3 className="text-lg font-semibold mb-2">Thành phần nổi bật:</h3>
              <ul className="space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-lilac-500 mt-1 flex-shrink-0" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button className="btn-primary flex-1 flex items-center justify-center gap-2" onClick={handleTryNow}>
                <ShoppingBag size={18} />
                <span>Dùng thử ngay</span>
              </button>
              <button className="btn-secondary flex items-center justify-center w-12 h-12 !p-0">
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showBadge && (
        <BadgeNotification badgeText={product.badges[0]} />
      )}
    </>
  );
};

export default ProductModal;
