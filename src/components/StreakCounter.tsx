
import React from 'react';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streakCount: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streakCount }) => {
  if (streakCount <= 0) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-peach-100 flex items-center justify-center">
          <Flame className="text-peach-500 animate-pulse-subtle" size={20} />
        </div>
        <div>
          <div className="font-semibold">Streak chăm sóc da: {streakCount} ngày liên tiếp</div>
          <div className="text-sm text-gray-600">
            {streakCount >= 5 
              ? 'Bạn đã làm rất tốt! Tiếp tục nhé! 🎉' 
              : 'Cố gắng duy trì mỗi ngày nhé! 💪'}
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-peach-400 to-lilac-400 rounded-full"
          style={{ width: `${Math.min(streakCount * 10, 100)}%` }}
        />
      </div>
      
      {/* Milestone markers */}
      <div className="mt-1 flex justify-between text-xs text-gray-500">
        <span>1</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );
};

export default StreakCounter;
