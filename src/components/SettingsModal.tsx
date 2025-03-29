
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
  ChevronDown,
  ChevronRight,
  Info,
  Check
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [improveModel, setImproveModel] = useState(true);
  const [includeAudio, setIncludeAudio] = useState(false);
  const [includeVideo, setIncludeVideo] = useState(false);
  const [showModelDialog, setShowModelDialog] = useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [openThemeDropdown, setOpenThemeDropdown] = useState(false);
  const [openLanguageDropdown, setOpenLanguageDropdown] = useState(false);
  const [customInstructions, setCustomInstructions] = useState(true);
  
  const handleArchiveAll = () => {
    toast({
      title: "Đã lưu trữ tất cả cuộc trò chuyện",
      description: "Tất cả cuộc trò chuyện đã được lưu trữ",
      duration: 3000,
    });
  };

  const handleManageMemories = () => {
    toast({
      title: "Quản lý trí nhớ",
      description: "Tính năng này sẽ được cập nhật sớm",
      duration: 3000,
    });
  };

  const handleManageSharedLinks = () => {
    toast({
      title: "Quản lý liên kết đã chia sẻ",
      description: "Tính năng này sẽ được cập nhật sớm",
      duration: 3000,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Xuất dữ liệu",
      description: "Dữ liệu của bạn đang được chuẩn bị để xuất",
      duration: 3000,
    });
  };

  const handleDeleteAccount = () => {
    setConfirmDeleteAccount(false);
    toast({
      title: "Tài khoản đã bị xóa",
      description: "Tài khoản của bạn đã được xóa khỏi hệ thống",
      variant: "destructive",
      duration: 3000,
    });
  };
  
  const themes = [
    { id: 'system', label: 'System' },
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' }
  ];
  
  const languages = [
    { id: 'auto', label: 'Auto-detect' },
    { id: 'en', label: 'English' },
    { id: 'vi', label: 'Vietnamese' },
    { id: 'fr', label: 'French' },
    { id: 'de', label: 'German' },
    { id: 'es', label: 'Spanish' }
  ];
  
  return (
    <>
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
                      <Collapsible 
                        open={openThemeDropdown} 
                        onOpenChange={setOpenThemeDropdown}
                        className="border rounded-md"
                      >
                        <CollapsibleTrigger className="flex justify-between items-center w-full p-2 text-left">
                          <span className="text-sm">{themes.find(t => t.id === selectedTheme)?.label}</span>
                          <ChevronDown size={16} className={`transition-transform duration-200 ${openThemeDropdown ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-t">
                          {themes.map(theme => (
                            <div 
                              key={theme.id}
                              className="flex justify-between items-center p-2 hover:bg-muted/50 cursor-pointer"
                              onClick={() => {
                                setSelectedTheme(theme.id);
                                setOpenThemeDropdown(false);
                              }}
                            >
                              <span>{theme.label}</span>
                              {selectedTheme === theme.id && <Check size={16} className="text-lilac-500" />}
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
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
                      <Collapsible 
                        open={openLanguageDropdown} 
                        onOpenChange={setOpenLanguageDropdown}
                        className="border rounded-md"
                      >
                        <CollapsibleTrigger className="flex justify-between items-center w-full p-2 text-left">
                          <span className="text-sm">{languages.find(l => l.id === language)?.label}</span>
                          <ChevronDown size={16} className={`transition-transform duration-200 ${openLanguageDropdown ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-t max-h-40 overflow-y-auto">
                          {languages.map(lang => (
                            <div 
                              key={lang.id}
                              className="flex justify-between items-center p-2 hover:bg-muted/50 cursor-pointer"
                              onClick={() => {
                                setLanguage(lang.id);
                                setOpenLanguageDropdown(false);
                              }}
                            >
                              <span>{lang.label}</span>
                              {language === lang.id && <Check size={16} className="text-lilac-500" />}
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
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
                
                <TabsContent value="personalization" className="p-4 mt-0 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Custom instructions</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={customInstructions} onCheckedChange={setCustomInstructions} />
                      </div>
                    </div>

                    <div className="space-y-3 border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">Memory</h3>
                        </div>
                        <Switch checked={memoryEnabled} onCheckedChange={setMemoryEnabled} />
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        ChatGPT will become more helpful as you chat, picking up on details and preferences to tailor its responses to you. <a href="#" className="text-blue-500 hover:underline">Learn more</a>
                      </p>
                      
                      <div className="space-y-2 bg-muted/40 p-4 rounded-md mt-2">
                        <p className="text-sm">To understand what ChatGPT remembers or teach it something new, just chat with it:</p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>"Remember that I like concise responses."</li>
                          <li>"I just got a puppy!"</li>
                          <li>"What do you remember about me?"</li>
                          <li>"Where did we leave off on my last project?"</li>
                        </ul>
                      </div>
                      
                      <div className="bg-red-100 rounded-md p-3 flex gap-2 text-sm mt-2">
                        <span className="text-red-600">100% full</span>
                        <Info size={16} className="text-red-600" />
                      </div>
                      
                      <div className="flex justify-center mt-4">
                        <Button variant="outline" onClick={handleManageMemories}>
                          Manage memories
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="speech" className="p-4 mt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Voice mode</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Include your audio recordings</span>
                        <Switch checked={includeAudio} onCheckedChange={setIncludeAudio} />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Include your video recordings</span>
                        <Switch checked={includeVideo} onCheckedChange={setIncludeVideo} />
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-2">
                        Include your audio and video recordings from Voice Mode to train our models. Transcripts and other files are covered by "Improve the model for everyone." <a href="#" className="text-blue-500 hover:underline">Learn more</a>
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="data" className="p-4 mt-0 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Improve the model for everyone</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={improveModel} onCheckedChange={setImproveModel} />
                        <ChevronRight 
                          size={16} 
                          onClick={() => setShowModelDialog(true)} 
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Allow your content to be used to train our models, which makes ChatGPT better for you and everyone who uses it. We take steps to protect your privacy.
                    </p>
                    
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span>Shared links</span>
                        <Button variant="outline" onClick={handleManageSharedLinks}>
                          Manage
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Export data</span>
                        <Button variant="outline" onClick={handleExportData}>
                          Export
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <span>Delete account</span>
                        <Button 
                          variant="destructive" 
                          onClick={() => setConfirmDeleteAccount(true)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="profile" className="p-4 mt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Builder profile</h3>
                    <p className="text-muted-foreground">Customize how you appear to other users when building with ChatGPT</p>
                    
                    <div className="space-y-4 bg-muted/40 p-4 rounded-md mt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-lilac-100 flex items-center justify-center">
                          <UserCircle size={24} className="text-lilac-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">Display name</h4>
                          <p className="text-sm text-muted-foreground">User128964</p>
                        </div>
                        <Button variant="outline" className="ml-auto">Edit</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="apps" className="p-4 mt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Connected applications</h3>
                    <p className="text-muted-foreground">Manage apps that can access your ChatGPT account</p>
                    
                    <div className="border rounded-md p-4 mt-4">
                      <p className="text-center text-muted-foreground">No connected applications</p>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      Connect a new application
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="p-4 mt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-md">
                        <div>
                          <h4 className="font-medium">Two-factor authentication</h4>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-md">
                        <div>
                          <h4 className="font-medium">Active sessions</h4>
                          <p className="text-sm text-muted-foreground">Manage devices where you're currently logged in</p>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-md">
                        <div>
                          <h4 className="font-medium">Password</h4>
                          <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                        </div>
                        <Button variant="outline">Change</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Model Improvement Dialog */}
      <Dialog open={showModelDialog} onOpenChange={setShowModelDialog}>
        <DialogContent className="sm:max-w-[500px] bg-zinc-800 text-white">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl">Model improvement</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Improve the model for everyone</h3>
              <div className="flex justify-between items-center">
                <Switch 
                  checked={improveModel} 
                  onCheckedChange={setImproveModel}
                  className="data-[state=checked]:bg-green-500" 
                />
              </div>
              <p className="text-sm">
                Allow your content to be used to train our models, which makes ChatGPT better for you and everyone who uses it. We take steps to protect your privacy. <a href="#" className="text-blue-500 hover:underline">Learn more</a>
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Voice mode</h3>
              
              <div className="flex justify-between items-center">
                <span>Include your audio recordings</span>
                <Switch 
                  checked={includeAudio} 
                  onCheckedChange={setIncludeAudio}
                  className="data-[state=checked]:bg-green-500" 
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span>Include your video recordings</span>
                <Switch 
                  checked={includeVideo} 
                  onCheckedChange={setIncludeVideo}
                  className="data-[state=checked]:bg-green-500" 
                />
              </div>
              
              <p className="text-sm">
                Include your audio and video recordings from Voice Mode to train our models. Transcripts and other files are covered by "Improve the model for everyone." <a href="#" className="text-blue-500 hover:underline">Learn more</a>
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" className="text-white" onClick={() => setShowModelDialog(false)}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={confirmDeleteAccount} onOpenChange={setConfirmDeleteAccount}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove all of your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SettingsModal;
