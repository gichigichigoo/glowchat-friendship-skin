
import React, { useState, useRef } from 'react';
import { Send, Paperclip, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatInputBoxProps {
  onSendMessage: (text: string) => void;
  onSendImage: (file: File) => void;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({ onSendMessage, onSendImage }) => {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (message.trim() === '' && !selectedFile) return;

    if (selectedFile) {
      onSendImage(selectedFile);
      setPreviewImage(null);
      setSelectedFile(null);
    }

    if (message.trim() !== '') {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match('image/(jpeg|jpg|png)')) {
      toast({
        title: "⚠️ Định dạng không hỗ trợ",
        description: "Vui lòng chọn ảnh JPG hoặc PNG.",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full bg-white border-t border-lilac-200 p-4 rounded-t-2xl shadow-lg">
      {previewImage && (
        <div className="relative mb-2">
          <img 
            src={previewImage} 
            alt="Preview" 
            className="h-20 w-auto rounded-lg object-cover" 
          />
          <button 
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
            onClick={handleRemoveImage}
          >
            <AlertCircle size={16} className="text-peach-500" />
          </button>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <button 
          className="p-2 rounded-full hover:bg-lilac-100 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip size={20} className="text-lilac-500" />
        </button>
        
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleFileChange}
        />
        
        <input
          type="text"
          placeholder="Nhập tin nhắn hoặc tải ảnh da của bạn lên 📸"
          className="flex-1 p-3 rounded-full border border-lilac-200 focus:outline-none focus:border-lilac-400 focus:ring-1 focus:ring-lilac-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        <button 
          className={`p-3 rounded-full transition-colors ${
            message.trim() || selectedFile 
              ? 'bg-lilac-500 text-white hover:bg-lilac-600' 
              : 'bg-lilac-200 text-lilac-400 cursor-not-allowed'
          }`}
          onClick={handleSendMessage}
          disabled={!message.trim() && !selectedFile}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInputBox;
