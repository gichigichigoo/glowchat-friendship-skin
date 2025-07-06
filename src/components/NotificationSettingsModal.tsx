import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    priceChange: false,
    percentageDiscount: false,
    amountDiscount: false,
    webPush: false,
    email: false,
    percentageValue: 15,
    amountValue: 50000
  });

  const handleStepperChange = (field: 'percentageValue' | 'amountValue', increment: boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: increment 
        ? prev[field] + (field === 'percentageValue' ? 5 : 10000)
        : Math.max(0, prev[field] - (field === 'percentageValue' ? 5 : 10000))
    }));
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
  };

  const handleSave = () => {
    if (!settings.webPush && !settings.email) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn ít nhất một hình thức nhận thông báo.",
        variant: "destructive"
      });
      return;
    }

    // Check if both percentage and amount conditions are set
    if (settings.percentageDiscount && settings.amountDiscount) {
      toast({
        title: "Lưu ý",
        description: "Chỉ áp dụng một điều kiện tại một thời điểm.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Đã lưu cài đặt thông báo ✓",
      description: "Cài đặt đã được áp dụng cho tất cả sản phẩm theo dõi"
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Cài đặt thông báo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Trigger Conditions Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Khi nào bạn muốn nhận thông báo?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="priceChange"
                  checked={settings.priceChange}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, priceChange: checked as boolean }))
                  }
                />
                <Label htmlFor="priceChange">Mỗi khi có thay đổi giá</Label>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="percentageDiscount"
                    checked={settings.percentageDiscount}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, percentageDiscount: checked as boolean }))
                    }
                  />
                  <Label htmlFor="percentageDiscount" className="flex items-center gap-2">
                    Khi giá giảm từ
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleStepperChange('percentageValue', false)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-2 py-1 min-w-[3rem] text-center">
                        {settings.percentageValue}%
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleStepperChange('percentageValue', true)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    trở lên
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="amountDiscount"
                    checked={settings.amountDiscount}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, amountDiscount: checked as boolean }))
                    }
                  />
                  <Label htmlFor="amountDiscount" className="flex items-center gap-2">
                    Khi giá giảm từ
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleStepperChange('amountValue', false)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-2 py-1 min-w-[4rem] text-center text-sm">
                        {formatAmount(settings.amountValue)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleStepperChange('amountValue', true)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    trở lên
                  </Label>
                </div>

                {settings.percentageDiscount && settings.amountDiscount && (
                  <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">
                    Chỉ áp dụng một điều kiện tại một thời điểm.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notification Methods Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Bạn muốn nhận thông báo qua đâu?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="webPush"
                  checked={settings.webPush}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, webPush: checked as boolean }))
                  }
                />
                <Label htmlFor="webPush">Gửi qua Web push</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={settings.email}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, email: checked as boolean }))
                  }
                />
                <Label htmlFor="email">Gửi qua Email</Label>
              </div>

              {!settings.webPush && !settings.email && (
                <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">
                  Vui lòng chọn ít nhất một hình thức nhận thông báo.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button 
            onClick={handleSave}
            className="w-full bg-lilac-500 hover:bg-lilac-600"
          >
            Lưu cài đặt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationSettingsModal;