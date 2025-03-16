
import React from 'react';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streakCount: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streakCount }) => {
  if (streakCount <= 0) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 flex items-center">
      <div className="w-8 h-8 rounded-full bg-peach-100 flex items-center justify-center mr-3">
        <Flame className="text-peach-500 animate-pulse-subtle" size={16} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold">
          {streakCount} ngày liên tiếp
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1 w-full">
          <div 
            className="h-full bg-gradient-to-r from-peach-400 to-lilac-400 rounded-full"
            style={{ width: `${Math.min(streakCount * 10, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;
