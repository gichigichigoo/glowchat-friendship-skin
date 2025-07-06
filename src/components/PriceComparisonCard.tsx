import React, { useState } from 'react';
import { ExternalLink, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PriceComparisonCardProps {
  item: {
    id: string;
    storeName: string;
    storeLogo: string;
    currentPrice: number;
    previousPrice: number;
    discount: number;
    lastUpdated: string;
    isBestPrice: boolean;
    productUrl: string;
    isTracked?: boolean;
  };
  onAddToTracking: (item: any) => void;
  onViewTrackingList: () => void;
  formatPrice: (price: number) => string;
}

const PriceComparisonCard: React.FC<PriceComparisonCardProps> = ({
  item,
  onAddToTracking,
  onViewTrackingList,
  formatPrice
}) => {
  const [isTracked, setIsTracked] = useState(item.isTracked || false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToTracking = () => {
    onAddToTracking(item);
    setIsTracked(true);
    setShowSuccess(true);
  };

  return (
    <Card className={`transition-all duration-300 ${isTracked ? 'border-mint-400 bg-mint-50' : 'hover:shadow-md'}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{item.storeLogo}</div>
            <div>
              <h3 className="font-semibold">{item.storeName}</h3>
              <p className="text-sm text-muted-foreground">{item.lastUpdated}</p>
            </div>
          </div>
          {item.isBestPrice && (
            <Badge className="bg-peach-100 text-peach-700 hover:bg-peach-200">
              Giá thấp nhất
            </Badge>
          )}
          {isTracked && (
            <Badge className="bg-mint-100 text-mint-700 hover:bg-mint-200">
              Đang theo dõi
            </Badge>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(item.previousPrice)}
            </span>
            <Badge variant="secondary" className="bg-mint-100 text-mint-700">
              <TrendingDown className="w-3 h-3 mr-1" />
              -{formatPrice(item.discount)}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-mint-600">
            {formatPrice(item.currentPrice)}
          </div>
        </div>

        {showSuccess && (
          <div className="mb-3 p-2 bg-mint-100 border border-mint-200 rounded-md">
            <p className="text-sm text-mint-700 mb-2">Đã thêm vào danh sách theo dõi ✓</p>
            <Button
              variant="link"
              size="sm"
              onClick={onViewTrackingList}
              className="p-0 h-auto text-mint-700 hover:text-mint-800"
            >
              Xem danh sách theo dõi
            </Button>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => window.open(item.productUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
            Mua ngay
          </Button>
          {!isTracked && (
            <Button
              className="flex-1 bg-lilac-500 hover:bg-lilac-600"
              onClick={handleAddToTracking}
            >
              Thêm vào danh sách theo dõi
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceComparisonCard;