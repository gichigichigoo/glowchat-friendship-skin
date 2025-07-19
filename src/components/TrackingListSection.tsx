import React from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface TrackingListSectionProps {
  trackingList: any[];
  showTrackingList: boolean;
  setShowTrackingList: (show: boolean) => void;
  setTrackingList: (updater: (prev: any[]) => any[]) => void;
  formatPrice: (price: number) => string;
  highlightedItemId?: string | null;
}

const TrackingListSection: React.FC<TrackingListSectionProps> = ({
  trackingList,
  showTrackingList,
  setShowTrackingList,
  setTrackingList,
  formatPrice,
  highlightedItemId
}) => {
  const { toast } = useToast();

  const handleRemoveFromTracking = (itemId: string) => {
    setTrackingList(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Đã xóa khỏi danh sách theo dõi",
      description: "Sản phẩm đã được xóa khỏi danh sách theo dõi"
    });
  };

  return (
    <div id="tracking-list-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Danh sách đang theo dõi
          {trackingList.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              ({trackingList.length})
            </span>
          )}
        </h2>
        {trackingList.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowTrackingList(!showTrackingList)}
            className="h-8 w-8"
          >
            {showTrackingList ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {trackingList.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-muted-foreground">
              Bạn chưa theo dõi sản phẩm nào. Bắt đầu bằng cách dán link ở phía trên.
            </p>
          </CardContent>
        </Card>
      ) : (
        showTrackingList && (
          <div className="space-y-3 animate-slide-up">
            {trackingList.map((item, index) => (
              <Card 
                key={item.id} 
                data-item-id={item.id}
                className={`transition-all duration-300 ${
                  index === 0 ? 'border-secondary shadow-md' : ''
                } ${
                  highlightedItemId === item.id ? 'border-primary shadow-lg animate-pulse' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-xl flex items-center justify-center">
                      <div className="text-2xl">{item.storeLogo}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-1">{item.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>Thêm {new Date(item.addedAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-lg font-semibold text-secondary-foreground">
                          Hiện tại: {formatPrice(item.currentPrice)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Khi thêm: {formatPrice(item.addedPrice || item.currentPrice)}
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          Giảm: {formatPrice((item.addedPrice || item.currentPrice) - item.currentPrice)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        Xem chi tiết
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => window.open(item.url, '_blank')}
                            className="gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Xem sản phẩm
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleRemoveFromTracking(item.id)}
                            className="gap-2 text-destructive focus:text-destructive"
                          >
                            Xóa khỏi danh sách theo dõi
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default TrackingListSection;