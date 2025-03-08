
import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';

interface BadgeNotificationProps {
  badgeText: string;
}

const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badgeText }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Fade in
    setIsVisible(true);
    
    // Fade out after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible && !badgeText) return null;
  
  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 animate-bounce-in">
        <div className="w-10 h-10 rounded-full bg-lilac-100 flex items-center justify-center">
          <Award className="text-lilac-600" size={22} />
        </div>
        <div>
          <div className="text-xs text-gray-500 font-medium">Bạn vừa nhận được huy hiệu</div>
          <div className="font-semibold text-sm">{badgeText}</div>
        </div>
      </div>
    </div>
  );
};

export default BadgeNotification;
