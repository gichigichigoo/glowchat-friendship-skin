
import React, { useState } from 'react';
import { Search, X, MessageCircle, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator
} from "@/components/ui/sidebar";

export type ChatHistory = {
  id: string;
  title: string;
  date: Date;
  preview: string;
  hasImage: boolean;
  imageUrl?: string;
  category: 'skin-analysis' | 'product-suggestion' | 'general';
}

interface ChatSidebarProps {
  chatHistory: ChatHistory[];
  onChatSelect: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  activeChatId?: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  chatHistory, 
  onChatSelect, 
  onDeleteChat,
  activeChatId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filteredChats = chatHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    chat.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group chats by category
  const groupedChats = filteredChats.reduce((groups, chat) => {
    const group = groups[chat.category] || [];
    group.push(chat);
    groups[chat.category] = group;
    return groups;
  }, {} as Record<string, ChatHistory[]>);
  
  const formatCategory = (category: string) => {
    switch(category) {
      case 'skin-analysis': return 'Phân tích da';
      case 'product-suggestion': return 'Gợi ý sản phẩm';
      case 'general': return 'Trò chuyện chung';
      default: return category;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold flex-1">Lịch sử trò chuyện</h2>
          <SidebarTrigger className="md:hidden" />
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-2.5 top-2.5 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {Object.keys(groupedChats).length > 0 ? (
          Object.entries(groupedChats).map(([category, chats]) => (
            <div key={category} className="mb-4">
              <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                {formatCategory(category)}
              </div>
              <SidebarMenu>
                {chats.map(chat => (
                  <SidebarMenuItem key={chat.id}>
                    {confirmDelete === chat.id ? (
                      <div className="bg-red-50 p-3 rounded-md space-y-2">
                        <p className="text-sm text-red-600">Xóa cuộc trò chuyện này?</p>
                        <div className="flex gap-2">
                          <button 
                            className="px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700"
                            onClick={() => {
                              onDeleteChat(chat.id);
                              setConfirmDelete(null);
                            }}
                          >
                            Xóa
                          </button>
                          <button 
                            className="px-3 py-1 text-xs bg-gray-200 rounded-md hover:bg-gray-300"
                            onClick={() => setConfirmDelete(null)}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className={`relative rounded-md p-2 hover:bg-lilac-50 cursor-pointer ${activeChatId === chat.id ? 'bg-lilac-100' : ''}`}
                        onClick={() => onChatSelect(chat.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-lilac-200 flex items-center justify-center mr-2">
                            <MessageCircle size={16} className="text-lilac-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <span className="font-medium truncate">{chat.title}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {formatDate(chat.date)}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{chat.preview}</p>
                          </div>
                        </div>
                        <button 
                          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDelete(chat.id);
                          }}
                        >
                          <X size={16} className="text-muted-foreground hover:text-red-500" />
                        </button>
                        {chat.hasImage && (
                          <div className="absolute right-7 bottom-2">
                            <span className="text-xs bg-lilac-100 p-1 rounded text-lilac-700">🖼️</span>
                          </div>
                        )}
                      </div>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <SidebarSeparator className="my-2" />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center p-4">
            <MessageCircle size={40} className="text-muted-foreground mb-2 opacity-30" />
            <p className="text-muted-foreground">Không tìm thấy cuộc trò chuyện nào</p>
            {searchTerm && (
              <button 
                className="mt-2 text-sm text-lilac-600"
                onClick={() => setSearchTerm('')}
              >
                Xóa tìm kiếm
              </button>
            )}
          </div>
        )}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <p className="text-xs text-muted-foreground text-center">
            Tất cả các cuộc trò chuyện đều được lưu tự động
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatSidebar;
