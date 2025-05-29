
import React from 'react';

const LoadingBubble: React.FC = () => {
  return (
    <div className="chat-bubble-bot animate-bounce-in">
      <div className="flex items-center space-x-1.5 py-1">
        <div className="w-2 h-2 bg-lilac-600 rounded-full animate-pulse-dot delay-0"></div>
        <div className="w-2 h-2 bg-lilac-600 rounded-full animate-pulse-dot delay-150"></div>
        <div className="w-2 h-2 bg-lilac-600 rounded-full animate-pulse-dot delay-300"></div>
      </div>
    </div>
  );
};

export default LoadingBubble;
