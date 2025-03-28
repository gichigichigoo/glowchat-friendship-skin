
import React, { useState } from 'react';
import { 
  Settings, 
  X, 
  UserCircle, 
  Speech, 
  Database, 
  FileCog, 
  AppWindow, 
  Shield, 
  ChevronDown
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout: () => void;
  onDeleteAllChats: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  open, 
  onOpenChange,
  onLogout,
  onDeleteAllChats
}) => {
  const { toast } = useToast();
  const [showCode, setShowCode] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [language, setLanguage] = useState('auto');
  
  const handleArchiveAll = () => {
    toast({
      title: "Đã lưu trữ tất cả cuộc trò chuyện",
      description: "Tất cả cuộc trò chuyện đã được lưu trữ",
      duration: 3000,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 rounded-lg">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl">Settings</DialogTitle>
          <DialogClose className="absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row h-[500px] overflow-hidden">
          <div className="sm:w-1/3 border-r">
            <Tabs defaultValue="general" orientation="vertical" className="h-full">
              <TabsList className="flex flex-col h-full bg-muted/30 rounded-none items-stretch gap-0">
                <TabsTrigger value="general" className="justify-start gap-2 py-3 rounded-none border-l-2 border-transparent data-[state=active]:border-lilac-500 data-[state=active]:bg-lilac-50">
                  <Settings size={18} /> General
                </TabsTrigger>
                <TabsTrigger value="personalization" className="justify-start gap-2 py-3 rounded-none border-l-2 border-transparent data-[state=active]:border-lilac-500 data-[state=active]:bg-lilac-50">
                  <UserCircle size={18} /> Personalization
                </TabsTrigger>
                <TabsTrigger value="speech" className="justify-start gap-2 py-3 rounded-none border-l-2 border-transparent data-[state=active]:border-lilac-500 data-[state=active]:bg-lilac-50">
                  <Speech size={18} /> Speech
                </TabsTrigger>
                <TabsTrigger value="data" className="justify-start gap-2 py-3 rounded-none border-l-2 border-transparent data-[state=active]:border-lilac-500 data-[state=active]:bg-lilac-50">
                  <Database size={18} /> Data controls
                </TabsTrigger>
                <TabsTrigger value="profile" className="justify-start gap-2 py-3 rounded-none border-l-2 border-transparent data-[state=active]:border-lilac-500 data-[state=active]:bg-lilac-50">
                  <FileCog size={18} /> Builder profile
                </TabsTrigger>
                <TabsTrigger value="apps" className="justify-start gap-2 py-3 rounded-none border-l-2 border-transparent data-[state=active]:border-lilac-500 data-[state=active]:bg-lilac-50">
                  <AppWindow size={18} /> Connected apps
                </TabsTrigger>
                <TabsTrigger value="security" className="justify-start gap-2 py-3 rounded-none border-l-2 border-transparent data-[state=active]:border-lilac-500 data-[state=active]:bg-lilac-50">
                  <Shield size={18} /> Security
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="sm:w-2/3 overflow-y-auto">
            <Tabs defaultValue="general" className="w-full">
              <TabsContent value="general" className="p-4 space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">System</span>
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Always show code when using data analyst</span>
                      <Switch checked={showCode} onCheckedChange={setShowCode} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Show follow up suggestions in chats</span>
                      <Switch checked={showSuggestions} onCheckedChange={setShowSuggestions} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Language</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Auto-detect</span>
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Archived chats</span>
                      <Button variant="outline" className="px-4">Manage</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span>Archive all chats</span>
                      <Button variant="outline" className="px-4" onClick={handleArchiveAll}>
                        Archive all
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Delete all chats</span>
                      <Button variant="destructive" className="px-4" onClick={onDeleteAllChats}>
                        Delete all
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Log out on this device</span>
                      <Button variant="outline" className="px-4" onClick={onLogout}>
                        Log out
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="personalization" className="p-4 mt-0">
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">Personalization settings will be available soon</p>
                </div>
              </TabsContent>
              
              <TabsContent value="speech" className="p-4 mt-0">
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">Speech settings will be available soon</p>
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="p-4 mt-0">
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">Data control settings will be available soon</p>
                </div>
              </TabsContent>
              
              <TabsContent value="profile" className="p-4 mt-0">
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">Builder profile settings will be available soon</p>
                </div>
              </TabsContent>
              
              <TabsContent value="apps" className="p-4 mt-0">
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">Connected apps settings will be available soon</p>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="p-4 mt-0">
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">Security settings will be available soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
