
import React, { useState, useEffect, useRef } from 'react';
import { Message, QuickReply, initialGreeting, quickReplies, getRandomResponse } from '../utils/chatMessages';
import { getProductsByConcern } from '../utils/productData';
import { getSkinAnalysisByConcern } from '../utils/skinAnalysisData';
import ProductCard from './ProductCard';
import SkinAnalysisReport from './SkinAnalysisReport';
import { MessageCircle } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [showAnalysisReport, setShowAnalysisReport] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState<'dry' | 'acne' | 'brightening' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showAnalysisReport]);

  const handleQuickReply = (reply: QuickReply) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: `${reply.text} ${reply.emoji}`,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowQuickReplies(false);
    
    // Simulate bot typing with delay
    setTimeout(() => {
      // Add bot response
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: getRandomResponse(reply.concern),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setSelectedConcern(reply.concern);
      setShowProducts(true);
      
      // Add another message after products about skin analysis
      setTimeout(() => {
        const analysisMessage: Message = {
          id: `bot-analysis-${Date.now()}`,
          sender: 'bot',
          text: 'Dựa vào thông tin bạn cung cấp, mình đã phân tích làn da của bạn. Hãy xem báo cáo chi tiết dưới đây nhé! ✨',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, analysisMessage]);
        
        // Show skin analysis report after a short delay
        setTimeout(() => {
          setShowAnalysisReport(true);
        }, 800);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto">
      {/* Chat header */}
      <div className="bg-lilac-500 text-white p-4 rounded-b-2xl shadow-lg mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold">GlowUp</h1>
            <p className="text-xs opacity-80">Chuyên gia chăm sóc da của bạn</p>
          </div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.sender === 'bot' ? 'chat-bubble-bot' : 'chat-bubble-user'}
          >
            {message.text}
          </div>
        ))}
        
        {/* Quick replies */}
        {showQuickReplies && (
          <div className="flex gap-2 overflow-x-auto py-4 px-2 after:content-[''] after:min-w-[1rem]">
            {quickReplies.map((reply) => (
              <button
                key={reply.id}
                className="quick-reply-btn animate-pulse-subtle"
                onClick={() => handleQuickReply(reply)}
              >
                {reply.text} {reply.emoji}
              </button>
            ))}
          </div>
        )}
        
        {/* Product recommendations */}
        {showProducts && selectedConcern && (
          <div className="my-6">
            <div className="mb-2 font-semibold text-sm text-lilac-700">
              Sản phẩm phù hợp cho bạn:
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 after:content-[''] after:min-w-[1rem]">
              {getProductsByConcern(selectedConcern).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
        
        {/* Skin Analysis Report */}
        {showAnalysisReport && selectedConcern && (
          <div className="my-6">
            <SkinAnalysisReport data={getSkinAnalysisByConcern(selectedConcern)} />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatInterface;
