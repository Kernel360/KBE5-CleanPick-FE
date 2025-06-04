import React from 'react';
import { cn } from '@/customer/lib/utils';

export type ScheduleFilterType = 'pending' | 'matched' | 'completed';

interface ScheduleFilterTabsProps {
  activeFilter: ScheduleFilterType;
  onFilterChange: (filter: ScheduleFilterType) => void;
  pendingCount: number;
  matchedCount: number;
  completedCount: number;
}

export const ScheduleFilterTabs: React.FC<ScheduleFilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  pendingCount,
  matchedCount,
  completedCount
}) => {
  const tabs = [
    {
      id: 'pending' as ScheduleFilterType,
      label: '수락 대기',
      count: pendingCount
    },
    {
      id: 'matched' as ScheduleFilterType,
      label: '매칭 완료',
      count: matchedCount
    },
    {
      id: 'completed' as ScheduleFilterType,
      label: '완료 내역',
      count: completedCount
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={cn(
              "flex-1 py-4 px-2 text-sm font-medium border-b-2 transition-colors bg-white rounded-sm",
              activeFilter === tab.id
                ? "text-indigo-600 border-indigo-600 "
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <div className="flex items-center justify-center gap-1">
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={cn(
                  "min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium flex items-center justify-center",
                  activeFilter === tab.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                )}>
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 