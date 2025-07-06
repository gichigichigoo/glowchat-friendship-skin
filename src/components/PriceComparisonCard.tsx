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
  const handleAddToTracking = () => {
    onAddToTracking(item);
    setIsTracked(true);
  };

  return (
    <Card className={`transition-all duration-300 ${isTracked ? 'border-secondary bg-secondary/20' : 'hover:shadow-md'}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-2xl">{item.storeLogo}</div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground">{item.storeName}</h3>
              <p className="text-sm text-muted-foreground">{item.lastUpdated}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {item.isBestPrice && (
              <Badge className="bg-peach-100 text-peach-700 hover:bg-peach-200">
                Giá thấp nhất
              </Badge>
            )}
            {isTracked && (
              <div className="flex items-center gap-1">
                <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Đang theo dõi
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(item.previousPrice)}
            </span>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              <TrendingDown className="w-3 h-3 mr-1" />
              -{formatPrice(item.discount)}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-secondary-foreground">
            {formatPrice(item.currentPrice)}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => window.open(item.productUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
            Mua ngay
          </Button>
          <Button
            className={`flex-1 ${isTracked ? '' : 'bg-lilac-500 hover:bg-lilac-600'}`}
            onClick={handleAddToTracking}
            disabled={isTracked}
            variant={isTracked ? "outline" : "default"}
          >
            {isTracked ? 'Đã thêm vào danh sách theo dõi' : 'Thêm vào danh sách theo dõi'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceComparisonCard;