
import React from 'react';
import { Droplet, Leaf, ShoppingBag } from 'lucide-react';

export interface SkinConcern {
  name: string;
  severity: 1 | 2 | 3; // 1=mild, 2=moderate, 3=severe
  description: string;
}

export interface SkinAnalysisData {
  skinType: 'Da khô' | 'Da dầu' | 'Da hỗn hợp' | 'Da thường' | 'Da nhạy cảm';
  hydrationLevel: number; // 0-100
  concerns: SkinConcern[];
  recommendations: string[];
}

interface SkinAnalysisReportProps {
  data: SkinAnalysisData;
}

const SkinAnalysisReport: React.FC<SkinAnalysisReportProps> = ({ data }) => {
  // Function to determine hydration level text
  const getHydrationText = (level: number) => {
    if (level < 40) return 'Thấp';
    if (level < 70) return 'Trung bình';
    return 'Cao';
  };

  // Function to render severity dots
  const renderSeverityDots = (severity: number) => {
    return (
      <div className="flex gap-1 items-center">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className={`w-2 h-2 rounded-full ${
              dot <= severity 
                ? severity === 1 
                  ? 'bg-mint-400' 
                  : severity === 2 
                    ? 'bg-peach-400' 
                    : 'bg-red-400'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold text-lilac-800 mb-5">Phân tích da của bạn</h2>
      
      {/* Skin Type Tag */}
      <div className="mb-6">
        <div className="inline-flex px-3 py-1.5 bg-lilac-100 text-lilac-800 rounded-full text-sm font-medium">
          {data.skinType}
        </div>
      </div>
      
      {/* Hydration Level */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Droplet size={18} className="text-blue-400" />
            <span className="text-sm font-medium text-gray-700">Độ ẩm</span>
          </div>
          <span className="text-sm font-medium">
            {data.hydrationLevel}% - {getHydrationText(data.hydrationLevel)}
          </span>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-400 rounded-full"
            style={{ width: `${data.hydrationLevel}%` }}
          />
        </div>
      </div>
      
      {/* Skin Concerns */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Leaf size={18} className="text-mint-500" />
          <h3 className="text-sm font-semibold text-gray-800">Vấn đề da</h3>
        </div>
        
        <div className="space-y-3">
          {data.concerns.map((concern, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{concern.name}</span>
                {renderSeverityDots(concern.severity)}
              </div>
              <p className="text-xs text-gray-600">{concern.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ShoppingBag size={18} className="text-peach-500" />
          <h3 className="text-sm font-semibold text-gray-800">Khuyến nghị chăm sóc da</h3>
        </div>
        
        <div className="space-y-2">
          {data.recommendations.map((recommendation, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-peach-100 text-peach-600 flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
              <p className="text-sm text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinAnalysisReport;
