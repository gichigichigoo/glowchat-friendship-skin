
export type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
};

export type QuickReply = {
  id: string;
  text: string;
  emoji: string;
  concern: 'dry' | 'acne' | 'brightening';
};

// Initial greeting message
export const initialGreeting: Message = {
  id: '1',
  sender: 'bot',
  text: 'Xin chào! 💖 Hôm nay da bạn cảm thấy thế nào nè?',
  timestamp: new Date(),
};

// Quick reply options
export const quickReplies: QuickReply[] = [
  { 
    id: 'quick-1', 
    text: 'Da mình bị khô quá trời', 
    emoji: '🥺', 
    concern: 'dry' 
  },
  { 
    id: 'quick-2', 
    text: 'Nổi mụn nhiều ghê', 
    emoji: '😭', 
    concern: 'acne' 
  },
  { 
    id: 'quick-3', 
    text: 'Mình muốn da sáng hơn', 
    emoji: '✨', 
    concern: 'brightening' 
  },
];

// Follow-up responses based on concerns
export const concernResponses: Record<string, string[]> = {
  dry: [
    'Ồ! Da khô có thể do thời tiết hoặc các sản phẩm bạn đang dùng đó! 💦 Để mình gợi ý một vài sản phẩm dưỡng ẩm hiệu quả nhé!',
    'Da bạn cần được uống nước ngay! 💧 Mình có vài sản phẩm siêu cấp ẩm cho bạn này!'
  ],
  acne: [
    'Hiểu bạn lắm! Mụn đúng là khó chịu mà. 😔 Để mình giới thiệu một vài sản phẩm giúp giảm mụn và làm dịu da nhé!',
    'Đừng lo lắng nha! Mụn là chuyện bình thường của tuổi teen thôi. 🌈 Mình có những sản phẩm giúp cải thiện tình trạng mụn của bạn!'
  ],
  brightening: [
    'Da sáng như idol K-pop? 🔥 Mình hiểu bạn muốn gì rồi! Đây là những sản phẩm giúp làm sáng da an toàn và hiệu quả!',
    'Mình có những sản phẩm giúp làm đều màu da và tăng độ sáng cho bạn đây! ✨ Nhớ kết hợp với chống nắng mỗi ngày nha!'
  ],
};

// Function to get a random response from the list
export const getRandomResponse = (concern: string): string => {
  const responses = concernResponses[concern];
  if (!responses || responses.length === 0) {
    return 'Mình hiểu rồi! Để mình gợi ý một vài sản phẩm phù hợp nhé! 💕';
  }
  
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};
