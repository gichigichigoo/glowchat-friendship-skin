
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MessageFeedbackProps {
  messageId: string;
  messageType: 'result' | 'product';
  onFeedback: (feedback: 'like' | 'dislike') => void;
}

const MessageFeedback: React.FC<MessageFeedbackProps> = ({
  messageId,
  messageType,
  onFeedback,
}) => {
  const [selectedFeedback, setSelectedFeedback] = useState<'like' | 'dislike' | null>(null);
  const { toast } = useToast();

  const handleFeedback = (type: 'like' | 'dislike') => {
    if (selectedFeedback === type) {
      return;
    }

    setSelectedFeedback(type);
    onFeedback(type);

    const isLike = type === 'like';
    
    toast({
      title: isLike ? "Cảm ơn phản hồi tích cực! 🌟" : "Cảm ơn phản hồi của bạn",
      description: isLike 
        ? "Chúng tôi rất vui khi điều này hữu ích với bạn"
        : "Chúng tôi sẽ cải thiện dựa trên phản hồi của bạn",
      duration: 3000,
    });
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={() => handleFeedback('like')}
        className={`p-1.5 rounded-full transition-all duration-200 hover:bg-green-50 ${
          selectedFeedback === 'like' ? 'text-green-500 scale-110' : 'text-gray-400'
        }`}
        aria-label="Like"
      >
        <ThumbsUp size={16} />
      </button>
      <button
        onClick={() => handleFeedback('dislike')}
        className={`p-1.5 rounded-full transition-all duration-200 hover:bg-red-50 ${
          selectedFeedback === 'dislike' ? 'text-red-500 scale-110' : 'text-gray-400'
        }`}
        aria-label="Dislike"
      >
        <ThumbsDown size={16} />
      </button>
    </div>
  );
};

export default MessageFeedback;
