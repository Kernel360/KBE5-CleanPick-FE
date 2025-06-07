import React from 'react';
import { Button } from '@/customer/components/ui/button';
import { cn } from '@/customer/lib/utils';
import { Manager } from './ManagerSelectionModal';

export interface Schedule {
  id: string;
  title: string;
  date: string;
  time: string;
  address: string;
  status: 'pending' | 'matched' | 'completed';
  helperCount?: number;
  isHelperAssigned?: boolean;
  selectedManager?: Manager;
}

interface ScheduleListItemProps {
  schedule: Schedule;
  onManageHelper?: (scheduleId: string) => void;
  onViewStatus?: (scheduleId: string) => void;
}

export const ScheduleListItem: React.FC<ScheduleListItemProps> = ({
  schedule,
  onManageHelper,
  onViewStatus
}) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '신규';
      case 'matched':
        return '확정';
      case 'completed':
        return '완료';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-600';
      case 'matched':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const renderButton = () => {
    if (schedule.selectedManager) {
      if (schedule.status === 'completed') {
        return (
          <Button
            onClick={() => onViewStatus?.(schedule.id)}
            variant="outline"
            className="w-full h-12 bg-gray-100 text-gray-600 border-gray-300"
          >
            처리 완료
          </Button>
        );
      } 
    } else if (schedule.status === 'pending' || schedule.status === 'matched') {
      return (
        <Button
          onClick={() => onManageHelper?.(schedule.id)}
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          매니저 선택하기
        </Button>
      );
    } else if (schedule.status === 'completed') {
      return (
        <Button
          onClick={() => onViewStatus?.(schedule.id)}
          variant="outline"
          className="w-full h-12 bg-gray-100 text-gray-600 border-gray-300"
        >
          처리 완료
        </Button>
      );
    }
    return null;
  };

  const renderHelperInfo = () => {
    if (schedule.selectedManager) {
      const manager = schedule.selectedManager;
      return (
        <div className="bg-gray-50 rounded-lg p-3 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">{manager.name} 매니저</span>
            </div>
            <div className="text-sm text-gray-600">
              ⭐ {manager.rating} • {manager.distance}
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {manager.experience} • {manager.price?.toLocaleString()}원
          </div>
        </div>
      );
    } else if (schedule.status === 'completed') {
      return (
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>이미 상담이 매니저가 있습니다</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          <span>1명의 매니저가 대기되었습니다</span>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mx-4 mb-4 shadow-sm border border-gray-100">
      {/* 헤더 영역 */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{schedule.title}</h3>
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          getStatusColor(schedule.status)
        )}>
          {getStatusText(schedule.status)}
        </span>
      </div>

      {/* 날짜/시간 정보 */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        <span>{schedule.date}, {schedule.time}</span>
      </div>

      {/* 주소 정보 */}
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span>{schedule.address}</span>
      </div>

      {/* 매니저 정보 */}
      {renderHelperInfo()}

      {/* 버튼 */}
      <div className="mt-4">
        {renderButton()}
      </div>
    </div>
  );
}; 