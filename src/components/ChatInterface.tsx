
import React, { useState, useEffect, useRef } from 'react';
import { Message, QuickReply, initialGreeting, quickReplies, getRandomResponse } from '../utils/chatMessages';
import { getProductsByConcern } from '../utils/productData';
import { getSkinAnalysisByConcern } from '../utils/skinAnalysisData';
import ProductCard from './ProductCard';
import SkinAnalysisReport from './SkinAnalysisReport';
import ChatInputBox from './ChatInputBox';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [showAnalysisReport, setShowAnalysisReport] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState<'dry' | 'acne' | 'brightening' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showAnalysisReport]);

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: `${reply.text} ${reply.emoji}`,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowQuickReplies(false);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: getRandomResponse(reply.concern),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setSelectedConcern(reply.concern);
      
      setTimeout(() => {
        const analysisMessage: Message = {
          id: `bot-analysis-${Date.now()}`,
          sender: 'bot',
          text: 'Dựa vào thông tin bạn cung cấp, mình đã phân tích làn da của bạn. Hãy xem báo cáo chi tiết dưới đây nhé! ✨',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, analysisMessage]);
        
        setTimeout(() => {
          setShowAnalysisReport(true);
          
          setTimeout(() => {
            const productMessage: Message = {
              id: `bot-product-${Date.now()}`,
              sender: 'bot',
              text: 'Và đây là những sản phẩm mình đề xuất phù hợp với tình trạng da của bạn:',
              timestamp: new Date(),
            };
            
            setMessages(prev => [...prev, productMessage]);
            setShowProducts(true);
          }, 1500);
        }, 800);
      }, 1500);
    }, 1000);
  };

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    if (!selectedConcern) {
      let detectedConcern: 'dry' | 'acne' | 'brightening' | null = null;
      
      if (text.toLowerCase().includes('khô') || text.toLowerCase().includes('kho')) {
        detectedConcern = 'dry';
      } else if (text.toLowerCase().includes('mụn') || text.toLowerCase().includes('mun')) {
        detectedConcern = 'acne';
      } else if (text.toLowerCase().includes('sáng') || text.toLowerCase().includes('sang')) {
        detectedConcern = 'brightening';
      } else {
        detectedConcern = 'dry';
      }
      
      setTimeout(() => {
        const botResponse: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: getRandomResponse(detectedConcern),
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botResponse]);
        setSelectedConcern(detectedConcern);
        
        setTimeout(() => {
          const analysisMessage: Message = {
            id: `bot-analysis-${Date.now()}`,
            sender: 'bot',
            text: 'Dựa vào thông tin bạn cung cấp, mình đã phân tích làn da của bạn. Hãy xem báo cáo chi tiết dưới đây nhé! ✨',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, analysisMessage]);
          
          setTimeout(() => {
            setShowAnalysisReport(true);
            
            setTimeout(() => {
              const productMessage: Message = {
                id: `bot-product-${Date.now()}`,
                sender: 'bot',
                text: 'Và đây là những sản phẩm mình đề xuất phù hợp với tình trạng da của bạn:',
                timestamp: new Date(),
              };
              
              setMessages(prev => [...prev, productMessage]);
              setShowProducts(true);
            }, 1500);
          }, 800);
        }, 1500);
      }, 1000);
      
      return;
    }
    
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Cảm ơn bạn đã chia sẻ thêm! Mình sẽ kết hợp thông tin này vào phân tích để cung cấp kết quả chính xác hơn trong lần sau nhé! 💖',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSendImage = (file: File) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: '🖼️ [Hình ảnh da của bạn]',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const analysisMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Cảm ơn bạn đã gửi hình ảnh. Mình đang phân tích làn da của bạn...',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, analysisMessage]);
      
      setTimeout(() => {
        const resultMessage: Message = {
          id: `bot-result-${Date.now()}`,
          sender: 'bot',
          text: 'Dựa trên hình ảnh, mình nhận thấy làn da của bạn có dấu hiệu của da khô. Mình sẽ đưa ra phân tích chi tiết ngay đây!',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, resultMessage]);
        setSelectedConcern('dry');
        
        setTimeout(() => {
          setShowAnalysisReport(true);
          
          setTimeout(() => {
            const productMessage: Message = {
              id: `bot-product-${Date.now()}`,
              sender: 'bot',
              text: 'Và đây là những sản phẩm mình đề xuất phù hợp với tình trạng da của bạn:',
              timestamp: new Date(),
            };
            
            setMessages(prev => [...prev, productMessage]);
            setShowProducts(true);
          }, 1500);
        }, 800);
      }, 2000);
    }, 1000);
    
    toast({
      title: "Hình ảnh đã được tải lên",
      description: "Chúng tôi đang phân tích làn da của bạn từ hình ảnh.",
    });
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="bg-lilac-500 text-white p-4 rounded-b-2xl shadow-lg mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg">✨</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold">GlowUp</h1>
            <p className="text-xs opacity-80">Chuyên gia chăm sóc da của bạn</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 mb-20">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.sender === 'bot' ? 'chat-bubble-bot' : 'chat-bubble-user'}
          >
            {message.text}
          </div>
        ))}
        
        {showQuickReplies && (
          <div className="py-4 px-2">
            <Carousel className="w-full">
              <CarouselContent>
                {quickReplies.map((reply) => (
                  <CarouselItem key={reply.id} className="basis-auto">
                    <button
                      className="quick-reply-btn animate-pulse-subtle whitespace-nowrap"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply.text} {reply.emoji}
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-white/80" />
              <CarouselNext className="right-0 bg-white/80" />
            </Carousel>
          </div>
        )}
        
        {showAnalysisReport && selectedConcern && (
          <div className="my-6">
            <SkinAnalysisReport data={getSkinAnalysisByConcern(selectedConcern)} />
          </div>
        )}
        
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
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 mb-2 md:max-w-lg md:mx-auto px-2">
        <ChatInputBox
          onSendMessage={handleSendMessage}
          onSendImage={handleSendImage}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
