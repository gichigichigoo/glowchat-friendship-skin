
import React, { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import StreakCounter from '@/components/StreakCounter';
import AuthScreen from '@/components/AuthScreen';
import ChatSidebar from '@/components/ChatSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { loadChatHistory, deleteChat } from '@/utils/chatHistoryService';
import { ChatHistory } from '@/components/ChatSidebar';

const Index = () => {
  const [streakCount, setStreakCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user was previously authenticated
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      
      // Simulate loading a streak count from storage
      const savedStreak = 3; // This would normally come from localStorage or API
      setStreakCount(savedStreak);
      
      // Load chat history
      const history = loadChatHistory();
      setChatHistory(history);
      
      // Show welcome toast
      setTimeout(() => {
        toast({
          title: "Chào mừng quay trở lại!",
          description: "Hãy tiếp tục hành trình chăm sóc da của bạn.",
          duration: 5000,
        });
      }, 1500);
    }
  }, [toast]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    
    // Set initial streak
    setStreakCount(3);
    
    // Load chat history
    const history = loadChatHistory();
    setChatHistory(history);
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    // In a full implementation, you would load the selected chat
    toast({
      title: "Chat selected",
      description: "This would load the selected chat in a full implementation",
      duration: 3000,
    });
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId);
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    toast({
      title: "Đã xóa cuộc trò chuyện",
      description: "Cuộc trò chuyện đã được xóa thành công",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lilac-50 to-peach-50">
      {!isAuthenticated ? (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      ) : (
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <ChatSidebar
              chatHistory={chatHistory}
              onChatSelect={handleChatSelect}
              onDeleteChat={handleDeleteChat}
              activeChatId={selectedChatId}
            />
            <main className="flex-1 max-w-lg w-full mx-auto p-4 flex flex-col">
              <ChatInterface />
              
              {streakCount > 0 && (
                <div className="mt-auto">
                  <StreakCounter streakCount={streakCount} />
                </div>
              )}
            </main>
          </div>
        </SidebarProvider>
      )}
    </div>
  );
};

export default Index;
