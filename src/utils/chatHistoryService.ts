
import { ChatHistory } from '@/components/ChatSidebar';

// Simulated chat history for initial testing
const sampleChatHistory: ChatHistory[] = [
  {
    id: '1',
    title: 'Phân tích da khô',
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    preview: 'Da mình bị khô quá trời',
    hasImage: false,
    category: 'skin-analysis'
  },
  {
    id: '2',
    title: 'Gợi ý sản phẩm dưỡng ẩm',
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    preview: 'Đây là những sản phẩm giúp cấp ẩm hiệu quả cho da bạn',
    hasImage: true,
    imageUrl: '/placeholder.svg',
    category: 'product-suggestion'
  },
  {
    id: '3',
    title: 'Làm sáng da',
    date: new Date(new Date().setDate(new Date().getDate() - 10)),
    preview: 'Mình muốn da sáng hơn',
    hasImage: false,
    category: 'skin-analysis'
  }
];

// Load chat history from localStorage
export const loadChatHistory = (): ChatHistory[] => {
  try {
    const savedChats = localStorage.getItem('chatHistory');
    if (savedChats) {
      // Convert string dates back to Date objects
      const parsedChats = JSON.parse(savedChats);
      return parsedChats.map((chat: any) => ({
        ...chat,
        date: new Date(chat.date)
      }));
    }
    // If no history is found, save the sample data and return it
    saveChatHistory(sampleChatHistory);
    return sampleChatHistory;
  } catch (error) {
    console.error('Failed to load chat history:', error);
    return sampleChatHistory;
  }
};

// Save chat history to localStorage
export const saveChatHistory = (chatHistory: ChatHistory[]): void => {
  try {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
};

// Add a new chat to history
export const addChat = (
  title: string, 
  preview: string, 
  category: 'skin-analysis' | 'product-suggestion' | 'general',
  hasImage = false,
  imageUrl?: string
): ChatHistory => {
  const history = loadChatHistory();
  
  const newChat: ChatHistory = {
    id: Date.now().toString(),
    title,
    date: new Date(),
    preview,
    hasImage,
    imageUrl,
    category
  };
  
  const updatedHistory = [newChat, ...history];
  saveChatHistory(updatedHistory);
  
  return newChat;
};

// Delete a chat from history
export const deleteChat = (chatId: string): void => {
  const history = loadChatHistory();
  const updatedHistory = history.filter(chat => chat.id !== chatId);
  saveChatHistory(updatedHistory);
};
