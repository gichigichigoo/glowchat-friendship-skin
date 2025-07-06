import React, { useState } from 'react';
import { ArrowLeft, Tag, Settings, ExternalLink, MoreHorizontal, TrendingDown, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import PriceComparisonCard from '@/components/PriceComparisonCard';
import TrackingListSection from '@/components/TrackingListSection';
import NotificationSettingsModal from '@/components/NotificationSettingsModal';

// Mock data for demonstration
const mockPriceData = [
  {
    id: '1',
    storeName: 'Shopee',
    storeLogo: '🛒',
    currentPrice: 189000,
    previousPrice: 235000,
    discount: 46000,
    lastUpdated: '3 giờ trước',
    isBestPrice: true,
    productUrl: 'https://shopee.vn/sample'
  },
  {
    id: '2',
    storeName: 'Tiki',
    storeLogo: '🏪',
    currentPrice: 199000,
    previousPrice: 250000,
    discount: 51000,
    lastUpdated: '5 giờ trước',
    isBestPrice: false,
    productUrl: 'https://tiki.vn/sample'
  }
];

const PriceTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [productUrl, setProductUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [priceData, setPriceData] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [trackingList, setTrackingList] = useState<any[]>([]);
  const [showTrackingList, setShowTrackingList] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [alreadyTracking, setAlreadyTracking] = useState(false);

  const handleSearch = async () => {
    if (!productUrl.trim()) {
      toast({
        title: "Vui lòng nhập URL sản phẩm",
        variant: "destructive"
      });
      return;
    }

    // Check if already tracking
    const isTracked = trackingList.some(item => item.url === productUrl);
    if (isTracked) {
      setAlreadyTracking(true);
      return;
    }

    setIsLoading(true);
    setAlreadyTracking(false);

    // Simulate API call
    setTimeout(() => {
      setPriceData(mockPriceData);
      setShowResults(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleAddToTracking = (item: any) => {
    const newTrackedItem = {
      id: Date.now().toString(),
      name: 'Serum Vitamin C',
      url: productUrl,
      currentPrice: item.currentPrice,
      storeName: item.storeName,
      addedAt: new Date()
    };

    setTrackingList(prev => [newTrackedItem, ...prev]);
    
    toast({
      title: "Đã thêm vào danh sách theo dõi ✓",
      description: "Bạn sẽ nhận thông báo khi có thay đổi giá"
    });

    // Update the specific card to show it's being tracked
    setPriceData(prev => prev.map(p => 
      p.id === item.id ? { ...p, isTracked: true } : p
    ));
  };

  const handleViewTrackingList = () => {
    setShowTrackingList(true);
    // Smooth scroll to tracking list section
    setTimeout(() => {
      document.getElementById('tracking-list-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lilac-50 to-peach-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-lilac-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-lilac-600" />
              <h1 className="text-xl font-semibold">Theo dõi giá sản phẩm</h1>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Cài đặt thông báo
          </Button>
        </div>

        {/* URL Input Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Dán link sản phẩm bạn muốn theo dõi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://..."
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-lilac-500 hover:bg-lilac-600"
              >
                {isLoading ? 'Đang tìm...' : 'Tìm giá'}
              </Button>
            </div>

            {alreadyTracking && (
              <div className="p-3 bg-peach-50 border border-peach-200 rounded-lg">
                <p className="text-peach-800 mb-2">Sản phẩm này đã có trong danh sách theo dõi.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewTrackingList}
                  className="text-peach-700 border-peach-300 hover:bg-peach-100"
                >
                  Xem chi tiết
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-lilac-600 border-t-transparent"></div>
              Đang tìm kiếm giá sản phẩm...
            </div>
          </div>
        )}

        {/* Price Comparison Results */}
        {showResults && !isLoading && (
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold">Kết quả tìm kiếm</h2>
            {priceData.length > 0 ? (
              <div className="space-y-3">
                {priceData.map((item) => (
                  <PriceComparisonCard
                    key={item.id}
                    item={item}
                    onAddToTracking={handleAddToTracking}
                    onViewTrackingList={handleViewTrackingList}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    Không tìm thấy thông tin giá cho sản phẩm này.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Tracking List Section */}
        <TrackingListSection
          trackingList={trackingList}
          showTrackingList={showTrackingList}
          setShowTrackingList={setShowTrackingList}
          setTrackingList={setTrackingList}
          formatPrice={formatPrice}
        />

        {/* Notification Settings Modal */}
        <NotificationSettingsModal
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
        />
      </div>
    </div>
  );
};

export default PriceTracking;