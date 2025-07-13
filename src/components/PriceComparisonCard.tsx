import React, { useState, useEffect } from 'react';
import { ExternalLink, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  isTrackingLimitReached?: boolean;
}

const PriceComparisonCard: React.FC<PriceComparisonCardProps> = ({
  item,
  onAddToTracking,
  onViewTrackingList,
  formatPrice,
  isTrackingLimitReached = false
}) => {
  const [isTracked, setIsTracked] = useState(item.isTracked || false);
  
  // Sync local state with prop changes (for global tracking)
  useEffect(() => {
    setIsTracked(item.isTracked || false);
  }, [item.isTracked]);
  
  const handleAddToTracking = () => {
    onAddToTracking(item);
    setIsTracked(true);
  };

  return (
    <Card className={`transition-all duration-300 ${isTracked ? 'border-secondary bg-secondary/20' : 'hover:shadow-md'}`}>
      <CardContent className="p-4">
        {/* Platform Info - Top Left */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
            <div className="text-xs">🏪</div>
          </div>
          <div className="text-sm text-muted-foreground">
            {item.storeName}
          </div>
        </div>
        
        {/* Two Column Layout */}
        <div className="flex gap-4">
          {/* Product Image - Left Column (40% width) */}
          <div className="w-2/5 flex-shrink-0">
            <div className="aspect-square bg-muted rounded-xl flex items-center justify-center max-h-[120px] sm:max-h-[100px] w-full">
              <div className="text-4xl">🧴</div>
            </div>
          </div>
          
          {/* Content - Right Column with 16px padding from image */}
          <div className="flex-1 space-y-3 pl-4">
            {/* Product Name */}
            <h3 className="text-lg font-bold text-foreground leading-tight">
              Serum Vitamin C La Roche-Posay
            </h3>
            
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              {item.isBestPrice && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                  Giá thấp nhất
                </Badge>
              )}
              {isTracked && (
                <div className="flex items-center gap-1">
                  <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    Đang theo dõi
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={onViewTrackingList}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Xem trong danh sách theo dõi</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
            
            {/* Last Updated */}
            <p className="text-sm text-muted-foreground">{item.lastUpdated}</p>
            
            {/* Price Info */}
            <div className="space-y-2">
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
            
            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => window.open(item.productUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                Mua ngay
              </Button>
              {isTrackingLimitReached && !isTracked ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="flex-1"
                        disabled={true}
                        variant="outline"
                      >
                        Theo dõi
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Đã đạt giới hạn theo dõi.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Button
                  className={`flex-1 ${isTracked ? '' : 'bg-lilac-500 hover:bg-lilac-600'}`}
                  onClick={handleAddToTracking}
                  disabled={isTracked}
                  variant={isTracked ? "outline" : "default"}
                >
                  {isTracked ? 'Đã theo dõi' : 'Theo dõi'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceComparisonCard;