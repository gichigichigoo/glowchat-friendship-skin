import React, { useState } from 'react';
import { ArrowLeft, Tag, Settings, ExternalLink, MoreHorizontal, TrendingDown, TrendingUp, Search } from 'lucide-react';
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

// Mock search suggestions
const mockSuggestions = [
  'Serum Vitamin C La Roche-Posay',
  'Kem chống nắng Nivea',
  'Nước tẩy trang Bioderma',
  'Sữa rửa mặt CeraVe',
  'Kem dưỡng da Olay',
  'Mặt nạ Innisfree',
  'Toner Hada Labo',
  'Phấn nước Cushion'
];

const MAX_TRACKING_ITEMS = 10;

const PriceTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [priceData, setPriceData] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [trackingList, setTrackingList] = useState<any[]>([]);
  const [showTrackingList, setShowTrackingList] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [alreadyTracking, setAlreadyTracking] = useState(false);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length >= 2) {
      const filteredSuggestions = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = async (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) {
      toast({
        title: "Vui lòng nhập tên sản phẩm",
        variant: "destructive"
      });
      return;
    }

    // Check if already tracking this search term
    const isTracked = trackingList.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (isTracked) {
      setAlreadyTracking(true);
      return;
    }

    setIsLoading(true);
    setAlreadyTracking(false);
    setShowSuggestions(false);

    // Simulate API call
    setTimeout(() => {
      if (searchTerm.toLowerCase().includes('serum') || searchTerm.toLowerCase().includes('vitamin')) {
        setPriceData(mockPriceData);
        setShowResults(true);
      } else {
        setPriceData([]);
        setShowResults(true);
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const handleAddToTracking = (item: any) => {
    // Check tracking limit
    if (trackingList.length >= MAX_TRACKING_ITEMS) {
      toast({
        title: "Bạn chỉ có thể theo dõi tối đa 10 sản phẩm cùng lúc.",
        variant: "destructive"
      });
      return;
    }

    const newTrackedItem = {
      id: Date.now().toString(),
      name: searchQuery || 'Serum Vitamin C La Roche-Posay',
      url: `search:${searchQuery}`,
      currentPrice: item.currentPrice,
      addedPrice: item.currentPrice,
      storeName: item.storeName,
      storeLogo: item.storeLogo,
      addedAt: new Date()
    };

    setTrackingList(prev => [newTrackedItem, ...prev]);
    
    toast({
      title: "🎉 Theo dõi thành công rồi nè!",
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

        {/* Search Input Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Tìm kiếm sản phẩm để theo dõi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="relative">
                <Input
                  placeholder="Nhập tên sản phẩm..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className="pr-10"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => handleSearch()}
                  disabled={isLoading}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Kết quả tìm kiếm</h2>
              <Button
                variant="ghost"
                className="text-lilac-600 hover:text-lilac-700 underline"
                disabled={trackingList.length >= MAX_TRACKING_ITEMS}
                onClick={() => {
                  // Check if adding all items would exceed the limit
                  const newItemsCount = priceData.filter(item => !item.isTracked).length;
                  if (trackingList.length + newItemsCount > MAX_TRACKING_ITEMS) {
                    toast({
                      title: "Bạn chỉ có thể theo dõi tối đa 10 sản phẩm cùng lúc.",
                      variant: "destructive"
                    });
                    return;
                  }

                  // Track all platforms at once
                  priceData.forEach(item => {
                    if (!item.isTracked) {
                      const newTrackedItem = {
                        id: Date.now().toString() + item.id,
                        name: searchQuery || 'Serum Vitamin C La Roche-Posay',
                        url: `search:${searchQuery}`,
                        currentPrice: item.currentPrice,
                        addedPrice: item.currentPrice,
                        storeName: item.storeName,
                        storeLogo: item.storeLogo,
                        addedAt: new Date()
                      };
                      setTrackingList(prev => [newTrackedItem, ...prev]);
                    }
                  });
                  
                  // Update all cards to show tracked state
                  setPriceData(prev => prev.map(p => ({ ...p, isTracked: true })));
                  
                  // Show success toast
                  toast({
                    title: "🎉 Tất cả sản phẩm đã được theo dõi trên mọi sàn!"
                  });
                }}
              >
                Theo dõi ở tất cả sàn
              </Button>
            </div>
            {priceData.length > 0 ? (
              <div className="space-y-3">
                {priceData.map((item) => (
                  <PriceComparisonCard
                    key={item.id}
                    item={item}
                    onAddToTracking={handleAddToTracking}
                    onViewTrackingList={handleViewTrackingList}
                    formatPrice={formatPrice}
                    isTrackingLimitReached={trackingList.length >= MAX_TRACKING_ITEMS}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    Không tìm thấy sản phẩm nào phù hợp. Hãy thử từ khóa khác.
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