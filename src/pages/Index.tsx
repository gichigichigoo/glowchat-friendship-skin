
import React, { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import StreakCounter from '@/components/StreakCounter';
import AuthScreen from '@/components/AuthScreen';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [streakCount, setStreakCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user was previously authenticated
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      
      // Simulate loading a streak count from storage
      const savedStreak = 3; // This would normally come from localStorage or API
      setStreakCount(savedStreak);
      
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lilac-50 to-peach-50 flex flex-col">
      {!isAuthenticated ? (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      ) : (
        <div className="flex-1 max-w-lg w-full mx-auto p-4 flex flex-col">
          <ChatInterface />
          
          {streakCount > 0 && (
            <div className="mt-auto">
              <StreakCounter streakCount={streakCount} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
